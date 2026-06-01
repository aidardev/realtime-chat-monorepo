import { Search } from 'lucide-react';

import { StartConversationDialog } from '@/features/start-conversation';
import { SidebarHeader, SidebarInput } from '@/shared/ui/sidebar';

export function ConversationPanelHeader() {
    return (
        <SidebarHeader className="gap-3.5 border-b p-4">
            <div className="flex w-full items-center justify-between">
                <div className="text-base font-medium text-foreground">
                    Сообщения
                </div>
                <div className="flex items-center gap-2">
                    <StartConversationDialog />
                </div>
            </div>
            <div className="relative">
                <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <SidebarInput placeholder="Поиск..." className="pl-8" />
            </div>
        </SidebarHeader>
    );
}
