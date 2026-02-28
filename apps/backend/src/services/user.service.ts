import { prisma } from '@realtime-chat/database';
import fs from 'fs';
import path from 'path';

class UserService {
    async uploadAvatar(userId: string, avatarUrl: string) {
        const currentUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                avatar: true,
            },
        });

        const oldAvatarUrl = currentUser?.avatar;

        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                avatar: avatarUrl,
            },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
                name: true,
                avatar: true,
                bio: true,
            },
        });

        if (oldAvatarUrl) {
            try {
                const fileName = path.basename(oldAvatarUrl);

                const filePath = path.join(
                    process.cwd(),
                    'public',
                    'uploads',
                    'avatars',
                    fileName
                );

                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                    console.log(`Old avatar deleted: ${fileName}`);
                });
            } catch (error: any) {
                if (error.code === 'ENOENT') {
                    console.warn(
                        'Old avatar was not found on disk. Skipping deletion'
                    );
                } else {
                    console.error('Error deleting old avatar:', error);
                }
            }
        }

        return updatedUser;
    }
}

export const userService = new UserService();
