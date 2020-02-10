import * as crypto from 'crypto';
import { Service } from 'typedi';
import IHash from '../interfaces/IHash';
import config from '../config';

@Service()
export default class HashService {
    public async generateHash(password: string): Promise<IHash> {
        return await new Promise<IHash>((resolve, reject) => {
            const salt = crypto.randomBytes(config.saltLength)
                .toString(config.byteToStringEncoding);
            crypto.pbkdf2(password, salt, config.iterations, config.passwordLength, config.digest,
                (error, hash) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve({
                            salt,
                            hash: hash.toString(config.byteToStringEncoding),
                            iterations: config.iterations,
                        });
                    }
                });
        });
    }

    public async verifyHash(hashedData: IHash, data: string): Promise<boolean> {
        return await new Promise<boolean>((resolve, reject) => {
            crypto.pbkdf2(data,
                hashedData.salt,
                hashedData.iterations,
                config.passwordLength,
                String(config.digest),
                (error, hash) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(hashedData.hash === hash.toString(config.byteToStringEncoding));
                    }
                });
        });
    }
}

// const sum = (a: number, b: number) => {
//     return new Promise((resolve, reject) => {
//     if (a === 0) {
//         reject({ error: 'A = 0' });
//     }
//     resolve(a + b);
// });
// };
//
// sum(0, 2)
//     .then((sum) => console.log(sum))
//     .catch(err => console.log(err));
//
// (async () => {
//     try {
//         console.log(await sum(1, 2));
//     } catch (e) {
//         console.log(e);
//     }
// })()
