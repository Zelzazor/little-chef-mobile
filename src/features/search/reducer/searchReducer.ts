export const initialState = {
  count: 0,
  ingredients: [] as any[],
  recipes: [] as any[],
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

function addToList(state: typeof initialState, payload: any) {
  return { ingredients: state.ingredients.concat([payload]) };
}

function removeFromList(state: typeof initialState, id: number) {
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
