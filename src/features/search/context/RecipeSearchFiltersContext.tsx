import { createContext, useContext, useReducer } from 'react';
import { type FCC } from '../../../config';
import { initialState, searchReducer } from '../reducer/searchReducer';
import { type Ingredient, type Tag } from '../types';

interface RecipeSearchFiltersContextProps {
  ingredients: Ingredient[];
  tags: Tag[];
  addIngredient: (payload: Ingredient) => void;
  removeIngredient: (payload: string) => void;
  clearIngredients: () => void;
  addTag: (payload: Tag) => void;
  removeTag: (payload: string) => void;
  clearTags: () => void;
  clearFilters: () => void;
}

const RecipeSearchFiltersContext =
  createContext<RecipeSearchFiltersContextProps>(
    {} as RecipeSearchFiltersContextProps,
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

  const payload: RecipeSearchFiltersContextProps = {
    ingredients: state.ingredients,
    tags: state.tags,
    addIngredient,
    removeIngredient,
    clearIngredients,
    addTag,
    removeTag,
    clearTags,
    clearFilters,
  };

  return (
    <RecipeSearchFiltersContext.Provider value={payload}>
      {children}
    </RecipeSearchFiltersContext.Provider>
  );
};

export const useRecipeSearchFiltersContext: () => RecipeSearchFiltersContextProps =
  () => useContext(RecipeSearchFiltersContext);
