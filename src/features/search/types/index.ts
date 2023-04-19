import { type GetResponse } from '../../utility/types';

export type GetRecipesRequestParams = {
  name?: string;
  page?: number;
  pageSize?: number;
  ingredients?: string[];
  tags?: string[];
};

export type GetRecipesResponse = GetResponse<Recipe>;

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
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Tag = {
  id: string;
  name: string;
  tagTypeId: string;
  createdAt: Date;
  updatedAt: Date;
};
