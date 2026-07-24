import { Role } from '@realtime-chat/database';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../lib/exceptions/AppError.js';
import { requireUser } from '../lib/helpers.js';

export const requireRole = (...allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = requireUser(req);

        if (!allowedRoles.includes(user.role)) {
            throw new AppError('Forbidden: insufficient permissions', StatusCodes.FORBIDDEN);
        }

        next();
    };
};
