import {
    SearchUsersSkeletons,
    UserSearchResult,
    useUserSearch,
} from '@/entities/user';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { Field, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Separator } from '@/shared/ui/separator';
import { Search, UserPlus } from 'lucide-react';
import { useCreateDirectConversation } from '../model/use-create-direct-conversation';

interface CreateDirectConversationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateDirectConversationDialog({
    open,
    onOpenChange,
}: CreateDirectConversationDialogProps) {
    const { users, isFetching, searchTerm, setSearchTerm, isNotFound } =
        useUserSearch();

    const { handleSelectUser, isCreating } = useCreateDirectConversation(() => {
        onOpenChange(false);
    });

    function handleAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
        const isClosed =
            e.currentTarget.getAttribute('data-state') === 'closed';

        if (isClosed) {
            setSearchTerm('');
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-[425px]"
                onAnimationEnd={handleAnimationEnd}
            >
                <DialogHeader>
                    <DialogTitle>New Chat</DialogTitle>
                    <DialogDescription>
                        Enter a name or @username to start a conversation.
                    </DialogDescription>
                </DialogHeader>

                <form className="relative" onSubmit={(e) => e.preventDefault()}>
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Field>
                        <FieldLabel htmlFor="direct-search" className="sr-only">
                            Search users
                        </FieldLabel>
                        <Input
                            id="direct-search"
                            type="text"
                            placeholder="Search users..."
                            className="pl-9"
                            autoFocus
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={isCreating}
                        />
                    </Field>
                </form>

                <Separator />

                <ScrollArea className="h-[300px] pr-2">
                    {isFetching && <SearchUsersSkeletons />}

                    {!isFetching &&
                        users.map((user) => (
                            <UserSearchResult
                                key={user.id}
                                user={user}
                                onSelect={handleSelectUser}
                                disabled={isCreating}
                                rightSlot={
                                    <UserPlus className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity shrink-0 ml-2" />
                                }
                            />
                        ))}

                    {isNotFound && (
                        <div className="py-10 text-center">
                            <p className="text-sm font-medium">
                                No users found
                            </p>
                            <p className="text-xs text-muted-foreground">
                                No matches for "{searchTerm}"
                            </p>
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
