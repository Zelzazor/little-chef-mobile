import { type StackScreenProps } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { IngredientList } from '../../features/search/components/IngredientList';
import { useIngredientSearchContext } from '../../features/search/context/IngredientSearchContext';
import { type SearchStackParamList } from '../../features/search/types';

export interface IngredientListProps
  extends StackScreenProps<SearchStackParamList, 'RecipeDetails'> {}

export const SelectedIngredientsList = () => {
  const { ingredients } = useIngredientSearchContext();

  return (
    <View>
      <Text> Selected Ingredients</Text>
      <IngredientList data={ingredients} removable />
    </View>
  );
};
