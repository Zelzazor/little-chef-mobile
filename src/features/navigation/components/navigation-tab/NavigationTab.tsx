import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { type FC } from 'react';
import { config } from '../../../../config/app.config';
import { LoginScreen, ProfileScreen, SearchScreen } from '../../../../screens';
import { PublishScreen } from '../../../../screens/publish/PublishScreen';
import { useAuthContext } from '../../../auth';
import { SelectIcon } from './components/SelectIcon';
import { type TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export const NavigationTab: FC = () => {
  const { loggedIn } = useAuthContext();

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
      <Tab.Screen name="Search" component={SearchScreen} />
      {loggedIn && <Tab.Screen name="Publish" component={PublishScreen} />}
      {loggedIn && <Tab.Screen name="Profile" component={ProfileScreen} />}
      {!loggedIn && <Tab.Screen name="Login" component={LoginScreen} />}
    </Tab.Navigator>
  );
};
