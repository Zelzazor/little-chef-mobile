import { useIsFocused } from '@react-navigation/native';
import { type StackScreenProps } from '@react-navigation/stack';
import { useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import {
  Camera,
  useCameraDevices,
  type PhotoFile,
} from 'react-native-vision-camera';
import { type SearchStackParamList } from '../../features/search/types';
import { CameraView } from './components/CameraView';
import { ImageView } from './components/ImageView';

type PublishScreenProps = StackScreenProps<SearchStackParamList, 'Publish'>;
/**
 * The PublishScreen component
 * @param {object} props The props of the PublishScreen component
 * @param {object} props.navigation The navigation object
 * @returns {JSX.Element} The PublishScreen component
 */
export const PublishScreen = ({
  route,
  navigation,
}: PublishScreenProps): JSX.Element => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const devices = useCameraDevices();
  const device = devices.back;
  const isFocused = useIsFocused();

  const [authorized, setAuthorized] = useState(false);
  const [photo, setPhoto] = useState<PhotoFile | undefined | null>(null);
  const cameraRef = useRef<Camera>(null);
  const resolution = { width: windowWidth - 20, height: windowHeight - 200 };

  const requestAuthorization = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    setAuthorized(cameraPermission === 'authorized');
  };

  const takePhoto = async () => {
    const newPhoto = await cameraRef.current?.takeSnapshot();
    setPhoto(newPhoto);
  };

  if (photo != null) {
    const path = `file://${photo.path}`;
    return (
      <ImageView
        resolution={resolution}
        setPhoto={setPhoto}
        path={path}
        route={route}
        navigation={navigation}
      />
    );
  }
  return (
    <CameraView
      authorized={authorized}
      requestAuthorization={requestAuthorization}
      device={device}
      cameraRef={cameraRef}
      resolution={resolution}
      isFocused={isFocused}
      takePhoto={takePhoto}
    />
  );
};
