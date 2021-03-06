import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  name: string;
  telegram: string;
  role: string;
  password: string;
  salt: string;
  banned: boolean;
}

const User: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    telegram: { type: String, required: false },
    role: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    banned: { type: Boolean, required: false, default: false },
},
);

User.set('toObject', {
    transform: (doc, ret) => ({
        id: ret._id,
        email: ret.email,
        telegram: ret.telegram,
        role: ret.role,
        name: ret.name,
        banned: ret.banned,
    }),
});

export type IUserModel = mongoose.Model<IUser & mongoose.Document>;

export default mongoose.model<IUser>('User', User);
