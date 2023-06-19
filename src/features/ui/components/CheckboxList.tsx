import { CheckBox } from '@rneui/base';
import { type FC } from 'react';
import { FlatList, Text, View } from 'react-native';

export type CheckboxListElement = {
  label: string;
  value: string;
  checked: boolean;
};

export interface CheckboxListProps {
  data: CheckboxListElement[];
  onSelect: (value: string) => void;
  onDeselect: (value: string) => void;
}

export const CheckboxList: FC<CheckboxListProps> = ({
  data,
  onSelect,
  onDeselect,
}) => {
  const handlePress = (element: CheckboxListElement) => {
    if (element.checked) {
      onDeselect(element.value);
      return;
    }

    onSelect(element.value);
  };

  return (
    <FlatList
      data={data}
      renderItem={(element: { item: CheckboxListElement }) => {
        return (
          <View>
            <CheckBox
              checked={element.item.checked}
              onPress={() => {
                handlePress(element.item);
              }}
            />
            <Text>{element.item.label}</Text>
          </View>
        );
      }}
    />
  );
};
