import { type FC } from 'react';
import { Image } from 'react-native';
import { type ImageProps } from 'react-native/types';
import NoImage from '../assets/no-image.png';

export interface ImageDisplayProps extends ImageProps {}

export const UrlImage: FC<ImageDisplayProps> = ({ source, ...imageProps }) => {
  const { uri } = source as any;

  if (uri) {
    return <Image {...imageProps} source={source} />;
  }

  return <Image {...imageProps} source={NoImage} />;
};
