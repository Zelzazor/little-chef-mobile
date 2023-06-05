import { useNavigation } from '@react-navigation/native';
import { type StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';
import { IngredientList } from '../../features/search/components/IngredientList';
import { IngredientSearchButton } from '../../features/search/components/IngredientSearchButton';
import { useIngredientSearchContext } from '../../features/search/context/IngredientSearchContext';
import { type SearchStackParamList } from '../../features/search/types';
import { ScreenHeader } from '../../features/ui/components/ScreenHeader';
import { type SearchStackNavigationParams } from './SearchStackNavigation';

export interface IngredientListProps
  extends StackScreenProps<SearchStackParamList, 'RecipeDetails'> {}

export const SelectedIngredientsList = () => {
  const navigation = useNavigation<SearchStackNavigationParams>();

  const { ingredients } = useIngredientSearchContext();
  return (
    <>
      <View>
        <ScreenHeader title="Selected ingredients" onBack={navigation.goBack} />
        <IngredientList data={ingredients} removable />
      </View>
      <IngredientSearchButton />
    </>
  );
};
