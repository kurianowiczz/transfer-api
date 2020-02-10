import { NextFunction, Request, Response } from 'express';

export default (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.validate(req.body);
        if (result.error) {
            res.status(400).send({code: 400, error: result.error});
        } else {
            next();
        }
    };
};
