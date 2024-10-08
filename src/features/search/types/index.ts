import { type PaginatedRequest } from '../../utility/types/request';
import { type GetPaginatedResponse } from '../../utility/types/response';

export type GetRecipesRequestParams = {
  name?: string;
  page?: number;
  pageSize?: number;
  ingredients?: string[];
  tags?: string[];
};

export type GetRecipesResponse = GetPaginatedResponse<Recipe>;

export type Recipe = {
  id: string;
  name: string;
  imageUrl: string;
  recipeSteps: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  ingredients?: RecipeIngredient[];
  tags?: RecipeTag[];
};

export type RecipeIngredient = {
  measure_unit: string;
  quantity: number;
  ingredient: Ingredient;
};

export type RecipeTag = {
  tag: Tag;
};

export type Ingredient = {
  imageUrl: string | undefined;
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
export type SearchStackParamList = {
  Search: undefined;
  Recipe: undefined;
  Ingredient: undefined;
  RecipeDetails: { recipeId: string };
  Publish: { recipeId: string };
  Submissions: { recipeId?: string };
  IngredientList: undefined;
  SearchIngredientResults: undefined;
  EditProfile: undefined;
};

export type GetIngredientsRequest = PaginatedRequest & {
  id?: string;
  name?: string;
};

export type GetIngredientsResponse = GetPaginatedResponse<Ingredient>;

export type TagType = {
  id: string;
  name: string;
};

export type Tag = {
  id: string;
  name: string;
  tagTypeId: string;
  tagType: TagType;
  createdAt: Date;
  updatedAt: Date;
};

export type GetTagsRequest = PaginatedRequest & {
  id?: string;
  name?: string;
};

export type GetTagsResponse = GetPaginatedResponse<Tag>;

export enum TagTypes {
  Difficulty = 'Difficulty',
  Others = 'Others',
}
