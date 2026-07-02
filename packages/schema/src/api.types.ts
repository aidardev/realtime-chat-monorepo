import type {
    ConversationDetails,
    ConversationListItem,
} from './conversation.schema.js';
import type { MessageFull } from './message.schema.js';
import type { User } from './user.schema.js';

export interface FieldError {
    path: string;
    message: string;
}

export interface ApiBaseSuccess {
    status: 'success';
    message?: string;
}

export interface ApiErrorResponse {
    status: 'fail' | 'error';
    message: string;
    errors?: FieldError[];
}

export interface ApiDataResponse<T> extends ApiBaseSuccess {
    data: T;
}

export interface ApiMessageResponse extends ApiBaseSuccess {}

export type ApiResponse<T = void> =
    | (T extends void ? ApiMessageResponse : ApiDataResponse<T>)
    | ApiErrorResponse;

// Response Payloads
export type AuthResponseData = {
    accessToken: string;
    user: User;
};

export type UserResponseData = {
    user: User;
};

export type UsersResponseData = {
    users: User[];
};

export type RefreshTokenResponseData = {
    accessToken: string;
};

export type ConversationResponseData = {
    conversation: ConversationDetails;
};

export type ConversationsResponseData = {
    conversations: ConversationListItem[];
};

export type MessagesResponseData = {
    messages: MessageFull[];
    hasMore: boolean;
};

export type MessageResponseData = {
    message: MessageFull;
};
