import { createContext, useContext, useReducer } from 'react';
import { type FCC } from '../../../config';
import { initialState, searchReducer } from '../reducer/searchReducer';
import { type Ingredient } from '../types';

interface IngredientSearchContextProps {
  count: number;
  ingredients: Ingredient[];
  addToList: (payload: Ingredient) => void;
  removeFromList: (payload: string) => void;
}

const IngredientSearchContext = createContext<IngredientSearchContextProps>(
  {} as IngredientSearchContextProps,
);

export const IngredientSearchProvider: FCC = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
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

  const payload: IngredientSearchContextProps = {
    count: state.count,
    ingredients: state.ingredients,
    addToList,
    removeFromList,
  };

  return (
    <IngredientSearchContext.Provider value={payload}>
      {children}
    </IngredientSearchContext.Provider>
  );
};

export const useIngredientSearchContext: () => IngredientSearchContextProps =
  () => useContext(IngredientSearchContext);
