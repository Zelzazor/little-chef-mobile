import { SearchBar } from '@rneui/base';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { config } from '../../config/app.config';
import { useIngredients } from '../../features/search/hooks/useIngredients';
import { type Ingredient } from '../../features/search/types';
import { Pagination } from '../../features/ui/components/Pagination';
import { useDebounce } from '../../features/utility/hooks/useDebounce';

export const SearchIngredientScreen = () => {
  const { useGetIngredients } = useIngredients();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading, isError } = useGetIngredients({
    pageSize: 6,
    page,
    ...(debouncedSearch && { name: debouncedSearch }),
  });

  const nextPage = () => {
    if (data && data.pagination.page < data.pagination.totalPages)
      setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        platform="android"
        placeholder="Search"
        style={{ borderColor: '#ccc', borderBottomWidth: 1 }}
        onChangeText={(e) => {
          setSearch(e);
        }}
      />
      <FlatList
        data={data?.ingredients}
        renderItem={({ item: ingredient }) => (
          <Pressable
            style={{
              padding: 30,
              borderColor: '#CCCCCC',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onPress={() => {
              console.log({ ingredient });
            }}
          >
            <Image
              source={{ uri: ingredient.imageUrl }}
              style={{ width: '50%', aspectRatio: 1, borderRadius: 10 }}
            />
            <Text>{ingredient.name}</Text>
          </Pressable>
        )}
        keyExtractor={(ingredient: Ingredient) => ingredient.id}
        ListFooterComponent={() => (
          <Pagination
            pagination={data?.pagination}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
