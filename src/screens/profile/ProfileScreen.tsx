import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image
} from 'react-native';
import { useAuthContext } from '../../features/auth';
import { useUserContext } from '../../features/user/context/useUserContext';


export const ProfileScreen = () => {
  const { isLoading, loggedIn, onLogin, onLogout } = useAuthContext();
  const { user } = useUserContext();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Text>You are not logged in</Text>
        <Button onPress={onLogin} title="Log In" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: user?.picture}}
      />
      <Text style={styles.text}>Hello, {user?.name}!</Text>
      <Button color={'#CA3433'} onPress={onLogout} title="Log Out" />
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
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0553',
  },
  text: {
    margin: 20,
    fontSize: 20,
  },
});