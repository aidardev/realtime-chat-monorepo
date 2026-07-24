import type { ApiErrorResponse } from '@realtime-chat/schema';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';

/**
 * Type predicate: проверяет, является ли ошибка ответом от RTK Query (HTTP error)
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
}

/**
 * Type predicate: проверяет, соответствует ли data нашему формату ApiErrorResponse
 */
export function isApiErrorData(data: unknown): data is ApiErrorResponse {
    if (typeof data !== 'object' || data === null) {
        return false;
    }

    const value = data as Record<string, unknown>;

    const hasValidStatus = value.status === 'fail' || value.status === 'error';
    const hasValidMessage = typeof value.message === 'string';
    const hasValidErrors = value.errors === undefined || Array.isArray(value.errors);

    return hasValidStatus && hasValidMessage && hasValidErrors;
}

export const handleApiError = <T extends FieldValues>(
    error: unknown,
    setError: UseFormSetError<T>
) => {
    // 1. Проверяем, что это ошибка запроса (HTTP)
    if (isFetchBaseQueryError(error)) {
        const errorData = error.data;

        // 2. Проверяем, что сервер вернул ошибку в нашем ожидаемом формате
        if (isApiErrorData(errorData)) {
            // А. Если есть детальные ошибки полей (обычно статус 400 / ZodError)
            if (errorData.errors && errorData.errors.length > 0) {
                errorData.errors.forEach((err) => {
                    setError(err.path as Path<T>, {
                        type: 'server',
                        message: err.message,
                    });
                });
            }
            // Б. Если это общая ошибка (401 Unauthorized, 409 Conflict, etc.)
            else {
                setError('root', {
                    type: 'server',
                    message: errorData.message, // "Invalid login or password"
                });
            }
        } else {
            // В. Сервер вернул что-то странное (не JSON, plain text и т.д.)
            console.error('Unknown API Error Format:', error);
            toast.error('Something went wrong on the server');
            return;
        }
    }
    // 3. Ошибки сети, парсинга или JS (SerializedError)
    else {
        console.error('Non-HTTP Error:', error);
        toast.error('Network error or internal issue. Please try again.');
    }
};
