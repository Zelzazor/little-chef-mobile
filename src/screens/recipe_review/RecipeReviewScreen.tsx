import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';



export const RecipeScreen = () => {
  const { params } = useRoute();
  
  const recipeName: string = "Ejemplo";
  const [votes, setVotes] = useState(5);
  const navigation = useNavigation();

  const handleVote = (voteType: 'positive' | 'negative') => {
    const increment = voteType === 'positive' ? 1 : -1;
    setVotes(votes + increment);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.recipeName}>{recipeName}</Text>
      <Image source={{uri: 'https://via.placeholder.com/200'}} style={styles.postImage} />
      <Image source={{uri: 'https://via.placeholder.com/200'}} style={styles.recipeImage} />
      <Text style={styles.voteCount}>{votes} votos disponibles</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.voteButton, styles.positiveButton]} onPress={() => handleVote('positive')}>
          <Text style={styles.buttonText}>Voto positivo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.voteButton, styles.negativeButton]} onPress={() => handleVote('negative')}>
          <Text style={styles.buttonText}>Voto negativo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  recipeImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  voteCount: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  voteButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  positiveButton: {
    backgroundColor: '#00ff00',
    marginRight: 10,
  },
  negativeButton: {
    backgroundColor: '#ff0000',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});