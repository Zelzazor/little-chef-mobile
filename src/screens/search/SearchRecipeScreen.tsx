import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FilterButton } from '../../features/search/components/FilterButton';
import { RecipeList } from '../../features/search/components/RecipeList';
import { useRecipeSearchFiltersContext } from '../../features/search/context/RecipeSearchFiltersContext';
import { useRecipes } from '../../features/search/hooks/useRecipes';
import { Dropdown } from '../../features/ui/components/Dropdown';
import { ScreenHeader } from '../../features/ui/components/ScreenHeader';
import { useDebounce } from '../../features/utility/hooks/useDebounce';
import { type SearchStackNavigationParams } from './SearchStackNavigation';

export const SearchRecipeScreen = () => {
  const navigation = useNavigation<SearchStackNavigationParams>();

  const recipeQueries = useRecipes();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { ingredients } = useRecipeSearchFiltersContext();

  const {
    data: response,
    isLoading,
    isError,
  } = recipeQueries.useGetRecipes({
    ingredients: ingredients.map((ingredient) => ingredient.id),
    pageSize: 6,
    page,
    ...(debouncedSearch && { name: debouncedSearch }),
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
      <ScreenHeader title="Recipe Search" onBack={navigation.goBack} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flex: 1, width: '100%' }}>
          <SearchBar
            platform="android"
            placeholder="Search"
            style={{
              borderColor: '#ccc',
              borderBottomWidth: 1,
            }}
            onChangeText={(e) => {
              setSearch(e);
              setPage(1);
            }}
          />
        </View>
        <Dropdown triggerElement={<FilterButton />}>
          <Text>Filter</Text>
        </Dropdown>
      </View>
      <RecipeList
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
