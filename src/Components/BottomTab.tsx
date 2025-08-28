import { View, Text, TouchableOpacity } from 'react-native'
import {useFonts} from 'expo-font'
import React from 'react'

//icons
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

interface BottomTabNavigatorProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export default function BottomTabNavigator({ activeTab, onTabPress }: BottomTabNavigatorProps) {

   const [fontsLoaded] = useFonts({
        'Satoshi-Bold': require('../Assets/Fonts/Satoshi-Bold.otf'),
        'Satoshi-Regular': require('../Assets/Fonts/Satoshi-Regular.otf'),
        'Satoshi-Medium': require('../Assets/Fonts/Satoshi-Medium.otf'),
      });
      if (!fontsLoaded) return null;

  return (
    <View className='fixed bottom-0 left-0 right-0' style={{backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#e5e7eb', zIndex: 20}}>
      <View className='flex-row justify-center items-center h-16'>
        <TouchableOpacity className='flex-1 justify-center items-center' onPress={() => onTabPress('Home')}>
          <Octicons name="home" size={24} color={activeTab === 'Home' ? "black" : "gray"} />
          <Text className='text-sm font-satoshibold mt-1' style={{ color: activeTab === 'Home' ? "black" : "gray" }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-1 justify-center items-center' onPress={() => onTabPress('Appointments')}>
          <MaterialCommunityIcons name="stool-outline" size={24} color={activeTab === 'Appointments' ? "black" : "gray"} />
          <Text className='text-sm font-satoshibold mt-1' style={{ color: activeTab === 'Appointments' ? "black" : "gray" }}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-1 justify-center items-center' onPress={() => onTabPress('Profile')}>
          <Feather name="user" size={24} color={activeTab === 'Profile' ? "black" : "gray"} />
          <Text className='text-sm font-satoshibold mt-1' style={{ color: activeTab === 'Profile' ? "black" : "gray" }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
