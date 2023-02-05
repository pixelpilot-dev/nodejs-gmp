import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import User from './models/users.js';

import errorHandler from './middlewares/error-handler.js';
import users from './routes/users.js';

const app: Express = express();

await User.sync();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'ok' });
});
app.use('/users', users);
app.use(errorHandler);

export { app };
