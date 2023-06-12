import { useQuery } from 'react-query';
import { useAxios } from '../../utility/hooks/useAxios';
import {
  type GetRecipesRequestParams,
  type GetRecipesResponse,
  type Recipe,
} from '../types';

export const useRecipes = () => {
  const { axios } = useAxios();
  const URL = '/recipes';

  const useGetRecipes = ({
    name,
    page,
    pageSize,
    ingredients,
    tags,
  }: GetRecipesRequestParams) =>
    useQuery(['recipes', name, page, pageSize, ingredients, tags], async () => {
      return await axios.post<GetRecipesResponse>(
        URL,
        {
          ...(ingredients && { ingredients }),
          ...(tags && { tags }),
        },
        {
          params: {
            ...(name && { name }),
            ...(page && { page }),
            ...(pageSize && { pageSize }),
          },
        },
      );
    });

  const useGetSingleRecipe = (id: string) =>
    useQuery(`recipes/${id}`, async () => {
      return await axios.get<Recipe>(`${URL}/${id}`);
    });

  return { useGetRecipes, useGetSingleRecipe };
};
