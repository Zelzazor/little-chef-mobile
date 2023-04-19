export type SearchStackParamList = {
  Search: undefined;
  Recipe: undefined;
  Ingredient: undefined;
  RecipeDetails: { recipeId: string };
  Publish: { recipeId: string };
  Submissions: { recipeId?: string };
};
