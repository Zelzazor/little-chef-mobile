import { useIsFocused } from '@react-navigation/native';
import { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
  useWindowDimensions,
  Alert,
} from 'react-native';
import {
  Camera,
  type PhotoFile,
  useCameraDevices,
} from 'react-native-vision-camera';
import { Button } from '@rneui/themed';
import { config } from '../../config/app.config';
export const PublishScreen = () => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  const [authorized, setAuthorized] = useState(false);
  const [photo, setPhoto] = useState<PhotoFile | undefined | null>(null);
  const cameraRef = useRef<Camera>(null);
  const resolution = { width: windowWidth - 20, height: windowHeight - 200 };

  const isCameraActive = authorized && !(device == null);

  const requestAuthorization = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    setAuthorized(cameraPermission === 'authorized');
  };

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePhoto();
    setPhoto(photo);
  };

  if (photo != null) {
    const path = `file://${photo.path}`;
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: path }}
          style={{ ...resolution, borderRadius: 50 }}
        ></Image>
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
            buttonStyle={{ padding: 15 }}
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
            buttonStyle={{ padding: 15 }}
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
  }
  return (
    <View style={styles.container}>
      {!authorized && (
        <Button
          title="Authorize camera use"
          onPress={() => {
            void requestAuthorization();
          }}
          color={config.colors.primary}
        />
      )}
      {isCameraActive && (
        <View>
          <View style={{ borderRadius: 50, overflow: 'hidden' }}>
            <Camera
              device={device}
              ref={cameraRef}
              style={resolution}
              isActive={isFocused}
              photo={true}
            />
          </View>
          <View style={{ paddingVertical: 10, flex: 1, alignItems: 'center' }}>
            <Button
              color={config.colors.primary}
              containerStyle={{ height: 500 }}
              buttonStyle={{ padding: 15 }}
              radius={60}
              icon={{
                type: 'ion-icons',
                name: 'camera',
                color: 'white',
                size: 75,
              }}
              onPress={() => {
                void takePhoto();
              }}
            />
          </View>
        </View>
      )}
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
