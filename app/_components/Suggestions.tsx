"use client";
import React from "react";
import { Spinner } from "flowbite-react";
// import {
//   HiOutlineUser,
//   HiOutlineSearch,
//   HiOutlineQuestionMarkCircle,
// } from "react-icons/hi";
import { IconType } from "react-icons";
import { useSearch } from "_hooks/useSearch";
import { useAPI } from "_hooks/useAPI";
import { Query } from "_utils/types";
import { on } from "events";
import SmartItem from "_components/SmartItem";

// const getIconComponent = async (value: string): Promise<JSX.Element> => {
//   const query = await api.getUser(value);
//   const getIconType = (user: Query): IconType => {
//     if (user) return HiOutlineUser;
//     return HiOutlineSearch;
//   };
//   const IconComponent = getIconType(query);
//   return <IconComponent />;
// };

type SearchSuggestionsProps = {
  disabled: boolean;
};

const SearchSuggestions = React.memo(({ disabled }: SearchSuggestionsProps) => {
  const {
    suggestions,
    query,
    activeIndex,
    isLoadingSuggestions: loadingSuggestions,
    handleSubmit,
    isFocused: focused,
  } = useSearch();

  if (!focused) return null;

  return (
    <ul className="max-h-60 w-full items-center justify-center space-y-1 overflow-y-scroll">
      <span className="search-header">Search</span>
      <SmartItem
        item={query}
        index={0}
        onClick={(e) => {
          e.preventDefault;
        }}
        isActive={activeIndex === 0}
        disabled={disabled}
      />
      {loadingSuggestions ? (
        <>
          <Spinner className="flex place-self-center self-center" />
        </>
      ) : (
        [query, ...suggestions].map((item, index) => (
          <React.Fragment key={index}>
            {index === 0 && <span className="search-header">Suggestions</span>}
            {ItemEl(item, index)}
          </React.Fragment>
        ))
      )}
    </ul>
  );
});

SearchSuggestions.displayName = "SuggestionsList";

export default SearchSuggestions;
