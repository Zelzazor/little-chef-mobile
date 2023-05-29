import { type StackScreenProps } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { IngredientList } from '../../features/search/components/IngredientList';
import { IngredientSearchButton } from '../../features/search/components/IngredientSearchButton';
import { useIngredientSearchContext } from '../../features/search/context/IngredientSearchContext';
import { type SearchStackParamList } from '../../features/search/types';

export interface IngredientListProps
  extends StackScreenProps<SearchStackParamList, 'RecipeDetails'> {}

export const SelectedIngredientsList = () => {
  const { ingredients } = useIngredientSearchContext();
  return (
    <>
      <View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#CCC' }}>
          <Text
            style={{
              padding: 10,
              fontSize: 32,
            }}
          >
            Selected Ingredients
          </Text>
        </View>
        <IngredientList data={ingredients} removable />
      </View>
      <IngredientSearchButton />
    </>
  );
};
