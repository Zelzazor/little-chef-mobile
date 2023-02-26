import { useQuery } from 'react-query';
import { useAxios } from '../../utility';
import { GetUserResponse } from '../types';

export const useUser = () => {
  const { axios } = useAxios();
  const URL = '/user';

  const useGetUser = () =>
    useQuery(
      'user',
      async () => {
        return axios.get<GetUserResponse>(URL);
      },
      { enabled: false },
    );

  const useTest = () =>
    useQuery('test', async () => {
      return axios.get<GetUserResponse>(`${URL}/auth`);
    });

  return { useGetUser, useTest };
};
