import { MongoClient, Db } from "mongodb";
import { env } from "./env.js";

export const client = new MongoClient(env.MONGODB_URI);
export let db: Db;

export async function connectDb() {
  await client.connect();
  db = client.db();
  console.log("MongoDB connected");
}
