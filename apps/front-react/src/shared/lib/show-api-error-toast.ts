import { toast } from 'sonner';
import { isApiErrorData, isFetchBaseQueryError } from './handle-api-error';

export function showApiErrorToast(error: unknown, fallbackMessage = 'Something went wrong') {
    if (isFetchBaseQueryError(error) && isApiErrorData(error.data)) {
        toast.error(error.data.message);
        return;
    }

    toast.error(fallbackMessage);
}
