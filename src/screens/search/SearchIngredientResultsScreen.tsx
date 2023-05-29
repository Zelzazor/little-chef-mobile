import { useState } from 'react';
import { View } from 'react-native';
import { RecipeList } from '../../features/search/components/RecipeList';
import { useIngredientSearchContext } from '../../features/search/context/IngredientSearchContext';
import { useRecipes } from '../../features/search/hooks/useRecipes';

export const SearchIngredientResultsScreen = () => {
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
