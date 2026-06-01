import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Sheet, SheetTrigger } from '@/shared/ui/sheet';
import type { ConversationDetails } from '@realtime-chat/schema';
import { Info, MoreVertical, Phone, Video } from 'lucide-react';
import { getConversationHeaderInfo } from '../model/get-conversation-header-info';
import { ConversationInfoSheetContent } from './conversation-info-sheet-content';

interface CovnersationHeaderProps {
    conversation: ConversationDetails;
    currentUserId: string;
}

export function ConversationHeader({
    conversation,
    currentUserId,
}: CovnersationHeaderProps) {
    const headerInfo = getConversationHeaderInfo(conversation, currentUserId);

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={headerInfo.avatar ?? undefined} />
                    <AvatarFallback>{headerInfo.avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold text-sm">
                        {headerInfo.title}
                    </div>
                    <div className="text-xs text-primary font-medium">
                        Online
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                >
                    <Phone className="size-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                >
                    <Video className="size-5" />
                </Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground"
                        >
                            <Info className="size-5" />
                        </Button>
                    </SheetTrigger>
                    <ConversationInfoSheetContent
                        conversation={conversation}
                        currentUserId={currentUserId}
                    />
                </Sheet>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground"
                        >
                            <MoreVertical className="size-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Очистить чат</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                            Заблокировать
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
