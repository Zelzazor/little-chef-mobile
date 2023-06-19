import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/base';
import { type FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { type SearchStackNavigationParams } from '../../../screens/search/SearchStackNavigation';
import { useIngredientSearchContext } from '../context/IngredientSearchContext';

export const IngredientSearchButton: FC = () => {
  const navigation = useNavigation<SearchStackNavigationParams>();

  const { ingredients } = useIngredientSearchContext();

  if (ingredients.length === 0) return <></>;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Recipe');
      }}
      style={{
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 60,
        width: 120,
        backgroundColor: '#CA3433',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45,
      }}
    >
      <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Let's cook</Text>
    </TouchableOpacity>
  );
};
