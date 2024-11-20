"use client";
import React, { useCallback, useState } from "react";
import { IconType } from "react-icons";
import SmartButton from "_components/SmartButton";
import { Query } from "_utils/types";
import SearchSuggestions from "_components/Suggestions";
import { useAPI } from "_hooks/useAPI";
import { HiOutlineSearch } from "react-icons/hi";
import SearchInput from "_components/SearchInput";
import { SearchProvider } from "_contexts/SearchContext";

interface SmartSearchProps {
  onSelect: (query: Query) => Promise<void> | void;
  disabled?: boolean;
  className?: string;
  Icon?: IconType;
}

const SmartSearch: React.FC<SmartSearchProps> = ({
  onSelect = async () => Promise<void>,
  disabled = false,
  className,
  Icon = HiOutlineSearch,
}) => {
  const [loadingSelect, setLoadingSelect] = useState(false);

  const { api } = useAPI();

  const handleSelect = useCallback(
    async (value: any) => {
      if (!value || disabled || loadingSelect) return;
      console.log("Selected:", value);
      setLoadingSelect(true);
      try {
        await onSelect({ query: value });
      } catch (error) {
        console.error("Async operation failed:", error);
      } finally {
        setLoadingSelect(false);
      }
    },
    [disabled, loadingSelect, onSelect],
  );

  // const handleGetSuggest = async (query: string) => {
  //   console.log("Searching for:", query);
  //   return await api.searchUsers(query);
  // };

  return (
    <SearchProvider getSuggestions={api.searchUsers} onSubmit={handleSelect}>
      <div className={`relative flex w-full flex-col ${className}`}>
        <div className="absolute z-20 flex w-full  flex-col rounded-lg border  shadow-md dark:bg">
          <div className="relative flex items-center">
            <SmartButton
              Icon={Icon}
              colorTheme="none"
              loading={loadingSelect}
              className="absolute inset-y-0 left-0 z-20  flex items-center"
            />
            <SearchInput disabled={loadingSelect} />
          </div>
          <SearchSuggestions disabled={disabled} />
        </div>
      </div>
    </SearchProvider>
  );
};

export default SmartSearch;
