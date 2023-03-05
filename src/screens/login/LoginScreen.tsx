import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import { config } from '../../config/app.config';
import { useAuthContext } from '../../features/auth';

export const LoginScreen = () => {
  const { isLoading, loggedIn, onLogin, onLogout, auth0User } =
    useAuthContext();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loggedIn && <Text>You are logged in as {auth0User?.name}</Text>}
      {!loggedIn && <Text style={styles.text}>You are not logged in</Text>}
      <Button
        color={config.colors.primary}
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
    backgroundColor: config.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  text: {
    margin: 20,
    fontSize: 20,
  },
});
