import * as mongoose from 'mongoose';
import { Moment } from 'moment';

import documentModel, { IDocument, IDocumentModel } from '../models/Document.model';

export default class DocumentService {
    public async addDoc(document: IDocument): Promise<IDocument> {
        return await documentModel.create({
            title: document.title,
            description: document.description,
            expire: document.expire,
            path: document.path,
        });
    }

    public static async findDocByTitle(title: string) {
        return documentModel.findOne({ title });
    }

    public static async findDocByPath(path: string) {
        return documentModel.findOne({ path });
    }

    public async findAll(pagination?: {
        pageSize: number;
        pageNumber: number;
    }): Promise<IDocument[]> {
        const documents = await documentModel.find();
        return pagination ? documents.slice(
            Math.floor(documents.length / pagination.pageSize) *
                      pagination.pageNumber,
                  Math.floor(documents.length / pagination.pageSize) *
                      (pagination.pageNumber + 1),
              )
            : documents;
    }

    public static async getCount() {
        return documentModel.countDocuments();
    }

    public static async findByExpire(
        expire: Moment,
    ): Promise<IDocument[]> {
        return documentModel.find({
            expire: {
                $lte: new Date(expire.toISOString()),
            },
        });
    }

    public static async removeMany(filesIds: mongoose.Types.ObjectId[]) {
        return documentModel.deleteMany({
            _id: {
                $in: filesIds,
            },
        });
    }
    public async findByUserId(userId: mongoose.Types.ObjectId[]) {
        const documents = await documentModel.find({userId});
        return documents;
    }
}
