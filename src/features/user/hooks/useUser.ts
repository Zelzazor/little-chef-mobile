import { useMutation, useQuery } from 'react-query';
import { useAxios } from '../../utility/hooks/useAxios';
import { type GetUserResponse } from '../types/get-user';

export const useUser = () => {
  const { axios } = useAxios();
  const URL = '/user';

  const useGetUser = () =>
    useQuery(
      'user',
      async () => {
        return await axios.get<GetUserResponse>(URL);
      },
      { enabled: false },
    );

  const useUpdateUser = () => {
    return useMutation({
      mutationFn: async ({
        name,
        nickName,
      }: {
        name: string;
        nickName: string;
      }) => {
        const data = {
          name,
          nickName,
        };
        return await axios.post(URL, data);
      },
    });
  };

  const useTest = () =>
    useQuery('test', async () => {
      return await axios.get<GetUserResponse>(`${URL}/auth`);
    });

  return { useGetUser, useTest, useUpdateUser };
};
