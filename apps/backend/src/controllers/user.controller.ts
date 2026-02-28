import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../lib/exceptions/AppError';
import { userService } from '../services/user.service';

class UserController {
    uploadAvatar = async (req: Request, res: Response) => {
        if (!req.user) {
            throw new AppError('Unauthorized', StatusCodes.UNAUTHORIZED);
        }

        if (!req.file) {
            throw new AppError('File not found', StatusCodes.BAD_REQUEST);
        }

        const avatarUrl = `/uploads/avatars/${req.file.filename}`;

        const updatedUser = await userService.uploadAvatar(
            req.user.id,
            avatarUrl
        );

        res.status(StatusCodes.OK).json({
            status: 'success',
            message: 'Avatar uploaded successfully',
            data: {
                user: updatedUser,
            },
        });
    };
}

export const userController = new UserController();
