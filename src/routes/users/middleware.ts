import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import JWTService from '../../services/JWT.service';
import {IUser} from '../../models/User.model';
import UserRole from '../../enums/UserRole';

export const authOnly = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!!token) {
        const jwtService = Container.get(JWTService);
        const user = await jwtService.verifyToken(token);
        // console.log(user);
        // @ts-ignore
        req.user = user.data;
        next();
    } else {
        return res.status(400).send({ code: 400, body: 'Illegal token' });
    }
};

export const adminOnly = async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user as IUser;
    if (!!user && user.role === UserRole.ADMIN) {
        next();
    } else {
        return res.status(403).send({ code: 403, body: 'Forbidden' });
    }
};

