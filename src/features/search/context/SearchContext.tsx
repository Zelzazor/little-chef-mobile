import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { type FCC } from '../../../config';
import { initialState, searchReducer } from '../reducer/searchReducer';

interface SearchContextProps {
  count: number;
  ingredients: any[];
  increment: () => void;
  decrement: () => void;
  addToList: (payload: any) => void;
  removeFromList: (payload: number) => void;
}

const SearchContext = createContext<SearchContextProps>(
  {} as SearchContextProps,
);

export const SearchProvider: FCC = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  const addToList = (payload: any) => {
    dispatch({
      type: 'ADD_TO_LIST',
      payload,
    });
  };

  const removeFromList = (payload: number) => {
    dispatch({
      type: 'REMOVE_FROM_LIST',
      payload,
    });
  };

  const payload: SearchContextProps = {
    count: state.count,
    ingredients: state.ingredients,
    increment,
    decrement,
    addToList,
    removeFromList,
  };

  return (
    <SearchContext.Provider value={payload}>{children}</SearchContext.Provider>
  );
};

export const useSearchContext: () => SearchContextProps = () =>
  useContext(SearchContext);
