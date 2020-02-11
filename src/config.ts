import * as env from 'dotenv';

env.config();

export default {
    port: process.env.PORT,
    secretKey: process.env.SECRET_KEY,
    databaseHost: process.env.DATABASE_HOST,
    databaseName: process.env.DATABASE_NAME,
    passwordLength: parseInt(process.env.PASSWORD_LENGTH as string, 10),
    saltLength: parseInt(process.env.SALT_LENGTH as string, 10),
    iterations: parseInt(process.env.ITERATIONS as string, 10),
    digest: process.env.DIGEST as string,
    byteToStringEncoding: process.env.BYTE_TO_STRING_ENCODING,
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    mailService: process.env.MAIL_SERVICE,
    jobs: process.env.AGENDA,

};
