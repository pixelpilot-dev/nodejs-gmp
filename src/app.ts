import express, { Express, Request, Response } from 'express';

import errorHandler from './middlewares/error-handler.js';
import users from './routes/users.js';

const app: Express = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'ok' });
});
app.use('/users', users);
app.use(errorHandler);

export { app };
