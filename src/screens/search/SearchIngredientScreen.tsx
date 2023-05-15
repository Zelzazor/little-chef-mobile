import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '@rneui/base';
import { useMemo, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { config } from '../../config/app.config';
import { IngredientList } from '../../features/search/components/IngredientList';
import { useIngredientSearchContext } from '../../features/search/context/IngredientSearchContext';
import { useIngredients } from '../../features/search/hooks/useIngredients';
import { type Ingredient } from '../../features/search/types';
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
  const { ingredients, addIngredient } = useIngredientSearchContext();

  const filteredIngredients = useMemo(() => {
    return data?.ingredients?.filter((ingredient) => {
      return !ingredients.includes(ingredient);
    });
  }, [data, ingredients]);

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
      <IngredientList
        data={filteredIngredients ?? []}
        pagination={data?.pagination}
        onPress={(ingredient: Ingredient) => {
          addIngredient(ingredient);
        }}
        prevPage={prevPage}
        nextPage={nextPage}
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
});
