import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Pagination } from '../../ui/components/Pagination';
import { UrlImage } from '../../ui/components/UrlImage';
import { type PaginationMetadata } from '../../utility/types/response';
import { type Ingredient } from '../types';

export interface IngredientListProps {
  data: Ingredient[];
  pagination?: PaginationMetadata;
  onPress: (ingredient: Ingredient) => void;
  prevPage: () => void;
  nextPage: () => void;
}

export const IngredientList = ({
  data,
  pagination,
  onPress,
  prevPage,
  nextPage,
}: IngredientListProps) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item: ingredient }) => (
        <Pressable
          style={styles.ingredientOption}
          onPress={() => {
            onPress(ingredient);
          }}
        >
          <View style={styles.ingredientImageContainer}>
            <UrlImage
              source={{ uri: ingredient.imageUrl }}
              style={styles.ingredientImage}
            />
          </View>
          <Text style={{ fontSize: 25 }}>{ingredient.name}</Text>
        </Pressable>
      )}
      keyExtractor={(ingredient: Ingredient) => ingredient.id}
      ListFooterComponent={() => (
        <Pagination
          pagination={pagination}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  ingredientOption: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: '#CCCCCC',
    height: 100,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  ingredientImageContainer: { height: '100%', width: 'auto' },

  ingredientImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    aspectRatio: 1,
    borderRadius: 10,
  },
});
