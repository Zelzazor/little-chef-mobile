import { useMemo, type FC } from 'react';
import { Text, View } from 'react-native';
import {
  CheckboxList,
  type CheckboxListElement,
} from '../../ui/components/CheckboxList';
import { useRecipeSearchFiltersContext } from '../context/RecipeSearchFiltersContext';
import { useTags } from '../hooks/useTags';
import { TagTypes } from '../types';

export const TagFiltersDropdownCheckboxList: FC = () => {
  const tagQueries = useTags();

  const {
    data: response,
    isLoading,
    isError,
  } = tagQueries.useGetTags({
    pageSize: 200,
  });

  const {
    tags: selectedTags,
    addTag,
    removeTag,
  } = useRecipeSearchFiltersContext();

  const difficultyTags = useMemo(() => {
    return (
      response?.tags.filter((tag) => {
        return tag.tagType.name === TagTypes.Difficulty;
      }) ?? []
    );
  }, [response?.tags]);

  const otherTags = useMemo(() => {
    return (
      response?.tags.filter((tag) => {
        return tag.tagType.name === TagTypes.Others;
      }) ?? []
    );
  }, [response?.tags]);

  const difficultyTagsCheckboxListData: CheckboxListElement[] = useMemo(() => {
    return difficultyTags.map((tag) => {
      return {
        label: tag.name,
        value: tag.id,
        checked: Boolean(
          selectedTags.find((selectedTag) => selectedTag.id === tag.id),
        ),
      };
    });
  }, [difficultyTags, selectedTags]);

  const otherTagsCheckboxListData: CheckboxListElement[] = useMemo(() => {
    return otherTags.map((tag) => {
      return {
        label: tag.name,
        value: tag.id,
        checked: Boolean(
          selectedTags.find((selectedTag) => selectedTag.id === tag.id),
        ),
      };
    });
  }, [otherTags, selectedTags]);

  const handleSelection = (value: string) => {
    const tagToAdd = response?.tags.find((tag) => {
      return tag.id === value;
    });

    if (tagToAdd) addTag(tagToAdd);
  };

  const handleDeselection = (value: string) => {
    removeTag(value);
  };

  return (
    <View>
      <Text>Difficulty</Text>
      <CheckboxList
        data={difficultyTagsCheckboxListData}
        onSelect={handleSelection}
        onDeselect={handleDeselection}
      />
      <Text>Others</Text>
      <CheckboxList
        data={otherTagsCheckboxListData}
        onSelect={handleSelection}
        onDeselect={handleDeselection}
      />
    </View>
  );
};