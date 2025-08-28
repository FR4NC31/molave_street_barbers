import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';
import React from 'react'

//icon
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function StatusList() {
  const [fontsLoaded] = useFonts({
      'Satoshi-Bold': require('../../Assets/Fonts/Satoshi-Bold.otf'),
      'Satoshi-Regular': require('../../Assets/Fonts/Satoshi-Regular.otf'),
      'Satoshi-Medium': require('../../Assets/Fonts/Satoshi-Medium.otf'),
    });
    if (!fontsLoaded) return null;
  return (
    <View className='mt-32 flex-1'>
      <SafeAreaView className='w-[370px] h-96 rounded-xl justify-center items-center'>
       <View className='h-96 w-full justify-center items-center space-y-4 top-20'>
        <View className='justify-center items-center flex-row h-20 shadow-black shadow-md w-[95%] bottom-24 border border-gray-400 bg-white rounded-2xl'>
          <MaterialCommunityIcons name="stool-outline" size={40} color="black" className='right-16' />
          <View className='justify-center items-start right-14'>
            <Text className='text-xl font-satoshibold'>Title notifications</Text>
            <Text className='text-md font-satoshi-Regular'>Message: this is Description</Text>
            <TouchableOpacity className='absolute w-20 h-8 rounded-xl justify-center items-center left-64 top-2'>
              <Text className='text-md font-satoshi-Regular'>View</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className='justify-center items-center flex-row h-20 shadow-black shadow-md w-[95%] bottom-20 border border-gray-400 bg-white rounded-2xl'>
          <MaterialCommunityIcons name="stool-outline" size={40} color="black" className='right-16' />
          <View className='justify-center items-start right-14'>
            <Text className='text-xl font-satoshibold'>Title notifications</Text>
            <Text className='text-md font-satoshi-Regular'>Message: this is Description</Text>
            <TouchableOpacity className='absolute w-20 h-8 rounded-xl justify-center items-center left-64 top-2'>
              <Text className='text-md font-satoshi-Regular'>View</Text>
            </TouchableOpacity>
          </View>
        </View>
         <View className='justify-center items-center flex-row h-20 shadow-black shadow-md w-[95%] bottom-16 border border-gray-400 bg-white rounded-2xl'>
          <MaterialCommunityIcons name="stool-outline" size={40} color="black" className='right-16' />
          <View className='justify-center items-start right-14'>
            <Text className='text-xl font-satoshibold'>Title notifications</Text>
            <Text className='text-md font-satoshi-Regular'>Message: this is Description</Text>
            <TouchableOpacity className='absolute w-20 h-8 rounded-xl justify-center items-center left-64 top-2'>
              <Text className='text-md font-satoshi-Regular'>View</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className='justify-center items-center flex-row h-20 shadow-black shadow-md w-[95%] bottom-12 border border-gray-400 bg-white rounded-2xl'>
          <MaterialCommunityIcons name="stool-outline" size={40} color="black" className='right-16' />
          <View className='justify-center items-start right-14'>
            <Text className='text-xl font-satoshibold'>Title notifications</Text>
            <Text className='text-md font-satoshi-Regular'>Message: this is Description</Text>
            <TouchableOpacity className='absolute w-20 h-8 rounded-xl justify-center items-center left-64 top-2'>
              <Text className='text-md font-satoshi-Regular'>View</Text>
            </TouchableOpacity>
          </View>
        </View>
       </View>
      </SafeAreaView>
    </View>
  )
}