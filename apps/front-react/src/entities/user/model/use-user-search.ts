import { useSearchQuery } from '@/entities/user';
import { useDebounce } from '@/shared/lib/use-debounce';
import { useState } from 'react';

export const useUserSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm);

    const { data, isLoading, isFetching } = useSearchQuery(debouncedSearchTerm, {
        skip: debouncedSearchTerm.length < 2,
    });

    const users = debouncedSearchTerm.length < 2 ? [] : (data ?? []);
    const hasSearched = debouncedSearchTerm.length >= 2;
    const isNotFound = hasSearched && !isFetching && users.length === 0;

    return {
        users,
        isLoading,
        isFetching,
        searchTerm,
        setSearchTerm,
        isNotFound,
    };
};
