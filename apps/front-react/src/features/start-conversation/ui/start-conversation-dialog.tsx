import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/ui/dialog';
import { Field, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearch } from '../model/use-search';
import { useStartConversation } from '../model/use-start-conversation';
import { SearchUserItem } from './search-user-item';
import { SearchUsersSkeletons } from './search-users-skeletons';

export function StartConversationDialog() {
    const navigate = useNavigate();
    const [open, setIsOpen] = useState(false);

    const {
        data,
        isLoading: isSearchLoading,
        searchTerm,
        setSearchTerm,
    } = useSearch();
    const { handleStartConversation, isConversationCreating } =
        useStartConversation();

    const users = data || [];

    const handleSelectUser = async (userId: string) => {
        try {
            const response = await handleStartConversation(userId);

            const newConversationId = response.id;

            setIsOpen(false);
            setSearchTerm('');

            navigate(`/conversations/${newConversationId}`);
        } catch (error) {}
    };

    const isNotFound = searchTerm && !isSearchLoading && users.length === 0;
    const hasResults = users.length > 0;

    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <DialogTrigger className="text-muted-foreground hover:text-primary">
                <Plus className="size-5" />
            </DialogTrigger>
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
                                disabled={isConversationCreating}
                            />
                        </Field>
                    </form>
                </div>

                <Separator />

                <ScrollArea className="h-[300px]">
                    <div className="p-2">
                        {isSearchLoading && <SearchUsersSkeletons />}

                        {!isSearchLoading &&
                            hasResults &&
                            users.map((user) => (
                                <SearchUserItem
                                    key={user.id}
                                    user={user}
                                    onSelect={handleSelectUser}
                                    disabled={isConversationCreating}
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
