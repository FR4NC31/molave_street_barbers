import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Types/navigation';
import { useAuth } from '../Context/AuthContext'

//component
import TabScreen from '../Components/BottomTab'

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home' | 'GetStarted' // Add 'Home' since you're already on Home screen
>;

export default function HomeScreen() {
  const { user, signOut } = useAuth()
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const displayName = user?.user_metadata?.display_name || 'User'

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { 
          text: 'Cancel', 
          style: 'cancel' 
        },
        { 
          text: 'Sign Out', 
          onPress: async () => {
            try {
              const { error } = await signOut();
              if (error) {
                Alert.alert('Error', 'Failed to sign out. Please try again.');
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'GetStarted' }],
                });
              }
            } catch (error) {
              Alert.alert('Error', 'An unexpected error occurred.');
            }
          },
          style: 'destructive' 
        },
      ]
    );
  };

  return (
    <View className='flex-1 bg-gray-50'>
      {/* Main Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text className='text-3xl font-bold text-center mb-4'>
          Hello, {displayName}! 👋
        </Text>
        <Text className='text-lg text-gray-600 text-center mb-8'>
          Welcome to your home screen
        </Text>
        
        <TouchableOpacity 
          onPress={handleSignOut} 
          className='bg-red-500 px-6 py-3 rounded-lg'
        >
          <Text className='text-white font-semibold'>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Bottom Tab Navigation */}
      <TabScreen/>
    </View>
  )
}