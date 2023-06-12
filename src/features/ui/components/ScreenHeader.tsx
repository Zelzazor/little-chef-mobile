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
    paddingTop: 5,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    height: 65,
  },

  pageTitle: {
    paddingLeft: 15,
    fontSize: 24,
    lineHeight: 26,
  },
});
