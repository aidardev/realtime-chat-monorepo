import {
    SearchUsersSkeletons,
    UserSearchResult,
    useUserSearch,
} from '@/entities/user';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Separator } from '@/shared/ui/separator';
import { Loader2, Search, X } from 'lucide-react';
import { useCreateGroupConversation } from '../model/use-create-group-conversation';

interface CreateGroupConversationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateGroupConversationDialog({
    open,
    onOpenChange,
}: CreateGroupConversationDialogProps) {
    const { users, isFetching, searchTerm, setSearchTerm, isNotFound } =
        useUserSearch();

    const {
        groupName,
        setGroupName,
        selectedUsers,
        toggleUser,
        isUserToggled,
        reset,
        isLoading,
        isValid,
        handleCreateGroup,
        errors,
    } = useCreateGroupConversation(() => {
        onOpenChange(false);
    });

    function handleAnimationEnd(e: React.AnimationEvent<HTMLDivElement>) {
        const isClosed =
            e.currentTarget.getAttribute('data-state') === 'closed';

        if (isClosed) {
            reset();
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
                    <DialogTitle>New Group</DialogTitle>
                    <DialogDescription>
                        Create a new group conversation with at least 2
                        participants.
                    </DialogDescription>
                </DialogHeader>

                <Field>
                    <FieldLabel htmlFor="group-name" className="sr-only">
                        Group Name
                    </FieldLabel>
                    <Input
                        id="group-name"
                        placeholder="Group name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        disabled={isLoading}
                    />
                    {errors.name && <FieldError>{errors.name}</FieldError>}
                </Field>

                {selectedUsers.length > 0 && (
                    <div className="flex flex-wrap gap-1 max-h-[80px] overflow-y-auto p-1.5 border rounded-md">
                        {selectedUsers.map((user) => (
                            <Badge
                                key={user.id}
                                variant="secondary"
                                className="gap-1 pr-1"
                            >
                                {user.username}
                                <button
                                    type="button"
                                    onClick={() => toggleUser(user)}
                                    disabled={isLoading}
                                    className="rounded-full hover:bg-muted p-0.5"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}

                <form className="relative" onSubmit={(e) => e.preventDefault()}>
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Field>
                        <FieldLabel htmlFor="group-search" className="sr-only">
                            Search members
                        </FieldLabel>
                        <Input
                            id="group-search"
                            placeholder="Search users..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={isLoading}
                        />
                    </Field>
                </form>

                {errors.userIds && <FieldError>{errors.userIds}</FieldError>}

                <Separator />

                <ScrollArea className="h-[200px] pr-2">
                    {isFetching && <SearchUsersSkeletons />}

                    {!isFetching &&
                        users.map((user) => (
                            <UserSearchResult
                                key={user.id}
                                user={user}
                                onSelect={toggleUser}
                                selected={isUserToggled(user)}
                                disabled={isLoading}
                                rightSlot={
                                    <Checkbox
                                        checked={isUserToggled(user)}
                                        className="pointer-events-none"
                                    />
                                }
                            />
                        ))}

                    {isNotFound && (
                        <div className="py-6 text-center">
                            <p className="text-sm font-medium">
                                No users found
                            </p>
                            <p className="text-xs text-muted-foreground">
                                No matches for "{searchTerm}"
                            </p>
                        </div>
                    )}
                </ScrollArea>

                <DialogFooter>
                    <Button
                        onClick={handleCreateGroup}
                        disabled={isLoading || !isValid}
                        className="w-full sm:w-auto"
                    >
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Create Group
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
