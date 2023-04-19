import { type NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthContext } from '../../features/auth/context/useAuthContext';
import { SearchProvider } from '../../features/search/context/SearchContext';
import { PublishScreen } from '../publish/PublishScreen';
import { RecipeDetailsScreen } from './RecipeDetailsScreen';
import { SearchIngredientScreen } from './SearchIngredientScreen';
import { SearchRecipeScreen } from './SearchRecipeScreen';
import { SearchScreen } from './SearchScreen';
import { SubmissionScreen } from './SubmissionScreen';
import { type SearchStackParamList } from './types';

export type SearchStackNavigationParams = NavigationProp<SearchStackParamList>;

const Stack = createStackNavigator<SearchStackParamList>();
export const SearchStackNavigation = () => {
  const { loggedIn } = useAuthContext();
  return (
    <SearchProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Search"
      >
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Recipe" component={SearchRecipeScreen} />
        <Stack.Screen name="Ingredient" component={SearchIngredientScreen} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
        {loggedIn && <Stack.Screen name="Publish" component={PublishScreen} />}
        {loggedIn && (
          <Stack.Screen name="Submissions" component={SubmissionScreen} />
        )}
      </Stack.Navigator>
    </SearchProvider>
  );
};
