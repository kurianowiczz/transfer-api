import { NextFunction, Request, Response } from 'express';
import {Container} from 'typedi';
import JWTService from '../../services/JWT.service';

export const authOnly = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!!token) {
        const jwtService = Container.get(JWTService);
        const user = await jwtService.verifyToken(token);
        // @ts-ignore
        req.user = user.data;
        next();
    } else {
        return res.status(400).send({ code: 400, body: 'Illegal token' });
    }
};



