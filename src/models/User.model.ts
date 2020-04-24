import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  name: string,
  telegram: string;
  role: string;
  password: string;
  salt: string;

}

const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    telegram: { type: String, required: false },
    role: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
},
);

export type IUserModel = mongoose.Model<IUser & mongoose.Document>;

export default mongoose.model<IUser>('User', userSchema);
