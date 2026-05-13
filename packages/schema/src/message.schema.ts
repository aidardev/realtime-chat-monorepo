import * as z from 'zod';

export const SendMessageSchema = z.object({
    content: z.string(),
});
