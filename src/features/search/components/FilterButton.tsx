import { Button } from '@rneui/base';
import Icon from 'react-native-vector-icons/Ionicons';

export const FilterButton = () => {
  return (
    <Button type="clear" containerStyle={{ width: 65, height: 65 }}>
      <Icon name="filter-outline" size={40} />
    </Button>
  );
};
