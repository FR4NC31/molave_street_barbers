import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

//icons
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

export default function BottomTabNavigator() {
  return (
    <View className='absolute bottom-6 left-0 right-0'>
      <View className='flex-row justify-center items-center h-16'>
        <TouchableOpacity className='flex-1 justify-center items-center'>
          <Octicons name="home" size={24} color="black" />
          <Text className='text-xs mt-1'>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-1 justify-center items-center'>
          <MaterialCommunityIcons name="stool-outline" size={24} color="black" />
          <Text className='text-xs mt-1'>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-1 justify-center items-center'>
          <Feather name="user" size={24} color="black" />
          <Text className='text-xs mt-1'>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}