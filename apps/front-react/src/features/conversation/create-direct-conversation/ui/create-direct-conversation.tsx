import { UserSearchResult, useUserSearch } from '@/entities/user';
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
import { Search } from 'lucide-react';
import { useCreateDirectConversation } from '../model/use-create-direct-conversation';
import { SearchUsersSkeletons } from './search-users-skeletons';

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
        setSearchTerm('');
        onOpenChange(false);
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] p-0 gap-0">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle>Новый чат</DialogTitle>
                    <DialogDescription>
                        Введите имя или @username пользователя, чтобы начать
                        общение.
                    </DialogDescription>
                </DialogHeader>

                <div className="px-6 pb-4">
                    <form className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Field>
                            <FieldLabel htmlFor="search" className="sr-only">
                                Поиск пользователей
                            </FieldLabel>
                            <Input
                                type="text"
                                placeholder="Поиск пользователей..."
                                className="pl-9 bg-muted/50 border-none focus-visible:ring-1"
                                autoFocus
                                id="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                disabled={isCreating}
                            />
                        </Field>
                    </form>
                </div>

                <Separator />

                <ScrollArea className="h-[300px]">
                    <div className="p-2">
                        {isFetching && <SearchUsersSkeletons />}

                        {!isFetching &&
                            users.map((user) => (
                                <UserSearchResult
                                    key={user.id}
                                    user={user}
                                    onSelect={handleSelectUser}
                                    disabled={isCreating}
                                />
                            ))}

                        {isNotFound && (
                            <div className="py-10 text-center">
                                <p className="text-sm font-medium">
                                    Пользователи не найдены
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    По запросу "{searchTerm}" совпадений нет
                                </p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

function Separator() {
    return <div className="h-[1px] bg-border w-full" />;
}
