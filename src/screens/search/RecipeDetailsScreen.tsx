import { useFocusEffect } from '@react-navigation/native';
import { type StackScreenProps } from '@react-navigation/stack';
import { Button, Image, Text } from '@rneui/base';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Markdown from 'react-native-easy-markdown';
import Icon from 'react-native-vector-icons/Ionicons';
import { config } from '../../config/app.config';
import { useAuthContext } from '../../features/auth/context/useAuthContext';
import { useRecipes } from '../../features/search/hooks/useRecipes';
import { type SearchStackParamList } from '../../features/search/types';
import { Tag } from '../../features/ui/components/Tag';
import { useUserContext } from '../../features/user/context/useUserContext';

type RecipeDetailsScreenProps = StackScreenProps<
  SearchStackParamList,
  'RecipeDetails'
>;

export const RecipeDetailsScreen = ({
  route,
  navigation,
}: RecipeDetailsScreenProps) => {
  const recipeQueries = useRecipes();
  const { loggedIn } = useAuthContext();
  const { user, refetchUser } = useUserContext();
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = recipeQueries.useGetSingleRecipe(route.params.recipeId);

  useFocusEffect(
    useCallback(() => {
      refetchUser();
    }, [refetchUser]),
  );

  function unescapeLineBreaks(string: string) {
    return string.replace(/\\n/g, '\n');
  }

  if (isError)
    return (
      <View style={styles.loadingAndErrorContainer}>
        <Text>Error</Text>
      </View>
    );

  if (isLoading || isFetching || !response)
    return (
      <View style={styles.loadingAndErrorContainer}>
        <ActivityIndicator size={48} color="red" />
      </View>
    );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          marginBottom: 20,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.pop();
          }}
        >
          <Icon name="arrow-back" size={48} />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Submissions', {
              recipeId: response.data.id,
            });
          }}
        >
          <Icon name="albums-outline" size={48} />
        </Pressable>
      </View>

      <Image
        source={{ uri: response.data.imageUrl }}
        style={{ width: '80%', aspectRatio: 1, borderRadius: 10 }}
      />
      <View style={styles.tagList}>
        {(response.data.tags?.length ?? 0) > 0 &&
          response.data.tags?.map((tagEntry) => {
            return <Tag key={tagEntry.tag.id} title={tagEntry.tag.name} />;
          })}
      </View>
      <View style={{ display: 'flex', width: '80%', marginBottom: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>
          {response.data.name}
        </Text>
        <Text style={{ fontSize: 24 }}>Ingredients</Text>
        <Text style={{ fontSize: 20 }}>
          <View style={{ marginBottom: 10 }}>
            {response.data.ingredients?.map((ingredient) => (
              <Text key={ingredient.ingredient.id}>
                {ingredient.quantity} {ingredient.measure_unit}
                {' of '}
                {ingredient.ingredient.name}
              </Text>
            ))}
          </View>
        </Text>
        <Text style={{ fontSize: 24 }}>Instructions</Text>
        <Markdown>{unescapeLineBreaks(response.data.recipeSteps)}</Markdown>

        {loggedIn && user?.bannedAt === null && (
          <Button
            buttonStyle={{
              backgroundColor: config.colors.primary,
              borderRadius: 50,
              marginTop: 20,
            }}
            onPress={() => {
              refetchUser();
              navigation.navigate('Publish', {
                recipeId: response.data.id,
              });
            }}
          >
            <Icon name="cloud-upload" color="white" size={30} />
          </Button>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    gap: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loadingAndErrorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  tagList: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    width: '100%',
    justifyContent: 'flex-start',
    maxWidth: '100%',
    flexWrap: 'wrap',
    paddingHorizontal: 40,
  },
});
