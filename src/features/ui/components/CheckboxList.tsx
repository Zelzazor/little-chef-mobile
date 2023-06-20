import { CheckBox } from '@rneui/base';
import { type FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { config } from '../../../config/app.config';

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
          <View style={styles.checkboxListElement}>
            <CheckBox
              checked={element.item.checked}
              onPress={() => {
                handlePress(element.item);
              }}
              containerStyle={styles.elementCheckbox}
            />
            <Text style={styles.elementLabel}>{element.item.label}</Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  checkboxListElement: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  elementCheckbox: {
    backgroundColor: config.colors.background,
    padding: 0,
  },

  elementLabel: {
    fontSize: 16,
  },
});
