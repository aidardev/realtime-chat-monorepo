import { getImageUrl } from '@/shared/lib/get-image-url';
import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import type { PublicUser } from '@realtime-chat/schema';

interface UserSearchResultProps {
    user: PublicUser;
    onSelect: (user: PublicUser) => void;
    disabled?: boolean;
    selected?: boolean;
    rightSlot?: React.ReactNode;
}

export function UserSearchResult({
    user,
    onSelect,
    disabled,
    selected,
    rightSlot,
}: UserSearchResultProps) {
    return (
        <div
            className={cn(
                'w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/80 transition-colors group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring',
                selected && 'bg-accent',
                disabled && 'pointer-events-none'
            )}
            onClick={() => onSelect(user)}
        >
            <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-10 w-10 border shrink-0">
                    <AvatarImage src={getImageUrl(user.avatar)} alt={user.name} />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-sm truncate">
                    <span className="font-medium truncate w-full text-left">{user.name}</span>
                    <span className="text-muted-foreground text-xs italic truncate w-full text-left">
                        @{user.username}
                    </span>
                </div>
            </div>

            {rightSlot}
        </div>
    );
}
