import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from '../../ui/components/Dropdown';
import { FilterButton } from './FilterButton';
import { TagFiltersDropdownCheckboxList } from './TagFiltersDropdownCheckboxList';

export const TagsFiltersDropdown: FC = () => {
  return (
    <Dropdown
      style={styles.dropdown}
      triggerElement={<FilterButton />}
      offset={-40}
    >
      <TagFiltersDropdownCheckboxList />
    </Dropdown>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    minWidth: 215,
  },
});
