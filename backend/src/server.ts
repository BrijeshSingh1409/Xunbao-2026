import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import { seedSampleQuestionsIfEmpty } from "./modules/quiz/quiz.service.js";
import { createApp } from "./app.js";
import { createAuth } from "./lib/auth.js";

async function bootstrap() {
  await connectDb();
  await seedSampleQuestionsIfEmpty();

  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error("Server failed to start", error);
  process.exit(1);
});
