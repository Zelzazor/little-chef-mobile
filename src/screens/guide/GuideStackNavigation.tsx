import { type NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { type GuideStackParamList } from '../../features/guide/types';
import { GettingStartedScreen } from './GettingStartedScreen';
import { GuideScreen } from './GuideScreen';
import { GuideProfileScreen } from './ProfileScreen';
import { GuideSearchScreen } from './SearchScreen';
import { GuideSubmissionScreen } from './SubmissionScreen';
import { GuideVotesScreen } from './VotesScreen';

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
      <Stack.Screen name="Submission" component={GuideSubmissionScreen} />
      <Stack.Screen name="Profile" component={GuideProfileScreen} />
      <Stack.Screen name="Vote" component={GuideVotesScreen} />
    </Stack.Navigator>
  );
};
