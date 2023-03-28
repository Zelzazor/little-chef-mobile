import { useNavigation } from '@react-navigation/native';
import { Input } from '@rneui/base';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
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
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Ingredient');
        }}
      >
        <View style={styles.buttonIngre}>
          <Text style={styles.buttonTextIngredients}>Ingredients</Text>
        </View>
      </TouchableOpacity>
      <Otro />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Recipe');
        }}
      >
        <View style={styles.buttonRecipe}>
          <Text style={styles.buttonTextRecipe}>Recipes</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  buttonIngre: {
    width: '70%',
    backgroundColor: 'red',
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '30%',
  },
  buttonTextIngredients: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonRecipe: {
    width: 160,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '30%',
  },
  buttonTextRecipe: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
