import { Button } from '@rneui/themed';
import {
  Alert,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { type FCC } from '../../../config';
import { config } from '../../../config/app.config';

interface ImageViewProps {
  resolution: { width: number; height: number };
  setPhoto: (photo: null) => void;
  path: string;
}

export const ImageView: FCC<ImageViewProps> = ({
  resolution,
  setPhoto,
  path,
}) => {
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
            Alert.alert('Upload', 'Uploaded image to server', undefined, {
              userInterfaceStyle: 'light',
            });
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
});
