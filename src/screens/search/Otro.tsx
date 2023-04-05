import { Button } from '@rneui/base';
import { Text, View } from 'react-native';
import { useSearchContext } from '../../features/search/context/SearchContext';

interface OtroProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export const Otro = () => {
  const { ingredients, addToList, removeFromList } = useSearchContext();

  console.log(ingredients);
  return (
    <View>
      <Button
        onPress={() => {
          addToList({ id: ingredients.length + 1, name: 'Pimienta' });
        }}
        title="Add"
      />
      <Text>hola</Text>
      <Button
        onPress={() => {
          removeFromList(ingredients.length);
        }}
        title="Remove"
      />
    </View>
  );
};
