import { useMutation, useQuery } from 'react-query';
import { useAxios } from '../../utility/hooks/useAxios';
import {
  type GetSubmissionsRequestParams,
  type GetSubmissionsResponse,
} from '../types';
export const useSubmissions = () => {
  const { axios } = useAxios();
  const URL = '/submission';

  const getBlob = async (fileUri: string) => {
    return await fetch(fileUri).then(
      async (response) => {
        return await response.blob();
      },
      (error) => {
        console.log('getBlob error', error);
      },
    );
  };

  const usePublishSubmission = () => {
    return useMutation({
      mutationFn: async ({
        recipeId,
        imageUri,
      }: {
        recipeId: string;
        imageUri: string;
      }) => {
        const formData = new FormData();
        const blob = (await getBlob(imageUri)) as Blob;
        const imageType = blob?.type;
        formData.append('file', {
          uri: imageUri,
          type: imageType,
          name: `image.${imageType.split('/')[1]}`,
        });
        const data = {
          recipeId,
        };
        formData.append('data', JSON.stringify(data));
        return await axios.post(URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
        });
      },
    });
  };

  const useGetSubmissions = ({
    id,
    status,
    recipeId,
    page,
    pageSize,
  }: GetSubmissionsRequestParams) =>
    useQuery(
      ['submissions', id, status, recipeId, page, pageSize],
      async () => {
        return await axios.post<GetSubmissionsResponse>(
          `${URL}/user`,
          {
            ...(id && { id }),
            ...(status && { status }),
            ...(recipeId && { recipeId }),
          },
          {
            params: {
              ...(page && { page }),
              ...(pageSize && { pageSize }),
            },
          },
        );
      },
    );
  return { usePublishSubmission, useGetSubmissions };
};
