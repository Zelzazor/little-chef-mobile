import { Image, ScrollView, Text } from 'react-native';
import MainPage from './assets/1.jpg';
import SignInPage from './assets/5.jpg';
import Auth0Signin from './assets/6.jpg';
import styles from './guide-styles';

export const GettingStartedScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Getting Started</Text>
      <Text style={styles.text}>
        This is Little Chef. It is a recipe app that allows you to search for
        recipes by ingredients and also allows you to submit the recipes you
        have submitted.
      </Text>
      <Image source={MainPage} style={styles.image} resizeMode="stretch" />
      <Text style={styles.text}>
        This is the main page. You can see a total of four tabs at the bottom if
        you signed in. If you are not signed in, you will only see three tabs.
      </Text>
      <Text style={styles.text}>
        The first tab is the search tab. You can search for recipes by
        ingredients. You can also search for recipes by name if you want to.
      </Text>
      <Text style={styles.text}>
        The second tab is the submission vote tab. You can vote for the
        submissions of other users here.
      </Text>
      <Text style={styles.text}>
        The third tab is the user profile tab. You can see your profile here,
        and your current level and experience.
      </Text>
      <Text style={styles.text}>
        The fourth tab is the guide tab. If you are reading this, you are
        already in the guide tab.
      </Text>
      <Text style={styles.text}>
        If you are not signed in, you will see a tab called sign in. You can
        sign in there.
      </Text>
      <Image source={SignInPage} style={styles.image} resizeMode="stretch" />
      <Text style={styles.text}>
        Press on "Sign In" and you will be redirected to a sign in form. You can
        sign in and also register your account from here.
      </Text>
      <Image source={Auth0Signin} style={styles.image} resizeMode="stretch" />
      <Text style={styles.lastParagraph}>
        To log out, you can press on the profile tab and press on the log out
        icon on the top right corner.
      </Text>
    </ScrollView>
  );
};
