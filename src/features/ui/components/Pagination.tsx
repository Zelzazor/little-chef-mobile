import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { type PaginationMetadata } from '../../utility/types/response';

interface PaginationProps {
  pagination: PaginationMetadata | undefined;
  prevPage: () => void;
  nextPage: () => void;
}

export const Pagination = ({
  pagination,
  prevPage,
  nextPage,
}: PaginationProps) => {
  if (pagination?.totalPages === 1) return <></>;

  return pagination?.totalItems ? (
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
        disabled={pagination?.page === 1}
        onPress={prevPage}
      >
        <Icon
          name="chevron-back"
          color={`${pagination?.page === 1 ? '#ccc' : '#000'}`}
          size={24}
        />
      </Pressable>
      <Text>
        Page {pagination?.page} of {pagination?.totalPages}
      </Text>
      <Pressable
        style={{ padding: 10 }}
        disabled={pagination?.page === pagination?.totalPages}
        onPress={nextPage}
      >
        <Icon
          name="chevron-forward"
          color={`${
            pagination?.page === pagination?.totalPages ? '#ccc' : '#000'
          }`}
          size={24}
        />
      </Pressable>
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: 'center', padding: 40 }}>
      <Text>No items found</Text>
    </View>
  );
};
