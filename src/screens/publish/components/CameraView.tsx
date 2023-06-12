import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Camera, type CameraDevice } from 'react-native-vision-camera';
import { Button } from '@rneui/themed';
import { config } from '../../../config/app.config';
import { type FCC } from '../../../config';

interface CameraViewProps {
  authorized: boolean;
  device?: CameraDevice;
  cameraRef: React.RefObject<Camera>;
  resolution: { width: number; height: number };
  isFocused: boolean;
  requestAuthorization: () => Promise<void>;
  takePhoto: () => Promise<void>;
}
export const CameraView: FCC<CameraViewProps> = ({
  authorized,
  requestAuthorization,
  device,
  cameraRef,
  resolution,
  isFocused,
  takePhoto,
}) => {
  const isCameraActive = authorized && device != null;

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
          <View
            style={{
              borderRadius: 50,
              overflow: 'hidden',
            }}
          >
            <Camera
              device={device}
              ref={cameraRef}
              style={resolution}
              isActive={isFocused}
              photo={true}
            />
          </View>
          <View
            style={{
              paddingVertical: 10,
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Button
              color={config.colors.primary}
              containerStyle={{
                height: 500,
              }}
              buttonStyle={{
                padding: 15,
              }}
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
