import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { type FCC } from '../../../config';

interface SearchContextProps {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const SearchContext = createContext<SearchContextProps>(
  {} as SearchContextProps,
);

export const SearchProvider: FCC = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const payload: SearchContextProps = {
    count,
    increment,
    decrement,
  };

  return (
    <SearchContext.Provider value={payload}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext: () => SearchContextProps = () =>
  useContext(SearchContext);
