import { prisma } from '@realtime-chat/database';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../lib/exceptions/AppError';
import { requireUser } from '../lib/helpers';

export const requireFreshUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const tokenUser = requireUser(req);

    const dbUser = await prisma.user.findUnique({
        where: { id: tokenUser.id },
        select: { id: true, role: true },
    });

    if (!dbUser) {
        throw new AppError('User not found', StatusCodes.UNAUTHORIZED);
    }

    // Overriding the role from the DB — in case it was changed manually
    // and the token hasn't refreshed yet
    tokenUser.role = dbUser.role;

    next();
};
