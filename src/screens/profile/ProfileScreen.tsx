import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'expo-image';
import { useAuth } from '../../hooks/useAuth';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const ProfileScreen = () => {
  const { isLoading, loggedIn, onLogin, onLogout, user, credentials } =
    useAuth();

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

  console.log(credentials);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={user?.picture}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
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
