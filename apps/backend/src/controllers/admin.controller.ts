import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { adminService } from '../services/admin.service.js';

class AdminController {
    listUsers = async (req: Request, res: Response) => {
        const users = await adminService.listUsers();

        res.status(StatusCodes.OK).json({
            status: 'success',
            data: {
                users,
            },
        });
    };
}

export const adminController = new AdminController();
