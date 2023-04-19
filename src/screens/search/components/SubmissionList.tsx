import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import {
  type GetSubmissionsResponse,
  type Submission,
} from '../../../features/submission/types';
import { Pagination } from './Pagination';

interface RecipeListProps {
  data: GetSubmissionsResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  prevPage: () => void;
  nextPage: () => void;
}

export const SubmissionList = ({
  data,
  isLoading,
  isError,
  prevPage,
  nextPage,
}: RecipeListProps) => {
  if (isError) {
    return <Text>Error</Text>;
  }

  if (isLoading || !data) {
    return <ActivityIndicator size={48} />;
  }

  return (
    <FlatList
      data={data?.data}
      renderItem={(submission: { item: Submission }) => (
        <View
          style={{
            padding: 30,
            borderColor: '#CCCCCC',
            borderBottomWidth: 1,
          }}
        >
          <Text style={{ fontSize: 22, marginBottom: 10 }}>
            {submission.item.recipe.name}
          </Text>
          <Image
            source={{ uri: submission.item.imageUrl }}
            style={{ width: '100%', aspectRatio: 0.5, borderRadius: 10 }}
          />
          <Text style={{ fontSize: 18, marginTop: 10 }}>
            Created at: {new Date(submission.item.createdAt).toLocaleString()}
          </Text>
        </View>
      )}
      keyExtractor={(submission: Submission) => submission.id}
      ListFooterComponent={() => (
        <Pagination data={data} prevPage={prevPage} nextPage={nextPage} />
      )}
    />
  );
};
