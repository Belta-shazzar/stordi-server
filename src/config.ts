import env from "dotenv";

env.config({
  path: process.env.ENV_FILE_PATH,
});

export enum AppEnvironmentEnum {
  TEST = "test",
  LOCAL = "local",
  PRODUCTION = "production",
  DEVELOPMENT= 'development'
}

type Config = {
  env: {
    isProduction: boolean;
    isDevelopment: boolean;
    isTest: boolean;
  }
  app: {
    env: AppEnvironmentEnum;
    isProduction: boolean;
    name: string;
    secret: string;
    bcryptRounds: number;
    port: number;
    app_email: string;
  };
  db: {
    uri: string;
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
  redis: {
    mode: string | "standalone" | "cluster";
    host: string;
    port: number;
    password: string;
  };
  mail: {
    sendgridApiKey: string;
  };
  sendchamp: {
    url: string;
    accessKey: string;
    senderName: string;
  };
};

const isTestEnvironment = process.env.APP_ENV === AppEnvironmentEnum.TEST;

const config: Config = {
    env: {
        isProduction: process.env.NODE_ENV === AppEnvironmentEnum.PRODUCTION,
        isTest: process.env.NODE_ENV === AppEnvironmentEnum.TEST,
        isDevelopment: process.env.NODE_ENV === AppEnvironmentEnum.DEVELOPMENT,
    },
    app: {
      name: process.env.APP_NAME!,
      env: process.env.APP_ENV as AppEnvironmentEnum,
      isProduction: process.env.APP_ENV === AppEnvironmentEnum.PRODUCTION,
      secret: process.env.APP_SECRET!,
      bcryptRounds: 10,
      port: +process.env.PORT!,
      app_email: process.env.APP_EMAIL!,
    },
    db: {
      uri: process.env.DB_URI!,
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 3306),
      database: isTestEnvironment
        ? process.env.TEST_DB_DATABASE!
        : process.env.DB_DATABASE!,
      user: isTestEnvironment ? process.env.TEST_DB_USER! : process.env.DB_USER!,
      password: isTestEnvironment
        ? process.env.TEST_DB_PASSWORD!
        : process.env.DB_PASSWORD!,
    },
    redis: {
      mode: process.env.REDIS_MODE! || 'standalone',
      host: process.env.REDIS_HOST!,
      port: +process.env.REDIS_PORT!,
      password: process.env.REDIS_PASSWORD!,
    },
    mail: {
      sendgridApiKey: process.env.SENDGRID_API_KEY!,
    },
    sendchamp: {
      url: process.env.SENDCHAMP_URL!,
      accessKey: process.env.SENDCHAMP_ACCESS_KEY!,
      senderName: process.env.SENDCHAMP_SENDER_NAME!,
    },
  };
  
  export default config;
