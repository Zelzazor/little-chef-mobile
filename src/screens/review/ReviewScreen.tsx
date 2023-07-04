import { useFocusEffect } from '@react-navigation/native';
import { Button } from '@rneui/base';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useQueryClient } from 'react-query';
import { config } from '../../config/app.config';
import { useUserContext } from '../../features/user/context/useUserContext';
import { useVotes } from '../../features/votes/hooks/useVotes';

export const ReviewScreen = () => {
  const { useGetRandomSubmission, useSubmitVote } = useVotes();
  const { refetchUser } = useUserContext();
  const queryClient = useQueryClient();
  const [isEnabled, setIsEnabled] = useState(true);
  const {
    data: submission,
    isLoading,
    isFetching,
    isError,
  } = useGetRandomSubmission();
  const { mutate: submitVote } = useSubmitVote();

  const onVoteSuccess = () => {
    queryClient.invalidateQueries('vote');
    setIsEnabled(true);
    refetchUser();
  };

  useFocusEffect(
    useCallback(() => {
      refetchUser();
    }, [refetchUser]),
  );

  if (isError)
    return (
      <View style={styles.loadingAndErrorContainer}>
        <Text>Error</Text>
      </View>
    );

  if ((isLoading || isFetching) && !submission)
    return (
      <View style={styles.loadingAndErrorContainer}>
        <ActivityIndicator size={48} color="red" />
      </View>
    );

  if (!submission)
    return (
      <View style={styles.loadingAndErrorContainer}>
        <Text>No submissions found</Text>
        <Button
          color={config.colors.primary}
          size="lg"
          buttonStyle={{
            borderRadius: 50,
            marginTop: 20,
          }}
          onPress={() => {
            queryClient.invalidateQueries('vote');
          }}
        >
          <Icon name="refresh-outline" color="white" size={24} />
        </Button>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.recipeName}>{submission.recipe.name}</Text>
      <Image
        source={{ uri: submission.recipe.imageUrl }}
        style={styles.postImage}
      />
      <Image source={{ uri: submission.imageUrl }} style={styles.recipeImage} />
      <View style={styles.buttonContainer}>
        <Button
          disabled={!isEnabled}
          color={'#00ff00'}
          size="lg"
          buttonStyle={{
            borderRadius: 50,
            marginRight: 20,
          }}
          onPress={() => {
            setIsEnabled(false);
            refetchUser().then((userResult) => {
              if (userResult.data?.data.bannedAt) return;
              submitVote(
                { submissionId: submission.id, isUpvote: true },
                {
                  onSuccess: onVoteSuccess,
                },
              );
            });
          }}
        >
          <Icon name="checkmark-outline" color="white" size={30} />
        </Button>
        <Button
          disabled={!isEnabled}
          color={'#ff0000'}
          size="lg"
          buttonStyle={{
            borderRadius: 50,
          }}
          onPress={() => {
            setIsEnabled(false);
            refetchUser().then((userResult) => {
              if (userResult.data?.data.bannedAt) return;
              submitVote(
                { submissionId: submission.id, isUpvote: false },
                {
                  onSuccess: onVoteSuccess,
                },
              );
            });
          }}
        >
          <Icon name="close-outline" color="white" size={30} />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingAndErrorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});
