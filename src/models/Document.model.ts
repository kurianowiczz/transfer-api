import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import {IUser} from './User.model';

const documentSchema: Schema = new Schema({
    fileName: { type: String, required: true },
    description: { type: String, required: false },
    expire: { type: Date, required: false },
    path: { type: String, required: false, unique: true },
    downloadLink: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

export interface IDocument extends mongoose.Document {
    fileName: string;
    description: string;
    expire: Date;
    path: string;
    downloadLink: string;
    user: IUser;
}

export type IDocumentModel = mongoose.Model<IDocument & mongoose.Document>;

export default mongoose.model<IDocument>('Document', documentSchema);
