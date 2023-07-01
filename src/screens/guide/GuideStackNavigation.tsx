import { type NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { type GuideStackParamList } from '../../features/guide/types';
import { GettingStartedScreen } from './GettingStartedScreen';
import { GuideScreen } from './GuideScreen';
import { GuideSearchScreen } from './SearchScreen';

export type GuideStackNavigationParams = NavigationProp<GuideStackParamList>;

const Stack = createStackNavigator<GuideStackParamList>();
export const GuideStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Guide"
    >
      <Stack.Screen name="Guide" component={GuideScreen} />
      <Stack.Screen name="GettingStarted" component={GettingStartedScreen} />
      <Stack.Screen name="Search" component={GuideSearchScreen} />
    </Stack.Navigator>
  );
};
