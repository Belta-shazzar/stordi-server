import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieSession from "cookie-session";
// import passport from './lib/authentication';
import config from "./config";

const app = express();

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.app.secret],
  })
);

app.set('trust proxy', true);
app.use(cors());
app.use(helmet());
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan(config.env.isProduction ? 'common' : 'dev'));

export default app;