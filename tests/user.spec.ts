import { expect } from 'chai';
import 'mocha';
import { Container } from 'typedi';
import UsersService from '../src/services/Users.service';
import UserRole from '../src/enums/UserRole';
import loader from '../src/loaders';
import userModel from '../src/models/User.model';

describe('User Test', () => {
    let userId: string;
    before(async () => {
        await loader('test');
        await userModel.db.dropDatabase();
    });

    it('method: addUser/Users.service; expect: success adding to db', async () => {
        const userService = Container.get(UsersService);
        // @ts-ignore
        const user = await userService.addUser({
            email: 'test@gmail.com',
            firstName: 'first',
            lastName: 'last',
            password: 'Test1234',
            salt: '1234',
            role: UserRole.USER,
        });
        userId = user._id.toString();
        expect(user).to.be.an('object');
    });

    it('method: findUser/Users.service; expect: success find user in db', async () => {
        const userService = Container.get(UsersService);
        const userEmail = 'test@gmail.com';
        const user = await userService.findUser(userEmail);
        expect(user).to.be.an('object');
        expect(user).to.have.property('email', userEmail);
    });

    it('method: findUser/Users.service; expect: fail find user in db', async () => {
        const userService = Container.get(UsersService);
        const user = await userService.findUser('testtttt@gmail.com');
        expect(user).to.be.an('null');
    });

    it('method: deleteUser/Users.service; expect: success user deletion', async () => {
        const userService = Container.get(UsersService);
        const user = await userService.deleteUser(userId);
        expect(user).to.have.property('deletedCount', 1);
    });

    it('method: deleteUser/Users.service; expect: fail user deletion', async () => {
        const userService = Container.get(UsersService);
        const user = await userService.deleteUser('5e7a4e6066b5d708843a6871');
        expect(user).to.have.property('deletedCount', 0);
    });
});
