import { Router, Application } from 'express';
import testRouter from './test';
import usersRouter from './users';

const withRouter = (app: Application) => {
  app.use('/', testRouter);
  app.use('/users', usersRouter);
};

export default withRouter;
