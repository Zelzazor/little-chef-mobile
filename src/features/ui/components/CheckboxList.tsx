import { CheckBox } from '@rneui/base';
import { type FC } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { config } from '../../../config/app.config';

export type CheckboxListElement = {
  label: string;
  value: string;
  checked: boolean;
};

export interface CheckboxListProps {
  data: CheckboxListElement[];
  isLoading: boolean;
  onSelect: (value: string) => void;
  onDeselect: (value: string) => void;
}

export const CheckboxList: FC<CheckboxListProps> = ({
  data,
  isLoading,
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

  if (isLoading || !data) {
    return <ActivityIndicator size={24} />;
  }

  return (
    <View>
      {data.map((element: CheckboxListElement) => {
        return (
          <TouchableOpacity
            onPress={() => {
              handlePress(element);
            }}
            style={styles.checkboxListElement}
            key={element.value}
          >
            <CheckBox
              checked={element.checked}
              onPress={() => {
                handlePress(element);
              }}
              containerStyle={styles.elementCheckbox}
            />
            <View style={styles.elementLabelView}>
              <Text style={styles.elementLabel} numberOfLines={1}>
                {element.label}
              </Text>
            </View>
          </TouchableOpacity>
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
    padding: 5,
  },

  elementLabelView: {
    width: 100,
  },
});
