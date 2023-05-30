import { SearchBar } from '@rneui/base';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { config } from '../../config/app.config';
import { IngredientList } from '../../features/search/components/IngredientList';
import { IngredientSearchButton } from '../../features/search/components/IngredientSearchButton';
import { SelectedIngredientsButton } from '../../features/search/components/SelectedIngredientsButton';
import { useIngredientSearchContext } from '../../features/search/context/IngredientSearchContext';
import { useIngredients } from '../../features/search/hooks/useIngredients';
import { type Ingredient } from '../../features/search/types';
import { useDebounce } from '../../features/utility/hooks/useDebounce';

export const SearchIngredientScreen = () => {
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
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text style={styles.pageTitle}>Select your ingredients</Text>
      </View>
      <SearchBar
        platform="android"
        placeholder="Search"
        style={styles.searchBar}
        containerStyle={styles.searchBarContainer}
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
      <SelectedIngredientsButton />
      <IngredientSearchButton />
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

  searchBar: {
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },

  searchBarContainer: {
    backgroundColor: config.colors.background,
  },
});
