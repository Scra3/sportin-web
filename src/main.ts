import express from 'express';
import Router from './infrastructure/http/router';

const app = express();
Router.run(app, 3000);
