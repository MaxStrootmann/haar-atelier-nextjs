import React from "react";

interface SearchVisibilityContextProps {
  searchVisibility: boolean;
  toggleSearchVisibility: () => void;
}

const SearchVisibilityContext = React.createContext<SearchVisibilityContextProps>({
  searchVisibility: false,
  toggleSearchVisibility: () => null
});

export default SearchVisibilityContext;