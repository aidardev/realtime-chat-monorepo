import { CookieOptions } from 'express';

export const BASE_COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const, // CSRF protection
    path: '/',
};

export const REFRESH_COOKIE_OPTIONS: CookieOptions = {
    ...BASE_COOKIE_OPTIONS,
    maxAge: 30 * 24 * 60 * 60 * 1000,
};
