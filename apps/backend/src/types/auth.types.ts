import { Role } from '@realtime-chat/database';
import { JwtPayload } from 'jsonwebtoken';

export interface UserPayload {
    id: string;
    email: string;
    role: Role;
}

export interface DecodedToken extends UserPayload, JwtPayload {}
