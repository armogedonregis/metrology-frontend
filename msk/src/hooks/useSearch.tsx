import { useEffect, useState } from "react";

export const useSearch = () => {
    const [search, setSearch] = useState<string>('');
    const [asyncSearch, setAsyncSearch] = useState<string>('');

    const handleSearch = (text: string) => {
        setSearch(text)
    };
    useEffect(() => {
        if (search) {
            const timer = setTimeout(() => {
                setAsyncSearch(search)
            }, 500)
            return () => clearTimeout(timer)
        } else {
            setAsyncSearch('')
        }
    }, [search])

    return {
        search, handleSearch, asyncSearch
    }
};