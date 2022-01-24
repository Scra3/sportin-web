/* eslint-disable import/first */
import dotenv from 'dotenv';
// load dotenv before router because it imports some env variables
// eslint-disable-next-line
dotenv.config();

import express from 'express';
import Router, { RouterCredentialsI } from './infrastructure/http/router';

const credentials: RouterCredentialsI = {
  dbUser: process.env.DB_TEST_USER!,
  dbPassword: process.env.DB_TEST_PASSWORD!,
  dbHost: process.env.DB_TEST_HOST!,
  dbPort: Number(process.env.DB_TEST_PORT!),
  dbName: process.env.DB_TEST_NAME!,
  forestEnvSecret: process.env.FOREST_ENV_SECRET!,
  forestAuthSecret: process.env.FOREST_AUTH_SECRET!,
  serverPort: Number(process.env.SERVER_PORT!),
};

const app = express();
Router.init(credentials).then(router => router.run(app));
