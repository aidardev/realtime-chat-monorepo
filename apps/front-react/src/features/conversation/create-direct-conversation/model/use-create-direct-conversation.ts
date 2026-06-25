import { useStartConversationMutation } from '@/entities/conversation';
import { showApiErrorToast } from '@/shared/lib/show-api-error-toast';
import type { PublicUser } from '@realtime-chat/schema';
import { useNavigate } from 'react-router';

export const useCreateDirectConversation = (onSuccess?: () => void) => {
    const navigate = useNavigate();
    const [startConversation, { isLoading }] = useStartConversationMutation();

    const handleSelectUser = async (user: PublicUser) => {
        try {
            const conversation = await startConversation({
                userIds: [user.id],
                isGroup: false,
            }).unwrap();

            navigate(`/conversations/${conversation.id}`);
            onSuccess?.();
        } catch (error) {
            showApiErrorToast(error);
        }
    };

    return {
        handleSelectUser,
        isCreating: isLoading,
    };
};
