import { View, Text, TouchableOpacity, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Types/navigation';
import React from 'react';

// Icons
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// Define the specific navigation prop for this screen
type SignupOptionsNavigationProp = NativeStackNavigationProp<
RootStackParamList,
'GetStarted' | 'LoginOptions' | 'EmailRegOptions'
>;

export default function SignupOptions() {

  const [fontsLoaded] = useFonts({
    'Satoshi-Bold': require('../Assets/Fonts/Satoshi-Bold.otf'),
    'Satoshi-Regular': require('../Assets/Fonts/Satoshi-Regular.otf'),
    'Satoshi-Medium': require('../Assets/Fonts/Satoshi-Medium.otf'),
  });

  const navigation = useNavigation<SignupOptionsNavigationProp>();

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <TouchableOpacity onPress={() => navigation.navigate('GetStarted')} className="mt-14 ml-5">
        <AntDesign name="arrowleft" size={28} color="black" />
      </TouchableOpacity>
      <Text className="text-3xl font-satoshibold text-center mt-10">Sign up to StreetCut</Text>
      <View className="mt-28 flex-2 items-center justify-center">
        <TouchableOpacity onPress={() => navigation.navigate('EmailRegOptions')} className="bg-black w-4/5 rounded-3xl flex-row items-center justify-center py-3">
          <AntDesign name="mail" size={24} color="white" style={{ right: 65 }} />
          <Text className="text-white text-center font-satoshibold">Sign up with Email</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white border-2 flex-row items-center justify-center border-black mt-4 w-4/5 rounded-3xl py-3">
          <FontAwesome5 name="facebook" size={20} color="blue" style={{ right: 50 }} />
          <Text className="text-black text-center font-satoshibold">Sign up with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white border-2 border-black mt-4 w-4/5 flex-row items-center justify-center rounded-3xl py-3">
          <Image source={require('../Assets/googleLogo.png')} className="w-6 h-6" style={{ right: 58 }} />
          <Text className="text-black text-center font-satoshibold">Sign up with Google</Text>
        </TouchableOpacity>
        <View className="flex-row justify-center items-center mt-5">
          <Text className="text-gray-500 font-satoshibold">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginOptions')}>
            <Text className="text-black font-satoshibold ml-1">Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </View>
  );
}