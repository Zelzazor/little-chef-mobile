import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAuthContext } from '../../features/auth';

export const LoginScreen = () => {
  const { isLoading, loggedIn, onLogin, onLogout, user } = useAuthContext();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loggedIn && <Text>You are logged in as {user?.name}</Text>}
      {!loggedIn && <Text style={styles.text}>You are not logged in</Text>}
      <Button
        color="#CA3433"
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
  text: {
    margin: 20,
    fontSize: 20,
  },
});
