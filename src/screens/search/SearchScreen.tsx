import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { config } from '../../config/app.config';
import { type SearchStackNavigationParams } from './SearchStackNavigation';

export const SearchScreen = () => {
  const navigation = useNavigation<SearchStackNavigationParams>();
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate('Ingredient');
        }}
      >
        <View style={styles.buttonIngredients}>
          <Text style={styles.buttonTextIngredients}>
            Search by{'\n'}
            Ingredients
          </Text>
        </View>
      </TouchableNativeFeedback>

      <View style={styles.space}>
        <Text style={styles.textSpace}>Or</Text>
      </View>

      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate('Recipe');
        }}
      >
        <View style={styles.buttonRecipe}>
          <Text style={styles.buttonTextRecipe}>
            Search by{'\n'}
            Recipes
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.background,
  },
  buttonIngredients: {
    width: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    flexGrow: 1,
    opacity: 0.6,
  },
  buttonTextIngredients: {
    textAlign: 'center',
    color: '#69140E',
    fontSize: 50,
    fontWeight: 'bold',
  },

  buttonRecipe: {
    width: '100%',
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    opacity: 0.5,
    flexGrow: 1,
  },

  buttonTextRecipe: {
    textAlign: 'center',
    color: '#69140E',
    fontSize: 50,
    fontWeight: 'bold',
  },

  space: {
    width: '100%',
    alignItems: 'center',
  },
  textSpace: {
    fontSize: 20,
  },
});
