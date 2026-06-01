import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Label } from '@/shared/ui/label';
import { SheetContent, SheetHeader, SheetTitle } from '@/shared/ui/sheet';
import type { ConversationDetails } from '@realtime-chat/schema';
import { getConversationInfoSheetInfo } from '../model/get-conversation-info-sheet-info';

interface ConversationInfoSheetContentProps {
    conversation: ConversationDetails;
    currentUserId: string;
}

export function ConversationInfoSheetContent({
    conversation,
    currentUserId,
}: ConversationInfoSheetContentProps) {
    const conversationInfo = getConversationInfoSheetInfo(
        conversation,
        currentUserId
    );

    return (
        <SheetContent className="w-75 sm:w-100">
            <SheetHeader className="border-b">
                <SheetTitle>Информация о контакте</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col items-center gap-4 py-6 px-4">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={conversationInfo.avatar ?? undefined} />
                    <AvatarFallback className="text-2xl">
                        {conversationInfo.avatarFallback}
                    </AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h2 className="text-xl font-bold">
                        {conversationInfo.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {conversationInfo.username}
                    </p>
                </div>
            </div>

            <div className="space-y-4 px-4">
                {conversationInfo.bio && (
                    <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                            О себе
                        </Label>
                        <p className="text-sm">{conversationInfo.bio}</p>
                    </div>
                )}
                {/* <Separator />
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                        Медиа
                    </Label>
                    <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="aspect-square rounded-md bg-muted/50 border"
                            />
                        ))}
                    </div>
                </div> */}
            </div>
        </SheetContent>
    );
}
