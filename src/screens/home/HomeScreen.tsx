import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export const HomeScreen = () => {
  const { isLoading, loggedIn, onLogin, onLogout, user } = useAuth();

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
