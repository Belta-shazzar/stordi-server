import "express-async-errors";
import notFoundHandler from "./lib/handlers/notFoundHandler";
import errorHandler from "./lib/handlers/errorHandler";
// import { createMongodbConnection } from './database/connection';
// import { monitorRedisConnection } from './database/redis';
import config from "./config";

export default async () => {
  // if (!config.env.isTest) await monitorRedisConnection();
  // await createMongodbConnection();

  const app = (await import("./app")).default;
  const router = (await import("./router")).default;

  app.use(router);
  app.use(notFoundHandler);
  app.use(errorHandler);
};
