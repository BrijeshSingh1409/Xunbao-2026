import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client, db } from "../config/db.js";
import { env } from "../config/env.js";

export function createAuth() {
  return betterAuth({
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [env.CLIENT_URL],
    database: mongodbAdapter(db, { client }),
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      },
    },
    user: {
      additionalFields: {
        universityRollNo: {
          type: "string",
          required: false,
        },
        college: {
          type: "string",
          required: false,
        },
        branch: {
          type: "string",
          required: false,
        },
        mobileNumber: {
          type: "string",
          required: false,
        },
      },
    },
  });
}
