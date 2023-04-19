import { type Ingredient, type Recipe } from '../types';

export const initialState = {
  count: 0,
  ingredients: [] as Ingredient[],
  recipes: [] as Recipe[],
};

const actions = {
  INCREMENT: increment,
  DECREMENT: decrement,
  ADD_TO_LIST: addToList,
  REMOVE_FROM_LIST: removeFromList,
};

function increment(state: typeof initialState) {
  return { count: state.count + 1 };
}

function decrement(state: typeof initialState) {
  return { count: state.count - 1 };
}

function addToList(state: typeof initialState, payload: Ingredient) {
  return { ingredients: state.ingredients.concat([payload]) };
}

function removeFromList(state: typeof initialState, id: string) {
  return {
    ingredients: state.ingredients.filter((ingredient) => ingredient.id !== id),
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
