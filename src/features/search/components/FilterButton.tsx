import { Button } from '@rneui/base';
import { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export const FilterButton = forwardRef((_, ref) => {
  return (
    <Button disabled type="clear" containerStyle={{ width: 65, height: 65 }}>
      <Icon name="filter-outline" size={40} />
    </Button>
  );
});
