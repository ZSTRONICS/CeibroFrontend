import { ChangeEvent, useState } from "react";

interface UseSearchText {
    searchText: string;
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
    handleSearchTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
    clearSearchText: () => void;
}

const useSearchText = (): UseSearchText => {
    const [searchText, setSearchText] = useState<string>("");

    const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const clearSearchText = () => {
        setSearchText("");
    };

    return {
        searchText,
        setSearchText,
        handleSearchTextChange,
        clearSearchText,
    };
};

export default useSearchText;
