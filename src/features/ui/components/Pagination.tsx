import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { type GetResponse } from '../../utility/types/response';

interface PaginationProps {
  data: GetResponse<any> | undefined;
  prevPage: () => void;
  nextPage: () => void;
}

export const Pagination = ({ data, prevPage, nextPage }: PaginationProps) => {
  return data?.data.length ? (
    <View
      style={{
        padding: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}
    >
      <Pressable
        style={{ padding: 10 }}
        disabled={data.pagination.page === 1}
        onPress={prevPage}
      >
        <Icon
          name="chevron-back"
          color={`${data?.pagination.page === 1 ? '#ccc' : '#000'}`}
          size={24}
        />
      </Pressable>
      <Text>
        Page {data?.pagination.page} of {data?.pagination.totalPages}
      </Text>
      <Pressable
        style={{ padding: 10 }}
        disabled={data?.pagination.page === data?.pagination.totalPages}
        onPress={nextPage}
      >
        <Icon
          name="chevron-forward"
          color={`${
            data?.pagination.page === data?.pagination.totalPages
              ? '#ccc'
              : '#000'
          }`}
          size={24}
        />
      </Pressable>
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: 'center', padding: 40 }}>
      <Text>No recipes found</Text>
    </View>
  );
};
