import { describe, expect, it } from 'vitest';
import { RegisterFormSchema } from './auth.schema.js';

describe('RegisterFormSchema', () => {
    it('rejects mismatched passwords with error on password2', () => {
        const result = RegisterFormSchema.safeParse({
            email: 'a@b.com',
            username: 'user1',
            password: '123456',
            password2: '654321',
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            const [firstIssue] = result.error.issues;
            expect(firstIssue?.path).toEqual(['password2']);
        }
    });
});
