import { type BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Icon as RNEUIcon, Button as StyledButton } from '@rneui/base';
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
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
        <StyledButton
          size="lg"
          color={config.colors.primary}
          containerStyle={{
            borderRadius: 50,
            position: 'absolute',
            top: 20,
            right: 20,
          }}
        >
          <Icon name="help-circle-outline" color="white" size={28} />
        </StyledButton>
        <View>
          <Button onPress={onLogout} title="Log Out" />
        </View>
        <Text>You are not logged in...</Text>
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
          <RNEUIcon
            name="logout"
            size={35}
            color="black"
            onPress={onLogout}
            style={{ marginBottom: 20 }}
          />
        </View>
        <Text style={styles.heading}>My Profile</Text>
        <Image style={styles.image} source={{ uri: user?.picture }} />
        <Text style={styles.text}>Hello, {user?.name}!</Text>
        <Text style={styles.textLevel}>Nivel {user.experience.level}</Text>
        <LinearProgress
          variant="determinate"
          value={progress}
          style={styles.progressBar}
          trackColor="#8D99AE"
          color="#CA3433"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonSubmissions}
            onPress={handleMySubmissions}
          >
            <RNEUIcon
              name="file-copy"
              size={20}
              color="white"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>My Submissions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={handleEditProfile}
          >
            <RNEUIcon
              name="edit"
              size={20}
              color="white"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Edit my profile</Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 80,
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

  iconsContainer: {
    flexDirection: 'column',
    position: 'absolute',
    top: 10,
    right: 20,
  },
  progressBar: {
    width: '80%',
    height: 15,
    borderRadius: 10,
  },
  buttonSubmissions: {
    backgroundColor: '#3C1518',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    flexDirection: 'row',
  },
  buttonEdit: {
    backgroundColor: '#69140E',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    flexDirection: 'row',
  },

  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
});
