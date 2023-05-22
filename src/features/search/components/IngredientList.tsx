import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { Pagination } from '../../ui/components/Pagination';
import { UrlImage } from '../../ui/components/UrlImage';
import { type PaginationMetadata } from '../../utility/types/response';
import { useIngredientSearchContext } from '../context/IngredientSearchContext';
import { type Ingredient } from '../types';

export interface IngredientListProps {
  data: Ingredient[];
  pagination?: PaginationMetadata;
  onPress?: (ingredient: Ingredient) => void;
  prevPage?: () => void;
  nextPage?: () => void;
  removable?: boolean;
}

export const IngredientList = ({
  data,
  pagination,
  removable,
  onPress,
  prevPage,
  nextPage,
}: IngredientListProps) => {
  const { removeIngredient } = useIngredientSearchContext();

  return (
    <FlatList
      data={data}
      renderItem={({ item: ingredient }) => (
        <View>
          <Pressable
            style={styles.ingredientOption}
            onPress={() => {
              if (onPress) onPress(ingredient);
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
          {removable && (
            <Pressable
              onPress={() => {
                removeIngredient(ingredient.id);
              }}
            >
              <Icon name={'trash-outline'} size={30} />
            </Pressable>
          )}
        </View>
      )}
      keyExtractor={(ingredient: Ingredient) => ingredient.id}
      ListFooterComponent={() => (
        <>
          {pagination && prevPage && nextPage && (
            <Pagination
              pagination={pagination}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          )}
        </>
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
