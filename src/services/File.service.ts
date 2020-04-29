import * as fs from 'fs';
import { ungzip } from 'node-gzip';
import * as path from 'path';

export default class FileService {
    public async readArch(fileName: string, rowsCount: number) {
        try {
            const data = fs.readFileSync(fileName);
            const decompressed = await ungzip(data);
            return decompressed
                .toString()
                .split('\n')
                .slice(0, rowsCount);
        } catch (err) {
            return err.toString();
        }
    }

    public static deleteFile(filePath: string) {
        return new Promise<{ removed: string }>((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) { reject(err); }
                resolve({ removed: filePath });
            });
        });
    }

    public addFile(fileName: string, file: unknown, userId: string) {
        return new Promise<{ path: string }>((resolve, reject) => {
            //const fullPath = path.resolve(`../../files/${userId}/`, fileName);
            const fullPath = path.join(`../../files/${userId}/`, fileName);
            console.log(fullPath);
            // @ts-ignore
            file.mv(fullPath, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ path: fullPath });
                }
            });
        });
    }
}
