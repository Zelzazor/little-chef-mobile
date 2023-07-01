import { StyleSheet, Text, View } from 'react-native';

export const GuideSearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Search</Text>
      <Text style={styles.text}>
        The search module allows you to search for recipes by ingredients or by
        recipes.
      </Text>
      <Text style={styles.text}>
        To search by ingredients, click on the "Search by Ingredients" button
        and select the ingredients you want to search for. You can select as
        many ingredients as you want. Once you have selected the ingredients you
        want to search for, click on the "Search" button to search for recipes
        that contain the selected ingredients.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 20,
    marginBottom: 8,
  },
});
