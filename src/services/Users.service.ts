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
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            salt: user.salt,
            cardData: {},
            telegram: null,
            role: UserRole.USER,
            language: user.language,
            location: null,
            phone: null,
            birthday: null,
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
}

