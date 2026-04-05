import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { emailOTP } from "better-auth/plugins";
import { client, db } from "../config/db.js";
import { env } from "../config/env.js";
import { resend } from "./resend.js";

export function createAuth() {
  return betterAuth({
    appName: "Xunbao",
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [env.CLIENT_URL],
    database: mongodbAdapter(db, { client }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      autoSignIn: false,
      minPasswordLength: 6,
    },
    user: {
      additionalFields: {
        username: {
          type: "string",
          required: true,
        },
        universityRollNo: {
          type: "string",
          required: true,
        },
        college: {
          type: "string",
          required: true,
        },
        branch: {
          type: "string",
          required: true,
        },
        mobileNumber: {
          type: "string",
          required: true,
        },
      },
    },
    plugins: [
      emailOTP({
        expiresIn: 300,
        overrideDefaultEmailVerification: true,
        async sendVerificationOTP({ email, otp, type }) {
          const subject =
            type === "email-verification"
              ? "Verify your Xunbao account"
              : type === "sign-in"
              ? "Your Xunbao sign-in OTP"
              : "Your Xunbao password reset OTP";

          const result = await resend.emails.send({
            from: env.RESEND_FROM,
            to: email,
            subject,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 16px;">
                <h2>Xunbao</h2>
                <p>Your OTP is:</p>
                <h1 style="letter-spacing: 6px;">${otp}</h1>
                <p>This OTP is valid for 5 minutes.</p>
              </div>
            `,
          });

          console.log("Resend result:", result);
        },
      }),
    ],
    advanced: {
      useSecureCookies: false,
    },
  });
}
