import { useQuery } from 'react-query';
import { useAxios } from '../../utility/hooks/useAxios';
import { type GetTagsRequest, type GetTagsResponse } from '../types';

export const useTags = () => {
  const { axios } = useAxios();
  const URL = '/tags';

  const useGetTags = ({ id, name, page, pageSize }: GetTagsRequest) =>
    useQuery(['tags', id, name, page, pageSize], async () => {
      const { data } = await axios.post<GetTagsResponse>(
        URL,
        {
          ...(id && { id }),
          ...(name && { name }),
        },
        {
          params: {
            ...(page && { page }),
            ...(pageSize && { pageSize }),
          },
        },
      );

      return { tags: data.data, pagination: data.pagination };
    });

  return { useGetTags };
};
