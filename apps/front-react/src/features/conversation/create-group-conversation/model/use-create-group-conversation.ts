import { useStartConversationMutation } from '@/entities/conversation';
import { showApiErrorToast } from '@/shared/lib/show-api-error-toast';
import { ConversationRequestSchema, type PublicUser } from '@realtime-chat/schema';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

type ValidationErrors = {
    name?: string;
    userIds?: string;
};

export function useCreateGroupConversation(onSuccess?: () => void) {
    const navigate = useNavigate();
    const [selectedUsers, setSelectedUsers] = useState<PublicUser[]>([]);
    const [groupName, setGroupName] = useState('');
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [startConversation, { isLoading }] = useStartConversationMutation();

    const isValid = selectedUsers.length >= 2 && groupName.trim().length > 0;

    useEffect(() => {
        if (errors.name) {
            setErrors((prev) => ({ ...prev, name: undefined }));
        }
    }, [groupName]);

    useEffect(() => {
        if (errors.userIds) {
            setErrors((prev) => ({ ...prev, userIds: undefined }));
        }
    }, [selectedUsers]);

    async function handleCreateGroup() {
        setErrors({});

        const payload = {
            isGroup: true,
            userIds: selectedUsers.map((u) => u.id),
            name: groupName.trim(),
        } as const;

        const result = ConversationRequestSchema.safeParse(payload);

        if (!result.success) {
            const formattedErrors: ValidationErrors = {};

            result.error.issues.forEach((error) => {
                const path = error.path[0];
                if (path === 'name') {
                    formattedErrors.name = error.message;
                } else if (path === 'userIds') {
                    formattedErrors.userIds = error.message;
                }
            });

            setErrors(formattedErrors);
            return;
        }

        try {
            const conversation = await startConversation(result.data).unwrap();

            navigate(`/conversations/${conversation.id}`);
            onSuccess?.();
        } catch (error) {
            showApiErrorToast(error);
        }
    }

    function toggleUser(user: PublicUser) {
        setSelectedUsers((prev) => {
            return prev.some((u) => u.id === user.id)
                ? prev.filter((u) => u.id !== user.id)
                : [...prev, user];
        });
    }

    function isUserToggled(user: PublicUser) {
        return selectedUsers.some((u) => u.id === user.id);
    }

    function reset() {
        setSelectedUsers([]);
        setGroupName('');
        setErrors({});
    }

    return {
        groupName,
        setGroupName,
        selectedUsers,
        toggleUser,
        isUserToggled,
        reset,
        isLoading,
        handleCreateGroup,
        isValid,
        errors,
    };
}
