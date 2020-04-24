import * as express from 'express';
import * as bodyParser from 'body-parser';
import config from './config';
import withRouter from './routes';
import loader from './loaders';
import 'reflect-metadata';
import * as cors from 'cors';

export const app = express();

const startApp = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    withRouter(app);
    await loader();
    app.listen(config.port, () => {
        console.log(`Server started on port ${config.port}`);
    });
};

startApp();
