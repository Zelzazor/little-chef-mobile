import { Text, View } from 'react-native';

interface OtroProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export const Otro = () => {
  return (
    <View>
      <Text>hola</Text>
    </View>
  );
};
