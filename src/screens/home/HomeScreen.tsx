import { API_URL } from '@env';
import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAuthContext } from '../../features/auth';
import { useUser } from '../../features/user';

export const HomeScreen = () => {
  const { isLoading, loggedIn, onLogin, onLogout, user } = useAuthContext();
  const {
    data: userData,
    isLoading: isUserDataLoading,
    error: userDataError,
  } = useUser().useGetUser();
  const {
    data: testData,
    isLoading: isTestLoading,
    error: testError,
  } = useUser().useTest();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log({ isUserDataLoading, userData, url: API_URL, userDataError });
  console.log({ isTestLoading, testData, testError });

  return (
    <View style={styles.container}>
      {loggedIn && <Text>You are logged in as {user?.name}</Text>}
      {!loggedIn && <Text>You are not logged in</Text>}

      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
