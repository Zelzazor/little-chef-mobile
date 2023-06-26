import { useNavigation } from '@react-navigation/native';
import { type StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { config } from '../../config/app.config';
import { IngredientList } from '../../features/search/components/IngredientList';
import { IngredientSearchButton } from '../../features/search/components/IngredientSearchButton';
import { useRecipeSearchFiltersContext } from '../../features/search/context/RecipeSearchFiltersContext';
import { type SearchStackParamList } from '../../features/search/types';
import { ScreenHeader } from '../../features/ui/components/ScreenHeader';
import { type SearchStackNavigationParams } from './SearchStackNavigation';

export interface IngredientListProps
  extends StackScreenProps<SearchStackParamList, 'RecipeDetails'> {}

export const SelectedIngredientsList = () => {
  const navigation = useNavigation<SearchStackNavigationParams>();

  const { ingredients } = useRecipeSearchFiltersContext();
  return (
    <>
      <View
        style={
          ingredients?.length > 0
            ? styles.containerWithFloatingButtons
            : styles.container
        }
      >
        <ScreenHeader title="Selected ingredients" onBack={navigation.goBack} />
        <IngredientList data={ingredients} removable />
      </View>
      <IngredientSearchButton />
    </>
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
});
