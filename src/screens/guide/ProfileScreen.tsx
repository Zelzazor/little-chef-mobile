import { Image, ScrollView, Text } from 'react-native';
import EditMyProfile from './assets/16.jpg';
import EditMyProfileSuccess from './assets/17.jpg';
import MySubmissions from './assets/18.jpg';
import Profile from './assets/4.jpg';
import styles from './guide-styles';

export const GuideProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Profile</Text>
      <Text style={styles.text}>
        You can view any details about your profile on the Profile screen.
      </Text>
      <Text style={styles.text}>
        Here, you can see your avatar, your name, your level and the amount of
        experience you have for the current level.
      </Text>
      <Image source={Profile} style={styles.image} resizeMode="stretch" />
      <Text style={styles.text}>
        You can access all the submissions you have made by pressing on the "My
        Submissions" button.
      </Text>
      <Image source={MySubmissions} style={styles.image} resizeMode="stretch" />
      <Text style={styles.text}>
        To edit your profile, press on the "Edit my Profile" button. You will
        been redirected to the Edit Profile screen.
      </Text>
      <Image source={EditMyProfile} style={styles.image} resizeMode="stretch" />
      <Text style={styles.text}>
        When you are done editing your profile, press on the "Save" button to
        save your changes.
      </Text>
      <Image
        source={EditMyProfileSuccess}
        style={styles.image}
        resizeMode="stretch"
      />
    </ScrollView>
  );
};
