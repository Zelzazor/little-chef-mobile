import { Button, Input } from '@rneui/themed';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { config } from '../../config/app.config';
import { useUserContext } from '../../features/user/context/useUserContext';
import { useUser } from '../../features/user/hooks/useUser';

export const EditProfileScreen = () => {
  const { user, refetchUser } = useUserContext();
  const { useUpdateUser } = useUser();
  const { mutate: updateUser } = useUpdateUser();
  const [isLoading, setIsLoading] = useState(false);
  const [nickName, setNickName] = useState(user.nickName ?? '');
  const [fullName, setFullName] = useState(user.name);
  const handleSave = () => {
    setIsLoading(true);
    updateUser(
      { name: fullName, nickName },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Your profile has been updated');
          refetchUser();
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <View style={{ margin: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
        Edit Profile Screen
      </Text>
      <Input
        label="Nickname"
        placeholder="Enter your Nickname"
        disabled={isLoading}
        value={nickName}
        onChangeText={setNickName}
      />
      <Input
        label="Full Name"
        placeholder="Enter your Full Name"
        disabled={isLoading}
        value={fullName}
        onChangeText={setFullName}
      />
      <Button
        disabled={isLoading}
        title="Save"
        onPress={handleSave}
        color={config.colors.primary}
      />
    </View>
  );
};
