import { Image, ScrollView, Text } from 'react-native';
import Votes from './assets/3.jpg';
import styles from './guide-styles';

export const GuideVotesScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Votes</Text>
      <Text style={styles.text}>
        The votes module allows you to vote for recipes that have been
        submitted, to confirm it's authenticity.
      </Text>
      <Text style={styles.text}>
        To vote positively, press on the "Check" icon. To vote negatively, press
        on the "X" icon.
      </Text>
      <Image source={Votes} style={styles.image} resizeMode="stretch" />
    </ScrollView>
  );
};
