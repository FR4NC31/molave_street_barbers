import { View, Text, TouchableOpacity } from 'react-native'
import {useFonts} from 'expo-font'
import React from 'react'

//icons
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

export default function BottomTabNavigator() {

   const [fontsLoaded] = useFonts({
        'Satoshi-Bold': require('../Assets/Fonts/Satoshi-Bold.otf'),
        'Satoshi-Regular': require('../Assets/Fonts/Satoshi-Regular.otf'),
        'Satoshi-Medium': require('../Assets/Fonts/Satoshi-Medium.otf'),
      });
      if (!fontsLoaded) return null;

  return (
    <View className='fixed bottom-0 left-0 right-0' style={{backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#e5e7eb', zIndex: 20}}>
      <View className='flex-row justify-center items-center h-16'>
        <TouchableOpacity className='flex-1 justify-center items-center'>
          <Octicons name="home" size={24} color="black" />
          <Text className='text-sm font-satoshibold mt-1'>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-1 justify-center items-center'>
          <MaterialCommunityIcons name="stool-outline" size={24} color="gray" />
          <Text className='text-sm font-satoshibold text-gray-500 mt-1'>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-1 justify-center items-center'>
          <Feather name="user" size={24} color="gray" />
          <Text className='text-sm font-satoshibold text-gray-500 mt-1'>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}