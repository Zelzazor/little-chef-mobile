import { useNavigation } from '@react-navigation/native';
import { Input } from '@rneui/base';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import {
  FlatList,
  LogBox,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { config } from '../../config/app.config';
import { Otro } from './Otro';
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
        <View style={styles.buttonIngre}>
          <Text style={styles.buttonTextIngredients}>
            Search by{'\n'}
            Ingredients
          </Text>
        </View>
      </TouchableNativeFeedback>

      <View style={styles.space} />

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
    backgroundColor: config.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  buttonIngre: {
    width: '100%',
    backgroundColor: 'red',
    alignSelf: 'center',
    height: '50%',
    justifyContent: 'center',
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
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: '50%',
    opacity: 0.5,
  },

  buttonTextRecipe: {
    textAlign: 'center',
    color: '#69140E',
    fontSize: 50,
    fontWeight: 'bold',
  },

  space: {
    width: '100%',
    height: '2%',
  },
});
