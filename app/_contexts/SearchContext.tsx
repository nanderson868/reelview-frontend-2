"use client";
import useKeyboardNavigation from "_hooks/useNavKeys";
import { MAX_STRING_LENGTH } from "_utils/constants";
import React, { ReactNode, createContext, useEffect, useState } from "react";

export interface SearchContextType {
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  handleQueryChange: (value: string) => void;
  handleQueryKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  suggestions: any[];
  isLoadingSuggestions: boolean;
  activeItem: any;
  activeIndex: number;
  handleSubmit: (value: any) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
);

type SearchProviderProps = {
  children: ReactNode;
  getSuggestions: (query: string) => Promise<any[]>;
  onSubmit: (selection: unknown) => void;
};

export const SearchProvider = ({
  children,
  getSuggestions,
  onSubmit,
}: SearchProviderProps) => {
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleQueryChange = (query: string) => {
    if (query === undefined || query.length > MAX_STRING_LENGTH) return;
    setQuery(query);
  };

  const handleSubmit = (item?: unknown) => {
    console.log("Handling submit...");
    if (!item) onSubmit(activeItem);
    console.log("Submitting Item:", item);
    onSubmit(item);
  };

  const handleQueryKeyDown = useKeyboardNavigation({
    count: suggestions.length,
    setIndex: setActiveIndex,
    onEnter: handleSubmit,
  });

  useEffect(() => {
    const updateSuggestions = async (query: string) => {
      setIsLoadingSuggestions(true);
      try {
        const suggestions = await getSuggestions(query);
        console.log("Suggestions:", suggestions);
        setSuggestions(suggestions);
      } catch (error) {
        console.error("Async operation failed:", error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };
    if (query.length > 0) updateSuggestions(query);
  }, [query, getSuggestions]);

  /**
   * Update selection based on suggestion index
   */
  useEffect(() => {
    if (suggestions.length == 0) {
      setActiveItem(null);
      setActiveIndex(0);
    } else if (activeIndex < suggestions.length) {
      setActiveItem(suggestions[activeIndex]);
    } else {
      setActiveIndex((prev) => Math.min(prev, suggestions.length));
    }
  }, [suggestions, activeIndex]);

  return (
    <SearchContext.Provider
      value={{
        isFocused,
        setIsFocused,
        query,
        handleQueryChange,
        handleQueryKeyDown,
        suggestions,
        isLoadingSuggestions,
        activeItem,
        activeIndex,
        handleSubmit,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
