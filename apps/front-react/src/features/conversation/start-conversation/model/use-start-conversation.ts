import { showApiErrorToast } from '@/shared/lib/show-api-error-toast';
import { useStartConversationMutation } from '../api/start-conversation-api';

export const useStartConversation = () => {
    const [startConversation, { isLoading }] = useStartConversationMutation();

    const handleStartConversation = async (userId: string) => {
        try {
            return await startConversation({
                userIds: [userId],
                isGroup: false,
            }).unwrap();
        } catch (error) {
            showApiErrorToast(error);

            throw error;
        }
    };

    return {
        handleStartConversation,
        isConversationCreating: isLoading,
    };
};
