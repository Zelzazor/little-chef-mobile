import { CheckBox } from '@rneui/base';
import { type FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    <View>
      {data.map((element: CheckboxListElement) => {
        return (
          <View style={styles.checkboxListElement} key={element.value}>
            <CheckBox
              checked={element.checked}
              onPress={() => {
                handlePress(element);
              }}
              containerStyle={styles.elementCheckbox}
            />
            <TouchableOpacity
              onPress={() => {
                handlePress(element);
              }}
            >
              <Text style={styles.elementLabel}>{element.label}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
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
