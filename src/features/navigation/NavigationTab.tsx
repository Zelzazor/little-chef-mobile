import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { type NavigationProp } from '@react-navigation/native';
import { type FC } from 'react';
import { config } from '../../config/app.config';
import { GuideStackNavigation } from '../../screens/guide/GuideStackNavigation';
import { LoginScreen } from '../../screens/login/LoginScreen';
import { ProfileScreen } from '../../screens/profile/ProfileScreen';
import { ReviewScreen } from '../../screens/review/ReviewScreen';
import { SearchStackNavigation } from '../../screens/search/SearchStackNavigation';
import { useAuthContext } from '../auth/context/useAuthContext';
import { useUserContext } from '../user/context/useUserContext';
import { SelectIcon } from './components/SelectIcon';
import { type TabParamList } from './types';

export type TabNavigationParams = NavigationProp<TabParamList>;

const Tab = createBottomTabNavigator<TabParamList>();

export const NavigationTab: FC = () => {
  const { loggedIn } = useAuthContext();
  const { user } = useUserContext();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <SelectIcon
              routeName={route.name}
              focused={focused}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: config.colors.primary,
        tabBarInactiveTintColor: config.colors.inactive,
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="SearchIndex" component={SearchStackNavigation} />
      {loggedIn && user?.bannedAt === null && (
        <Tab.Screen name="Review" component={ReviewScreen} />
      )}
      {loggedIn && <Tab.Screen name="Profile" component={ProfileScreen} />}
      {!loggedIn && <Tab.Screen name="Login" component={LoginScreen} />}
      <Tab.Screen name="GuideStack" component={GuideStackNavigation} />
    </Tab.Navigator>
  );
};
