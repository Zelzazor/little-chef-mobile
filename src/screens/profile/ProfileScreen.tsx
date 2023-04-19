import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  ActivityIndicator,
  Button,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { config } from '../../config/app.config';
import { useAuthContext } from '../../features/auth/context/useAuthContext';
import { type TabParamList } from '../../features/navigation/types';
import { useUserContext } from '../../features/user/context/useUserContext';

type ProfileScreenProps = BottomTabScreenProps<TabParamList, 'Profile'>;

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
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
      <Image style={styles.image} source={{ uri: user?.picture }} />
      <Text style={styles.text}>Hello, {user?.name}!</Text>
      <Button
        color={config.colors.primary}
        onPress={onLogout}
        title="Log Out"
      />
      <View style={{ marginTop: 10 }}>
        <Button
          color={config.colors.primary}
          onPress={() => {
            navigation.navigate('SearchIndex', { screen: 'Submissions' });
          }}
          title="My submissions"
        />
      </View>
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
