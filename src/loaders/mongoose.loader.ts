import config from '../config';
import * as mongoose from 'mongoose';

export default async () => {
    await mongoose.connect(
        `mongodb://${config.databaseHost}/${config.databaseName}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
};
