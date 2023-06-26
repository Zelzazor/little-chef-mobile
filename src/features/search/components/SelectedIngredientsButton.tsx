import { useNavigation } from '@react-navigation/native';
import { type FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { config } from '../../../config/app.config';
import { type SearchStackNavigationParams } from '../../../screens/search/SearchStackNavigation';
import { useRecipeSearchFiltersContext } from '../context/RecipeSearchFiltersContext';

export const SelectedIngredientsButton: FC = () => {
  const navigation = useNavigation<SearchStackNavigationParams>();

  const { ingredients } = useRecipeSearchFiltersContext();

  if (ingredients.length === 0) return <></>;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('IngredientList');
      }}
      style={{
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: config.colors.primary,
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
      }}
    >
      <Icon name="basket" size={40} color="white" />
    </TouchableOpacity>
  );
};
