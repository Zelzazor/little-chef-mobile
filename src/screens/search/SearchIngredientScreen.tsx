import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { config } from '../../config/app.config';
export const SearchIngredientScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello Recipe</Text>
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
});
