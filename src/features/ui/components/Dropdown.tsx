import { useEffect, useState, type ReactElement } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Popover } from 'react-native-popper';
import { type IPopoverProps } from 'react-native-popper/lib/typescript/types';
import { type FCC } from '../../../config';
import { config } from '../../../config/app.config';

export interface DropdownProps extends Partial<IPopoverProps> {
  triggerElement: ReactElement;
}

export const Dropdown: FCC<DropdownProps> = ({
  children,
  triggerElement,
  ...popoverProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShadowVisible, setIsShadowVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsShadowVisible(true);
      }, 70);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setIsShadowVisible(false);
    }
  }, [isOpen]);

  return (
    <Popover
      {...popoverProps}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Pressable>
          <View>{triggerElement}</View>
        </Pressable>
      }
    >
      <Popover.Backdrop />
      <Popover.Content>
        <View
          style={{
            ...styles.dropdownView,
            ...(isShadowVisible ? styles.dropdownShadow : {}),
          }}
        >
          {children}
        </View>
      </Popover.Content>
    </Popover>
  );
};

const styles = StyleSheet.create({
  dropdownView: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: config.colors.background,
    marginRight: 10,
  },

  dropdownShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
