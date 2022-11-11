import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
// import gameRepository from "./repository/gamesRepository";
// import {GameTypeAPIOutput} from "./types";
import routes from "./routes";

import { Router, Request, Response } from 'express';

dotenv.config();
const app = express();
const route = Router();
const port = process.env.PORT;

app.use(cors());
// @TODO: define more stric policy for CORS
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);



route.get('/', (req: Request, res: Response) => {
  return res.json({ message: "healthcheck" });
});

app.use(route);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

export const server = app;