import { type FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export interface BackButtonProps {
  onPress: () => void;
}

export const BackButton: FC<BackButtonProps> = ({ onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Icon name="arrow-back-outline" size={40} />
      </TouchableOpacity>
    </View>
  );
};
