import { type NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchProvider } from '../../features/search/context/SearchContext';
import { SearchIngredientScreen } from './SearchIngredientScreen';
import { SearchRecipeScreen } from './SearchRecipeScreen';
import { SearchScreen } from './SearchScreen';
import { type SearchStackParamList } from './types';

export type SearchStackNavigationParams = NavigationProp<SearchStackParamList>;

const Stack = createStackNavigator<SearchStackParamList>();
export const SearchStackNavigation = () => {
  return (
    <SearchProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Search"
      >
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Recipe" component={SearchRecipeScreen} />
        <Stack.Screen name="Ingredient" component={SearchIngredientScreen} />
      </Stack.Navigator>
    </SearchProvider>
  );
};
