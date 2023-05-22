import { Text } from '@rneui/base';
import { type FC } from 'react';
import { TouchableOpacity, type ViewStyle } from 'react-native';

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
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 60,
        width: 120,
        backgroundColor: '#CA3433',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45,
        ...style,
      }}
    >
      <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Let's cook</Text>
    </TouchableOpacity>
  );
};
