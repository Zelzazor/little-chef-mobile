import { StyleSheet, Text, View } from 'react-native';

export const GettingStartedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Getting Started</Text>
      <Text style={styles.text}>
        This is Little Chef. It is a recipe app that allows you to search for
        recipes by ingredients and also allows you to submit the recipes you
        have submitted.
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
