import { Text } from '@rneui/base';
import { type FC } from 'react';
import { type ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface IngredientSearchButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export const IngredientSearchButton: FC<IngredientSearchButtonProps> = ({
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        // position: 'absolute',
        bottom: 0,
        height: 45,
        backgroundColor: '#CA3433',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
    >
      <Text style={{ color: '#FFFFFF' }}>Let's cook</Text>
    </TouchableOpacity>
  );
};
