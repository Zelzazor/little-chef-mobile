import { Input } from '@rneui/base';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  FlatList,
} from 'react-native';
import { config } from '../../config/app.config';

export const SearchScreen = () => {
  const [search, setSearch] = useState<string>('');
  const [list, setList] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <Input
        onChangeText={(value) => {
          setSearch(value);
        }}
        onSubmitEditing={() => {
          setList((prev) => [...prev, search]);
        }}
        value={search}
        leftIcon={{ type: 'ion-icons', name: 'search' }}
      ></Input>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <Text style={{ paddingHorizontal: 15, fontSize: 50 }}>{item}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.colors.background,
    height: 1000,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
