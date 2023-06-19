import { type FC } from 'react';
import { Text } from 'react-native';
import { Dropdown } from '../../ui/components/Dropdown';
import { FilterButton } from './FilterButton';

export const TagsFiltersDropdown: FC = () => {
  return (
    <Dropdown triggerElement={<FilterButton />}>
      <Text>Filter</Text>
    </Dropdown>
  );
};
