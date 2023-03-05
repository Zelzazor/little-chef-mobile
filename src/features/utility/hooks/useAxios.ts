import Axios from 'axios';
import { useMemo } from 'react';
import { useAuthContext } from '../../auth';
import { AXIOS_CONFIG } from '../config/axios-config';

export const useAxios = () => {
  const { credentials } = useAuthContext();

  const axios = useMemo(() => {
    return Axios.create({
      ...AXIOS_CONFIG,
      headers: {
        ...AXIOS_CONFIG.headers,
        Authorization: `Bearer ${credentials?.accessToken ?? ''}`,
      },
    });
  }, [credentials]);

  return { axios };
};
