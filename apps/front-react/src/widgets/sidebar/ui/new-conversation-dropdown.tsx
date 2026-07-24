import { CreateDirectConversationDialog } from '@/features/conversation/create-direct-conversation';
import { CreateGroupConversationDialog } from '@/features/conversation/create-group-conversation';
import { Button } from '@/shared/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { MessageSquarePlus, Plus, Users } from 'lucide-react';
import { useState } from 'react';

export function NewConversationDropdown() {
    const [activeDialog, setActiveDialog] = useState<'direct' | 'group' | null>(null);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground hover:text-primary"
                    >
                        <Plus className="size-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem onClick={() => setActiveDialog('direct')}>
                        <MessageSquarePlus className="mr-2 h-4 w-4" />
                        New direct message
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveDialog('group')}>
                        <Users className="mr-2 h-4 w-4" />
                        New group
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <CreateDirectConversationDialog
                open={activeDialog === 'direct'}
                onOpenChange={(open) => setActiveDialog(open ? 'direct' : null)}
            />

            <CreateGroupConversationDialog
                open={activeDialog === 'group'}
                onOpenChange={(open) => setActiveDialog(open ? 'group' : null)}
            />
        </>
    );
}
