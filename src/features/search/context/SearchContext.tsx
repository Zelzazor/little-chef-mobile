import { createContext, useContext, useReducer } from 'react';
import { type FCC } from '../../../config';
import { initialState, searchReducer } from '../reducer/searchReducer';
import { type Ingredient } from '../types';

interface SearchContextProps {
  count: number;
  ingredients: Ingredient[];
  increment: () => void;
  decrement: () => void;
  addToList: (payload: Ingredient) => void;
  removeFromList: (payload: string) => void;
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

  const addToList = (payload: Ingredient) => {
    dispatch({
      type: 'ADD_TO_LIST',
      payload,
    });
  };

  const removeFromList = (payload: string) => {
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
