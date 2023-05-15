import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '@rneui/base';
import { useState } from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { config } from '../../config/app.config';
import { useIngredients } from '../../features/search/hooks/useIngredients';
import { type Ingredient } from '../../features/search/types';
import { Pagination } from '../../features/ui/components/Pagination';
import { UrlImage } from '../../features/ui/components/UrlImage';
import { useDebounce } from '../../features/utility/hooks/useDebounce';
import { type SearchStackNavigationParams } from './SearchStackNavigation';

export const SearchIngredientScreen = () => {
  const navigation = useNavigation<SearchStackNavigationParams>();
  const { useGetIngredients } = useIngredients();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, isError } = useGetIngredients({
    pageSize: 6,
    page,
    ...(debouncedSearch && { name: debouncedSearch }),
  });

  const nextPage = () => {
    if (data && data.pagination.page < data.pagination.totalPages)
      setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.pageTitle}>Select your ingredients</Text>
        <Button
          title=""
          onPress={() => {
            navigation.navigate('IngredientList');
          }}
        />
      </View>
      <SearchBar
        platform="android"
        placeholder="Search"
        style={styles.searchBar}
        onChangeText={(e) => {
          setSearch(e);
        }}
      />
      <FlatList
        data={data?.ingredients}
        renderItem={({ item: ingredient }) => (
          <Pressable
            style={styles.ingredientOption}
            onPress={() => {
              console.log({ ingredient });
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
            pagination={data?.pagination}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.background,
  },

  pageTitle: {
    padding: 10,
    fontSize: 32,
  },

  searchBar: { borderColor: '#ccc', borderBottomWidth: 1 },

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
