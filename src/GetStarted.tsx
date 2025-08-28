import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './Types/navigation';
import '../global.css';
import StatusBarWrapper from './Components/StatusBarWrapper';

type GetStartedNavigationProp = NativeStackNavigationProp<
RootStackParamList,
'LoginOptions' | 'SignupOptions'
>;

export default function GetStarted() {
  // Font Loader
  const [fontsLoaded] = useFonts({
    'Satoshi-Bold': require('./Assets/Fonts/Satoshi-Bold.otf'),
    'Satoshi-Regular': require('./Assets/Fonts/Satoshi-Regular.otf'),
    'Satoshi-Medium': require('./Assets/Fonts/Satoshi-Medium.otf'),
  });
  if (!fontsLoaded) return null;
  
  const navigation = useNavigation<GetStartedNavigationProp>();
  
  return (
    <StatusBarWrapper>
      <View className='flex-1 items-center justify-center'>
        <Image className='text-5xl font-satoshibold text-black'
          source={require('./Assets/slipper-slipper-slap.gif')}
          resizeMode="contain"/>
        <View className='absolute bottom-20 mt-200'>
          {/* Sign up button */}
          <TouchableOpacity onPress={() => navigation.navigate('SignupOptions')} className='bg-black px-40 rounded-3xl py-3'>
            <Text className='text-white text-center font-satoshibold'>Sign up</Text>
          </TouchableOpacity>
          {/* Log in button */}
          <TouchableOpacity onPress={() => navigation.navigate('LoginOptions')} className='bg-white border-2 border-black mt-4 px-40 rounded-3xl py-3'>
            <Text className='text-black text-center font-satoshibold'>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </StatusBarWrapper>
  );
}
