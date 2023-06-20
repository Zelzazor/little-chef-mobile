import { type FC } from 'react';
import { Dropdown } from '../../ui/components/Dropdown';
import { FilterButton } from './FilterButton';
import { TagFiltersDropdownCheckboxList } from './TagFiltersDropdownCheckboxList';

export const TagsFiltersDropdown: FC = () => {
  return (
    <Dropdown triggerElement={<FilterButton />}>
      <TagFiltersDropdownCheckboxList />
    </Dropdown>
  );
};
