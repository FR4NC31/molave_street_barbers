import { View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/navigation';
import { useFonts } from 'expo-font';
import React from 'react';

// Icons
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// Define the specific navigation prop for this screen
type LoginOptionsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GetStarted' | 'EmailLogin' | 'SignupOptions'
>;

export default function LoginOptions() {

  // Font Loader
  const [fontsLoaded] = useFonts({
    'Satoshi-Bold': require('../Assets/Fonts/Satoshi-Bold.otf'),
    'Satoshi-Regular': require('../Assets/Fonts/Satoshi-Regular.otf'),
    'Satoshi-Medium': require('../Assets/Fonts/Satoshi-Medium.otf'),
  });

  const navigation = useNavigation<LoginOptionsNavigationProp>();

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* Back button */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('GetStarted')} 
        className="mt-14 ml-5"
      >
        <AntDesign name="arrowleft" size={28} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-3xl font-satoshibold text-center mt-10">
        Log in to StreetCut
      </Text>

      {/* Login options */}
      <View className="mt-28 flex-2 items-center justify-center">
        {/* Email login button */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('EmailLogin')} 
          className="bg-black w-4/5 rounded-3xl flex-row items-center justify-center py-3"
        >
          <AntDesign name="mail" size={24} color="white" style={{ right: 65 }} />
          <Text className="text-white text-center font-satoshibold">
            Continue with Email
          </Text>
        </TouchableOpacity>

        {/* Facebook login button */}
        <TouchableOpacity 
          className="bg-white border-2 flex-row items-center justify-center border-black mt-4 w-4/5 rounded-3xl py-3"
        >
          <FontAwesome5 name="facebook" size={20} color="blue" style={{ right: 50 }} />
          <Text className="text-black text-center font-satoshibold">
            Continue with Facebook
          </Text>
        </TouchableOpacity>

        {/* Google login button */}
        <TouchableOpacity 
          className="bg-white border-2 border-black mt-4 w-4/5 flex-row items-center justify-center rounded-3xl py-3"
        >
          <Image 
            source={require('../Assets/googleLogo.png')} 
            className="w-6 h-6" 
            style={{ right: 58 }} 
          />
          <Text className="text-black text-center font-satoshibold">
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Sign up prompt */}
        <View className="flex-row justify-center items-center mt-5">
          <Text className="text-gray-500 font-satoshibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupOptions')}>
            <Text className="text-black font-satoshibold ml-1">
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}