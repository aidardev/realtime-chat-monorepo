import { prisma } from '@realtime-chat/database';
import { publicUserSelect } from '../lib/db-selects/user.select';

class AdminService {
    async listUsers() {
        return prisma.user.findMany({
            select: publicUserSelect,
        });
    }
}

export const adminService = new AdminService();
