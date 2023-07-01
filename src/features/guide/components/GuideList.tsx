import { type BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { type TabParamList } from '../../navigation/types';
import { type GuideStackParamList } from '../types';

interface GuideListProps {
  links: Link[];
}

export interface Link {
  title: string;
  screen: keyof GuideStackParamList;
}

export const GuideList = ({ links }: GuideListProps) => {
  const navigation =
    useNavigation<
      BottomTabNavigationProp<TabParamList, 'GuideStack', undefined>
    >();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 8 }}>
        Welcome to the Little Chef user guide! Please tap on the preferred item
        to see more details.
      </Text>
      {links.map((link, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            navigation.navigate('GuideStack', { screen: link.screen });
          }}
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>{link.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  linkContainer: {
    marginBottom: 8,
  },
  linkText: {
    fontSize: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
