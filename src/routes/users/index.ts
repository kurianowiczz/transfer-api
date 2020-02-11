import { Router, Request, Response } from 'express';
import { Container } from 'typedi';
import UsersService from '../../services/Users.service';
import { IUser } from '../../models/User.model';
import JWTService from '../../services/JWT.service';
import HashService from '../../services/Hash.service';
import config from '../../config';
import validation from '../../shared/validation';
import * as Joi from 'joi';

const router = Router();

router.post('/add',
    validation(
         Joi.object({
                 firstName: Joi.string().min( 3).max(30).required(),
                 lastName: Joi.string().alphanum().min(3).max(30).required(),
                 email: Joi.string().min(5).max(255).required().email(),
                 password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
         }),
    ),
    async (req: Request, res: Response) => {
    const usersService = Container.get(UsersService);
    const jwtService = Container.get(JWTService);
    const hashService = Container.get(HashService);

    const { hash, salt } = await hashService.generateHash(req.body.password);

    const user = await usersService.addUser({ ...req.body, password: hash, salt } as IUser);

    const token = jwtService.generateToken(user);
    console.log({ token, user });

    res.send({ token, user });

});

router.post('/login',
    async (req: Request, res: Response) => {
    const usersService = Container.get(UsersService);
    const jwtService = Container.get(JWTService);
    const hashService = Container.get(HashService);

    const user = await usersService.findUser(req.body.email);

    if (!user) {
        return res.status(400).send({code: 400, error: 'Error email'});
    }

    const isPasswordValid = hashService.verifyHash(
        { hash: user.password, salt: user.salt, iterations: config.iterations},
        req.body.password);
    if (!isPasswordValid) {
        return res.status(400).send({code: 400, error: 'Error password'});
    }

    const token = jwtService.generateToken(user);
    res.send({ token, user });

});

router.delete('/remove',
    async (req: Request, res: Response) => {
        const usersService = Container.get(UsersService);
        const user = await usersService.deleteUser( req.param('id'));

        res.send(user);

    });

export default router;
