import express from 'express';
import dotenv from 'dotenv';
import Router from './infrastructure/http/router';

dotenv.config();

const app = express();

new Router().init().then(router => router.run(app, Number(process.env.PORT!)));
