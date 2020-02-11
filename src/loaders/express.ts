import { NextFunction, Request, Response } from 'express';
import { app } from 'src';

class ServerError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}
