import { createContext, useContext, useReducer } from 'react';
import { type FCC } from '../../../config';
import { initialState, searchReducer } from '../reducer/searchReducer';
import { type Ingredient, type Tag } from '../types';

interface IngredientSearchContextProps {
  ingredients: Ingredient[];
  addIngredient: (payload: Ingredient) => void;
  removeIngredient: (payload: string) => void;
  clearIngredients: () => void;
  addTag: (payload: Tag) => void;
  removeTag: (payload: string) => void;
  clearTags: () => void;
  clearFilters: () => void;
}

const IngredientSearchContext = createContext<IngredientSearchContextProps>(
  {} as IngredientSearchContextProps,
);

export const IngredientSearchProvider: FCC = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const addIngredient = (payload: Ingredient) => {
    dispatch({
      type: 'ADD_TO_INGREDIENT_LIST',
      payload,
    });
  };

  const removeIngredient = (payload: string) => {
    dispatch({
      type: 'REMOVE_FROM_INGREDIENT_LIST',
      payload,
    });
  };

  const clearIngredients = () => {
    dispatch({
      type: 'CLEAR_INGREDIENT_LIST',
    });
  };

  const addTag = (payload: Tag) => {
    dispatch({
      type: 'ADD_TO_TAG_LIST',
      payload,
    });
  };

  const removeTag = (payload: string) => {
    dispatch({
      type: 'REMOVE_FROM_TAG_LIST',
      payload,
    });
  };

  const clearTags = () => {
    dispatch({
      type: 'CLEAR_TAG_LIST',
    });
  };

  const clearFilters = () => {
    dispatch({
      type: 'CLEAR_FILTERS',
    });
  };

  const payload: IngredientSearchContextProps = {
    ingredients: state.ingredients,
    addIngredient,
    removeIngredient,
    clearIngredients,
    addTag,
    removeTag,
    clearTags,
    clearFilters,
  };

  return (
    <IngredientSearchContext.Provider value={payload}>
      {children}
    </IngredientSearchContext.Provider>
  );
};

export const useIngredientSearchContext: () => IngredientSearchContextProps =
  () => useContext(IngredientSearchContext);
