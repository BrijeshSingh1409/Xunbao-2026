import { app } from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import { seedSampleQuestionsIfEmpty } from "./modules/quiz/quiz.service.js";

async function bootstrap() {
  await connectDb();
  await seedSampleQuestionsIfEmpty();

  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error("Server failed to start", error);
  process.exit(1);
});
