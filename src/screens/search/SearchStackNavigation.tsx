import { type NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthContext } from '../../features/auth/context/useAuthContext';
import { IngredientSearchProvider } from '../../features/search/context/RecipeSearchFiltersContext';
import { type SearchStackParamList } from '../../features/search/types';
import { useUserContext } from '../../features/user/context/useUserContext';
import { EditProfileScreen } from '../profile/EditProfileScreen';
import { PublishScreen } from '../publish/PublishScreen';
import { RecipeDetailsScreen } from './RecipeDetailsScreen';
import { SearchIngredientScreen } from './SearchIngredientScreen';
import { SearchRecipeScreen } from './SearchRecipeScreen';
import { SearchScreen } from './SearchScreen';
import { SelectedIngredientsList } from './SelectedIngredientsList';
import { SubmissionScreen } from './SubmissionScreen';

export type SearchStackNavigationParams = NavigationProp<SearchStackParamList>;

const Stack = createStackNavigator<SearchStackParamList>();
export const SearchStackNavigation = () => {
  const { loggedIn } = useAuthContext();
  const { user } = useUserContext();
  return (
    <IngredientSearchProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Search"
      >
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Recipe" component={SearchRecipeScreen} />
        <Stack.Screen name="Ingredient" component={SearchIngredientScreen} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
        <Stack.Screen
          name="IngredientList"
          component={SelectedIngredientsList}
        />
        {loggedIn && user.bannedAt === null && (
          <Stack.Screen name="Publish" component={PublishScreen} />
        )}
        {loggedIn && (
          <Stack.Screen name="Submissions" component={SubmissionScreen} />
        )}
        {loggedIn && (
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        )}
      </Stack.Navigator>
    </IngredientSearchProvider>
  );
};
