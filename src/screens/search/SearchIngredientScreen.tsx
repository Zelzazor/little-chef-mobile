import { SearchBar } from '@rneui/base';
import { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { config } from '../../config/app.config';
import { useIngredients } from '../../features/search/hooks/useIngredients';
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
