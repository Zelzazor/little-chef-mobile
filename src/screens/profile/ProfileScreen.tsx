import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/base';
import { LinearProgress } from '@rneui/themed';
import {
  ActivityIndicator,
  Button,
  Image,
  Platform,
  SafeAreaView,
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

  const progress =
    user.experience.expInCurrentLevel /
    (user.experience.expInCurrentLevel + user.experience.expToNextLevel);

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

  const handleMySubmissions = () => {
    navigation.navigate('SearchIndex', { screen: 'Submissions' });
  };

  const handleEditProfile = () => {
    navigation.navigate('SearchIndex', { screen: 'EditProfile' });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconsContainer}>
          <Icon
            name="logout"
            size={35}
            color="black"
            onPress={onLogout}
            style={{ marginBottom: 20 }}
          />
          <Icon
            name="topic"
            size={35}
            color="black"
            onPress={handleMySubmissions}
            style={{ marginBottom: 20 }}
          />
          <Icon
            name="edit"
            size={35}
            color="black"
            onPress={handleEditProfile}
          />
        </View>
        <Text style={styles.heading}>My Profile</Text>
        <Image style={styles.image} source={{ uri: user?.picture }} />
        <Text style={styles.text}>Hello, {user?.name}!</Text>
        <Text style={styles.textLevel}>Nivel {user.experience.level}</Text>
        <LinearProgress
          variant="determinate"
          value={progress}
          style={{ width: '80%' }}
        />
        <View style={styles.buttonContainer}>{}</View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: config.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 50,
    marginTop: 150,
  },
  container: {
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
  textLevel: {
    fontSize: 15,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  iconsContainer: {
    flexDirection: 'column',
    position: 'absolute',
    top: 10,
    right: 20,
  },
});
