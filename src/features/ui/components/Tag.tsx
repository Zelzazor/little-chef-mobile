import { type FC } from 'react';
import { StyleSheet, Text, View, type StyleProp } from 'react-native';
import { config } from '../../../config/app.config';

export interface TagProps {
  title: string;
  style?: StyleProp<any>;
}

export const Tag: FC<TagProps> = ({ title, style }) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: config.colors.border,
    backgroundColor: '#F1F1F1',
    borderRadius: 50,
  },

  text: {},
});
