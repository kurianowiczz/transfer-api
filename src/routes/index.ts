import { Router, Application } from 'express';
import testRouter from './test';
import usersRouter from './users';
import moviesRouter from './movies';

const withRouter = (app: Application) => {
  app.use('/', testRouter);
  app.use('/users', usersRouter);
  app.use('/movies', moviesRouter);
};

export default withRouter;
