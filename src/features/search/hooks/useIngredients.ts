import { useQuery } from 'react-query';
import { useAxios } from '../../utility/hooks/useAxios';
import {
  type GetIngredientsRequest,
  type GetIngredientsResponse,
} from '../types';

export const useIngredients = () => {
  const { axios } = useAxios();
  const URL = '/ingredient';

  const useGetIngredients = ({ name, page, pageSize }: GetIngredientsRequest) =>
    useQuery(['ingredient', name, page, pageSize], async () => {
      const { data } = await axios.post<GetIngredientsResponse>(
        URL,
        {
          ...(name && { name }),
        },
        {
          params: {
            ...(page && { page }),
            ...(pageSize && { pageSize }),
          },
        },
      );

      return { ingredients: data.data, pagination: data.pagination };
    });

  return { useGetIngredients };
};
