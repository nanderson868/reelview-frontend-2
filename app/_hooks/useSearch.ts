// Hook to use the context

import { useContext } from "react";
import { SearchContextType, SearchContext } from "_contexts/SearchContext";

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
