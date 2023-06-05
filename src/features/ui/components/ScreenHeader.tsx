import { StyleSheet, Text, View } from 'react-native';
import { BackButton } from './BackButton';

export interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
}

export const ScreenHeader = ({ title, onBack }: ScreenHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      {onBack && <BackButton onPress={onBack} />}
      <Text style={styles.pageTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },

  pageTitle: {
    padding: 10,
    fontSize: 26,
  },
});
