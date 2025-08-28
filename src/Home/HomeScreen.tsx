import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';

//component
import TabScreen from '../Components/BottomTab'
import StatusBarWrapper from '../Components/StatusBarWrapper'
import Carousel from '../Components/Carousel';

export default function HomeScreen() {
   const [fontsLoaded] = useFonts({
      'Satoshi-Bold': require('../Assets/Fonts/Satoshi-Bold.otf'),
      'Satoshi-Regular': require('../Assets/Fonts/Satoshi-Regular.otf'),
      'Satoshi-Medium': require('../Assets/Fonts/Satoshi-Medium.otf'),
    });
    if (!fontsLoaded) return null;

  return (
    <StatusBarWrapper>
      <View className='flex-1'>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            className='flex-1'
          >
          {/* Header with logo */}
          <View className='flex-row bg-black w-14 h-14 justify-center items-center rounded-full mx-5 mt-10'>
            <Text className='text-2xl font-satoshibold text-white'>F</Text>
          </View>
          
          {/* Main content */}
          <View className='flex-1 justify-center items-center px-5 mt-4'>
            <Text className='text-2xl right-16 top-5 font-satoshibold text-center mb-8'>
              Get started with StreetCut
            </Text>
            
            <View className='justify-center items-center w-full'>
              <ImageBackground 
                source={require('../Assets/meme.png')} 
                className='w-full aspect-square max-w-[380px] max-h-[370px] rounded-3xl justify-center items-center'
                resizeMode='cover'
                imageStyle={{ borderRadius: 16 }}
              >
                <TouchableOpacity className='absolute bottom-10 bg-black rounded-3xl w-40 h-12 justify-center items-center'>
                  <Text className='text-white text-lg font-satoshibold'>Book Now</Text>
                </TouchableOpacity>
              </ImageBackground>
              
              {/* Adjusted black box */}
              <View className='h-[450px] w-screen bg-black mt-10' />
            </View>
          </View>
          
          {/* Carousel component with temporary images */}
          <Text className='text-2xl font-satoshibold text-center top-12 right-[135px]'>Our Works</Text>
          <Carousel 
            images={[ 
            require('../Assets/temp1.png'), 
            require('../Assets/temp2.png'), 
            require('../Assets/temp3.png'), 
            require('../Assets/temp4.png'), 
            require('../Assets/temp5.png'), 
          ]} 
          />
          {/* <View className='h-[75px] w-screen'/> */}
        </ScrollView>
        {/* Fixed Bottom Tab */}
        <View className='absolute -bottom-6 left-0 right-0'>
          <TabScreen />
        </View>
      </View>
    </StatusBarWrapper>
  )
}
