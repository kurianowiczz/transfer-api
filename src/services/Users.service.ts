import { Container, Service } from 'typedi';
import { IUser, IUserModel } from '../models/User.model';
import * as mongoose from 'mongoose';
import UserRole from '../enums/UserRole';

@Service()
export default class UsersService {
    public async addUser(user: IUser) {

        const userModel = Container.get('userModel') as IUserModel;

        return await userModel.create({
            email: user.email,
            name: user.name,
            password: user.password,
            salt: user.salt,
            telegram: null,
            role: UserRole.USER,
        });
    }

    public async findUser(email: string) {
        const userModel = Container.get('userModel') as IUserModel;

        return userModel.findOne({ email });

    }

    public async deleteUser(userId: string) {
        const userModel = Container.get('userModel') as IUserModel;

        return userModel.deleteOne({
            _id: mongoose.Types.ObjectId(userId),

        });
    }

    public async getAll() {
        const userModel = Container.get('userModel') as IUserModel;
        const all = await userModel.find();
        return all.map((user) => user.toObject());
    }

    public async toggleBan(id: string) {
        const userModel = Container.get('userModel') as IUserModel;
        const user = await userModel.findOne({_id: mongoose.Types.ObjectId(id)});
        if (user) {
            user.banned = !user.banned;
            await user.save();
        }
    }
}

