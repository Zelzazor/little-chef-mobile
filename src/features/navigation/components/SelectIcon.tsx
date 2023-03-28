import { type FC } from 'react';
import { type ColorValue } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { type TabParamList } from '../types';

interface SelectIconProps {
  routeName: keyof TabParamList;
  focused: boolean;
  size: number;
  color: number | ColorValue | undefined;
}

export const SelectIcon: FC<SelectIconProps> = ({
  routeName,
  focused,
  size,
  color,
}) => {
  const icons = {
    SearchIndex: {
      active: 'search',
      inactive: 'search-outline',
    },
    Profile: {
      active: 'person',
      inactive: 'person-outline',
    },
    Login: {
      active: 'log-in',
      inactive: 'log-in-outline',
    },
    Publish: {
      active: 'add-circle',
      inactive: 'add-circle-outline',
    },
  };

  const iconName = focused
    ? icons[routeName].active
    : icons[routeName].inactive;
  return <Icon name={iconName} size={size} color={color} />;
};
