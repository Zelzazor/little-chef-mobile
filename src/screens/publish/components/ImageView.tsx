import { type NavigationProp, type RouteProp } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { type FCC } from '../../../config';
import { config } from '../../../config/app.config';
import { type SearchStackParamList } from '../../../features/search/types';
import { useSubmissions } from '../../../features/submission/hooks/useSubmission';
import { useUserContext } from '../../../features/user/context/useUserContext';

type Route = RouteProp<SearchStackParamList, 'Publish'>;
type Navigation = NavigationProp<SearchStackParamList, 'Publish'>;

interface ImageViewProps {
  resolution: { width: number; height: number };
  setPhoto: (photo: null) => void;
  path: string;
  route: Route;
  navigation: Navigation;
}

export const ImageView: FCC<ImageViewProps> = ({
  resolution,
  setPhoto,
  path,
  route,
  navigation,
}) => {
  const { isLoading, mutate: publishSubmission } =
    useSubmissions().usePublishSubmission();

  const { refetchUser } = useUserContext();

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={48} color={config.colors.primary} />
      </View>
    );

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: path,
        }}
        style={{ ...resolution, borderRadius: 50 }}
      />
      <View
        style={{
          paddingVertical: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Button
          color={config.colors.primary}
          buttonStyle={{
            padding: 15,
          }}
          radius={60}
          icon={{
            type: 'ion-icons',
            name: 'refresh',
            color: config.colors.primary,
            size: 50,
          }}
          onPress={() => {
            setPhoto(null);
          }}
          type="clear"
        />
        <Button
          color={config.colors.primary}
          buttonStyle={{
            padding: 15,
          }}
          radius={60}
          icon={{
            type: 'ion-icons',
            name: 'cloud-upload',
            color: 'white',
            size: 75,
          }}
          onPress={() => {
            publishSubmission(
              {
                imageUri: path,
                recipeId: route.params.recipeId,
              },
              {
                onSuccess: () => {
                  refetchUser();
                  Alert.alert('Success', 'Your submission has been published!');
                  navigation.navigate('Search');
                },
              },
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: config.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
