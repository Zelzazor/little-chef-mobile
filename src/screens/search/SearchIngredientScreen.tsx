import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '@rneui/base';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { config } from '../../config/app.config';
import { IngredientList } from '../../features/search/components/IngredientList';
import { IngredientSearchButton } from '../../features/search/components/IngredientSearchButton';
import { SelectedIngredientsButton } from '../../features/search/components/SelectedIngredientsButton';
import { useRecipeSearchFiltersContext } from '../../features/search/context/RecipeSearchFiltersContext';
import { useIngredients } from '../../features/search/hooks/useIngredients';
import { type Ingredient } from '../../features/search/types';
import { ScreenHeader } from '../../features/ui/components/ScreenHeader';
import { useDebounce } from '../../features/utility/hooks/useDebounce';
import { type SearchStackNavigationParams } from './SearchStackNavigation';

export const SearchIngredientScreen = () => {
  const navigation = useNavigation<SearchStackNavigationParams>();

  const { useGetIngredients } = useIngredients();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, isError } = useGetIngredients({
    pageSize: 30,
    page,
    ...(debouncedSearch && { name: debouncedSearch }),
  });
  const { ingredients, addIngredient } = useRecipeSearchFiltersContext();

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
    <View
      style={
        ingredients.length > 0 && data?.pagination.totalPages !== 1
          ? styles.containerWithFloatingButtons
          : styles.container
      }
    >
      <ScreenHeader
        title="Select your ingredients"
        onBack={navigation.goBack}
      />
      <SearchBar
        platform="android"
        placeholder="Search"
        style={styles.searchBar}
        containerStyle={styles.searchBarContainer}
        onChangeText={(e) => {
          setSearch(e);
          setPage(1);
        }}
      />
      <IngredientList
        data={filteredIngredients ?? []}
        pagination={data?.pagination}
        onPress={(ingredient: Ingredient) => {
          addIngredient(ingredient);
        }}
        isLoading={isLoading}
        isError={isError}
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

  containerWithFloatingButtons: {
    flex: 1,
    backgroundColor: config.colors.background,
    paddingBottom: 40,
  },

  searchBar: {
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },

  searchBarContainer: {
    backgroundColor: config.colors.background,
  },
});
