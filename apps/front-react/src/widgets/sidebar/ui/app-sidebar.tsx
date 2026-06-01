import * as React from 'react';

import { Sidebar } from '@/shared/ui/sidebar';
import { ConversationsPanel } from './conversations-panel';
import { SidebarRail } from './sidebar-rail';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar
            collapsible="icon"
            className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
            {...props}
        >
            <SidebarRail />
            <ConversationsPanel />
        </Sidebar>
    );
}
