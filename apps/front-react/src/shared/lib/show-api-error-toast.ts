import { toast } from 'sonner';
import { isFetchBaseQueryError } from './handle-api-error';

export function showApiErrorToast(
    error: unknown,
    fallbackMessage = 'Something went wrong'
) {
    if (isFetchBaseQueryError(error)) {
        const data = error.data;

        if (
            typeof data === 'object' &&
            data !== null &&
            'message' in data &&
            typeof data.message === 'string'
        ) {
            toast.error(data.message);
            return;
        }
    }

    toast.error(fallbackMessage);
}
