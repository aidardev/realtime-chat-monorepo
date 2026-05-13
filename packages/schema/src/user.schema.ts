import * as z from 'zod';

export const UserSchema = z.object({
    id: z.string(),
    email: z.email(),
    username: z.string().min(3),
    role: z.enum(['USER', 'ADMIN']),
    createdAt: z.string(),
    name: z.string().optional(),
    avatar: z.string().optional(),
    bio: z.string().optional(),
});

export const PublicUserSchema = UserSchema.pick({
    id: true,
    username: true,
    name: true,
    avatar: true,
});

export type User = z.infer<typeof UserSchema>;
