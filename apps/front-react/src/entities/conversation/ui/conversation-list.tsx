import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
} from '@/shared/ui/sidebar';
import type { ConversationListItem as ConversationListItemSchema } from '@realtime-chat/schema';
import { ConversationListItem } from './conversation-list-item';

interface ConversationListProps {
    conversations: ConversationListItemSchema[];
    currentUserId: string;
}

export function ConversationList({
    conversations = [],
    currentUserId,
}: ConversationListProps) {
    return (
        <SidebarContent>
            <SidebarGroup className="px-0">
                <SidebarGroupContent>
                    {conversations.map((conversation) => (
                        <ConversationListItem
                            key={conversation.id}
                            conversation={conversation}
                            currentUserId={currentUserId}
                        />
                    ))}
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    );
}
