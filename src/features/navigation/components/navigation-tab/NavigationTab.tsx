import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../../../../hooks/useAuth';
import { LoginScreen, ProfileScreen, SearchScreen } from '../../../../screens';

type TabParamList = {
  Profile: undefined;
  Search: undefined;
  Login: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const NavigationTab = () => {
  const { loggedIn } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof IonIcons.glyphMap;
          if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          }
          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          if (route.name === 'Login') {
            iconName = focused ? 'log-in' : 'log-in-outline';
          }
          return <IonIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#CA3433',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      {loggedIn && <Tab.Screen name="Profile" component={ProfileScreen} />}
      {!loggedIn && <Tab.Screen name="Login" component={LoginScreen} />}
    </Tab.Navigator>
  );
};
