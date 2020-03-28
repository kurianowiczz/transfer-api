import config from '../config';
import * as mongoose from 'mongoose';

export default async (env: string) => {
    await mongoose.connect(
        `mongodb://${config.databaseHost}/${env === 'development' ? config.databaseName : 'transfer-test'}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
};
