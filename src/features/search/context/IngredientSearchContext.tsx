import { createContext, useContext, useReducer } from 'react';
import { type FCC } from '../../../config';
import { initialState, searchReducer } from '../reducer/searchReducer';
import { type Ingredient } from '../types';

interface IngredientSearchContextProps {
  count: number;
  ingredients: Ingredient[];
  addIngredient: (payload: Ingredient) => void;
  removeIngredient: (payload: string) => void;
}

const IngredientSearchContext = createContext<IngredientSearchContextProps>(
  {} as IngredientSearchContextProps,
);

export const IngredientSearchProvider: FCC = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const addIngredient = (payload: Ingredient) => {
    dispatch({
      type: 'ADD_TO_LIST',
      payload,
    });
  };

  const removeIngredient = (payload: string) => {
    dispatch({
      type: 'REMOVE_FROM_LIST',
      payload,
    });
  };

  const payload: IngredientSearchContextProps = {
    count: state.count,
    ingredients: state.ingredients,
    addIngredient,
    removeIngredient,
  };

  return (
    <IngredientSearchContext.Provider value={payload}>
      {children}
    </IngredientSearchContext.Provider>
  );
};

export const useIngredientSearchContext: () => IngredientSearchContextProps =
  () => useContext(IngredientSearchContext);
