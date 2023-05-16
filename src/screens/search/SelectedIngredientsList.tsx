import { type StackScreenProps } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { type SearchStackParamList } from '../../features/search/types';

export interface IngredientListProps
  extends StackScreenProps<SearchStackParamList, 'RecipeDetails'> {}

export const SelectedIngredientsList = () => {
  return (
    <View>
      <Text> Selected Ingredients</Text>
    </View>
  );
};
