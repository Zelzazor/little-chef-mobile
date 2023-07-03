import { Image, ScrollView, Text } from 'react-native';
import RecipeDetails from './assets/12.jpg';
import Camera from './assets/13.jpg';
import ImageScreen from './assets/14.jpg';
import Success from './assets/15.jpg';
import styles from './guide-styles';

export const GuideSubmissionScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Submission</Text>
      <Text style={styles.text}>
        You can view any details about a recipe by pressing on the recipe list
        item.
      </Text>
      <Text style={styles.text}>
        On the screen you will see the recipe's name, the ingredients, the
        instructions and the tags.
      </Text>
      <Image source={RecipeDetails} style={styles.image} resizeMode="stretch" />
      <Text style={styles.text}>
        As you can see, there is a "Submit" button on the bottom of the screen.
        If you press on it, you will be redirected to the Camera screen to
        submit your recipe.
      </Text>
      <Text style={styles.text}>
        When you press on the button, you will be asked to allow the app to use
        your camera. If you press on "Allow", you will be redirected to the
        camera screen.
      </Text>
      <Image source={Camera} style={styles.image} resizeMode="stretch" />
      <Text style={styles.text}>
        You can take a picture of your recipe and then press on the "Upload"
        button to submit it. You can also retake the photo by pressing on the
        "Retake" button.
      </Text>
      <Image source={ImageScreen} style={styles.image} resizeMode="stretch" />
      <Text style={styles.text}>
        Once you press on the "Upload" button, you will be redirected to the
        recipe details screen and you will see a message saying that your recipe
        has been submitted.
      </Text>
      <Image source={Success} style={styles.image} resizeMode="stretch" />
    </ScrollView>
  );
};
