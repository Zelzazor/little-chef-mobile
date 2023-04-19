import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
} from 'react-native';
import {
  type GetRecipesResponse,
  type Recipe,
} from '../../../features/search/types';
import { type SearchStackNavigationParams } from '../SearchStackNavigation';
import { Pagination } from './Pagination';

interface RecipeListProps {
  data: GetRecipesResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  prevPage: () => void;
  nextPage: () => void;
}

export const RecipeList = ({
  data,
  isLoading,
  isError,
  prevPage,
  nextPage,
}: RecipeListProps) => {
  const navigation = useNavigation<SearchStackNavigationParams>();

  if (isError) {
    return <Text>Error</Text>;
  }

  if (isLoading || !data) {
    return <ActivityIndicator size={48} />;
  }

  return (
    <FlatList
      data={data?.data}
      renderItem={(recipe: { item: Recipe }) => (
        <Pressable
          style={{
            padding: 30,
            borderColor: '#CCCCCC',
            borderBottomWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            navigation.navigate('RecipeDetails', {
              recipeId: recipe.item.id,
            });
          }}
        >
          <Image
            source={{ uri: recipe.item.imageUrl }}
            style={{ width: '50%', aspectRatio: 1, borderRadius: 10 }}
          />
          <Text>{recipe.item.name}</Text>
        </Pressable>
      )}
      keyExtractor={(recipe: Recipe) => recipe.id}
      ListFooterComponent={() => (
        <Pagination data={data} prevPage={prevPage} nextPage={nextPage} />
      )}
    />
  );
};
