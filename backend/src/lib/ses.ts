import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { env } from "../config/env.js";

export const ses = new SESClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function sendOtpEmail(
  to: string,
  subject: string,
  otp: string
) {
  const command = new SendEmailCommand({
    Source: env.SES_FROM_EMAIL,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Html: {
          Data: `
            <div style="font-family: Arial, sans-serif; padding: 16px;">
              <h2>Xunbao</h2>
              <p>Your OTP is:</p>
              <h1 style="letter-spacing: 6px;">${otp}</h1>
              <p>This OTP is valid for 5 minutes.</p>
            </div>
          `,
        },
      },
    },
  });

  return ses.send(command);
}
