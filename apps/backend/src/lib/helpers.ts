import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from './exceptions/AppError.js';

export function requireUser(req: Request) {
    if (!req.user) {
        throw new AppError('Unauthorized', StatusCodes.UNAUTHORIZED);
    }

    return req.user;
}
