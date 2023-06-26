import { type Ingredient, type Recipe, type Tag } from '../types';

export const initialState = {
  ingredients: [] as Ingredient[],
  tags: [] as Tag[],
  recipes: [] as Recipe[],
};

const actions = {
  ADD_TO_INGREDIENT_LIST: addToIngredientList,
  REMOVE_FROM_INGREDIENT_LIST: removeFromIngredientList,
  CLEAR_INGREDIENT_LIST: clearIngredientList,
  ADD_TO_TAG_LIST: addToTagList,
  REMOVE_FROM_TAG_LIST: removeFromTagList,
  CLEAR_TAG_LIST: clearTagList,
  CLEAR_FILTERS: clearFilters,
};

function addToIngredientList(state: typeof initialState, payload: Ingredient) {
  return { ingredients: state.ingredients.concat([payload]) };
}

function removeFromIngredientList(state: typeof initialState, id: string) {
  return {
    ingredients: state.ingredients.filter((ingredient) => ingredient.id !== id),
  };
}

function clearIngredientList(state: typeof initialState) {
  return {
    ingredients: [],
  };
}

function addToTagList(state: typeof initialState, payload: Tag) {
  return { tags: state.tags.concat([payload]) };
}

function removeFromTagList(state: typeof initialState, id: string) {
  return { tags: state.tags.filter((tag) => tag.id !== id) };
}

function clearTagList(state: typeof initialState) {
  return {
    tags: [],
  };
}

function clearFilters(state: typeof initialState) {
  return {
    ingredients: [],
    tags: [],
  };
}

export function searchReducer(
  state: typeof initialState,
  action: { type: keyof typeof actions; payload?: any },
) {
  return merge(state, actions[action.type](state, action.payload));
}

function merge(
  state: typeof initialState,
  newState: Partial<typeof initialState>,
) {
  return {
    ...state,
    ...newState,
  };
}
