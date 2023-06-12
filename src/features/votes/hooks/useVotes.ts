import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAxios } from '../../utility/hooks/useAxios';
export const useVotes = () => {
  const { axios } = useAxios();
  const queryClient = useQueryClient();
  const URL = '/vote';

  const useSubmitVote = () => {
    return useMutation({
      mutationFn: async ({
        submissionId,
        isUpvote,
      }: {
        submissionId: string;
        isUpvote: boolean;
      }) => {
        const data = {
          isUpvote,
        };
        return await axios.post(`${URL}/${submissionId}`, data);
      },
    });
  };

  const useGetRandomSubmission = () =>
    useQuery(
      ['vote', 'random'],
      async () => {
        const { data } = await axios.get<GetRandomSubmissionResponse>(
          `${URL}/pending-submission`,
        );
        return data;
      },
      {
        refetchOnWindowFocus: false,
      },
    );
  return { useSubmitVote, useGetRandomSubmission };
};
