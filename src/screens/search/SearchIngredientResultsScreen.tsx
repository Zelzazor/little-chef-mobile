import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native';
import { RecipeList } from '../../features/search/components/RecipeList';
import { useIngredientSearchContext } from '../../features/search/context/IngredientSearchContext';
import { useRecipes } from '../../features/search/hooks/useRecipes';
import { ScreenHeader } from '../../features/ui/components/ScreenHeader';
import { type SearchStackNavigationParams } from './SearchStackNavigation';

export const SearchIngredientResultsScreen = () => {
  const navigation = useNavigation<SearchStackNavigationParams>();

  const { ingredients } = useIngredientSearchContext();

  const {
    data: response,
    isLoading,
    isError,
  } = useRecipes().useGetRecipes({
    ingredients: ingredients.map((ingredient) => ingredient.id),
  });

  const [page, setPage] = useState(1);

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
    <View>
      <ScreenHeader title="Search results" onBack={navigation.goBack} />
      <RecipeList
        data={response?.data}
        isLoading={isLoading}
        isError={isError}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </View>
  );
};
