import { showApiErrorToast } from '@/shared/lib/show-api-error-toast';
import { useState, type FormEvent } from 'react';
import { useSendMessageMutation } from '../api/message-api';

export const useMessageComposer = (conversationId: string) => {
    const [content, setContent] = useState('');
    const [sendMessage, { isLoading }] = useSendMessageMutation();

    const trimmedContent = content.trim();
    const canSend = !isLoading && trimmedContent.length > 0;

    const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        if (!canSend) return;

        try {
            await sendMessage({
                id: conversationId,
                content: trimmedContent,
            }).unwrap();

            setContent('');
        } catch (error) {
            showApiErrorToast(error);
        }
    };

    return {
        handleSubmit,
        content,
        setContent,
        isLoading,
        canSend,
    };
};
