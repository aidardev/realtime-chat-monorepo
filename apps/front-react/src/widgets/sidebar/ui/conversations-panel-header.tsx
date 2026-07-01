import { SidebarHeader } from '@/shared/ui/sidebar';
import { NewConversationDropdown } from './new-conversation-dropdown';

export function ConversationPanelHeader() {
    return (
        <SidebarHeader className="gap-3.5 border-b p-4">
            <div className="flex w-full items-center justify-between">
                <div className="text-base font-medium text-foreground">
                    Messages
                </div>
                <div className="flex items-center gap-2">
                    <NewConversationDropdown />
                </div>
            </div>
            {/* Todo: search conversations */}
            {/* <div className="relative">
                <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <SidebarInput placeholder="Поиск..." className="pl-8" />
            </div> */}
        </SidebarHeader>
    );
}
