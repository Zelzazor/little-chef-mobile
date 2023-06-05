import { type StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { type SearchStackParamList } from '../../features/search/types';
import { SubmissionList } from '../../features/submission/components/SubmissionList';
import { useSubmissions } from '../../features/submission/hooks/useSubmission';

type SubmissionsScreenProps = StackScreenProps<
  SearchStackParamList,
  'Submissions'
>;

export const SubmissionScreen = ({ route }: SubmissionsScreenProps) => {
  const submissionQueries = useSubmissions();
  const [page, setPage] = useState(1);

  const {
    data: response,
    isLoading,
    isError,
  } = submissionQueries.useGetSubmissions({
    pageSize: 6,
    page,
    ...(route.params?.recipeId && { recipeId: route.params.recipeId }),
  });

  const nextPage = () => {
    if (
      response &&
      response.data.pagination.page < response.data.pagination.totalPages
    )
      setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <View style={styles.container}>
      <SubmissionList
        data={response?.data}
        isLoading={isLoading}
        isError={isError}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
