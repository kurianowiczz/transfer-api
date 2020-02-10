import { NextFunction, Request, Response } from 'express';
import { IUser } from '../../models/User.model';
import * as Joi from 'joi';
import UserLanguage from '../../enums/UserLanguage';

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as IUser;

    const schema = Joi.object({
        firstName: Joi.string().min( 3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        language: Joi.string().valid(Object.values(UserLanguage)).required(),

    });

    const result = schema.validate(user);

    if (result.error) {
        res.status(400).send({code: 400, error: result.error});
    } else {
        next();
    }
};



