import { Router, Application } from 'express';
import testRouter from './test';
import usersRouter from './users';
import filesRouter from './files';

const withRouter = (app: Application) => {
  app.use('/', testRouter);
  app.use('/users', usersRouter);
  app.use('/files', filesRouter);
};

export default withRouter;
