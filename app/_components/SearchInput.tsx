"use client";
import React, { useEffect, useRef } from "react";
import { TextInput } from "flowbite-react";
import { useSearch } from "_hooks/useSearch";

interface SearchInputProps {
  disabled?: boolean;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  disabled = false,
  placeholder = "Search",
}) => {
  const {
    query,
    setIsFocused,
    handleQueryChange,
    handleQueryKeyDown,
    activeItem,
  } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) inputRef.current.focus();
  }, [disabled]);

  return (
    <TextInput
      ref={inputRef}
      value={typeof activeItem == "string" ? activeItem : query}
      onChange={(e) => handleQueryChange(e.target.value)}
      onKeyDown={handleQueryKeyDown}
      placeholder={placeholder}
      color="search"
      disabled={disabled}
      spellCheck={false}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

export default SearchInput;
