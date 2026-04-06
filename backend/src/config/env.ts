import "dotenv/config";

function required(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
}

export const env = {
  PORT: Number(process.env.PORT || 8080),
  MONGODB_URI: required("MONGODB_URI"),
  CLIENT_URL: required("CLIENT_URL"),
  BETTER_AUTH_SECRET: required("BETTER_AUTH_SECRET"),
  BETTER_AUTH_URL: required("BETTER_AUTH_URL"),

  AWS_REGION: required("AWS_REGION"),
  AWS_ACCESS_KEY_ID: required("AWS_ACCESS_KEY_ID"),
  AWS_SECRET_ACCESS_KEY: required("AWS_SECRET_ACCESS_KEY"),
  SES_FROM_EMAIL: required("SES_FROM_EMAIL"),
};
