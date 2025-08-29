import { View, Text, Button } from 'react-native';
import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Types/navigation';

type ProfilesProps = NativeStackNavigationProp<RootStackParamList, 
'GetStarted'
>;

export default function Profiles() {
  const { signOut } = useAuth();
  const navigation = useNavigation<ProfilesProps>(); // Initialize navigation

  const handleSignOut = async () => {
    await signOut();
    navigation.navigate('GetStarted');
  };

  return (
    <View>
      <Text>Profiles</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
