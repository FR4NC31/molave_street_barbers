import { View, Text, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, TextInput, SafeAreaView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Types/navigation';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext'; // Use auth context instead of direct supabase

// Icons
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

type LoginOptionsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GetStarted' | 'EmailLogin' | 'LoginOptions' | 'Home'
>;

// Email validation function
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function EmailLogin() {
  const [fontsLoaded] = useFonts({
    'Satoshi-Bold': require('../../Assets/Fonts/Satoshi-Bold.otf'),
    'Satoshi-Regular': require('../../Assets/Fonts/Satoshi-Regular.otf'),
    'Satoshi-Medium': require('../../Assets/Fonts/Satoshi-Medium.otf'),
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation<LoginOptionsNavigationProp>();
  const { signIn, loading: authLoading } = useAuth(); // Use auth context

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const handleLogin = async () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validate inputs
    if (!email.trim()) {
      setEmailError('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Please enter your password');
      return;
    }

    try {
      if (__DEV__) {
        console.log('Attempting login with:', { email: email.trim() });
      }
      
      const result = await signIn(email, password);
      
      if (result.data) {
        Alert.alert(
          'Success',
          'Login successful!',
          [
            { 
              text: 'OK', 
              onPress: () => navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
            }
          ]
        );
      } else {
        // Handle specific error cases
        let errorMessage = result.error?.message || 'Login failed. Please check your credentials.';
        
        if (errorMessage.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (errorMessage.includes('Email not confirmed')) {
          errorMessage = 'Please verify your email before logging in.';
        } else if (errorMessage.includes('too many requests')) {
          errorMessage = 'Too many attempts. Please try again later.';
        }
        
        Alert.alert('Login Error', errorMessage);
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 mt-4 pt-10">
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          className="w-8"
          disabled={authLoading}
        >
          <AntDesign name="arrowleft" size={28} color="black" />
        </TouchableOpacity>
        
        <Text className="text-3xl font-satoshibold text-center mt-6">
          Welcome back!
        </Text>
      </View>

      {/* Form */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-5 mt-10"
      >
        <View className="mb-4">
          <Text className="font-satoshibold text-base mb-2">Email</Text>
          <TextInput
            className={`bg-gray-100 rounded-lg p-4 font-satoshiregular ${emailError ? 'border border-red-500' : ''}`}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!authLoading}
          />
          {emailError && <Text className="text-red-500 text-sm mt-1">{emailError}</Text>}
        </View>

        <View className="mb-6">
          <Text className="font-satoshibold text-base mb-2">Password</Text>
          <View className="relative">
            <TextInput
              className={`bg-gray-100 rounded-lg p-4 font-satoshiregular pr-12 ${passwordError ? 'border border-red-500' : ''}`}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!authLoading}
            />
            <TouchableOpacity 
              className="absolute right-3 top-4"
              onPress={() => setShowPassword(!showPassword)}
              disabled={authLoading}
            >
              <Entypo 
                name={showPassword ? 'eye-with-line' : 'eye'} 
                size={20} 
                color="#6B7280" 
              />
            </TouchableOpacity>
          </View>
          {passwordError && <Text className="text-red-500 text-sm mt-1">{passwordError}</Text>}
        </View>

        <TouchableOpacity className="items-end mb-8" disabled={authLoading}>
          <Text className="font-satoshibold text-black">Forgot your Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className={`rounded-3xl py-4 items-center justify-center ${
            authLoading || !email || !password ? 'bg-gray-400' : 'bg-black'
          }`}
          onPress={handleLogin}
          disabled={authLoading || !email || !password}
        >
          {authLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-satoshibold text-base">Log in</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="font-satoshibold text-gray-600">Don't have an account? </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('SignupOptions')}
            disabled={authLoading}
          >
            <Text className="font-satoshibold text-black">Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}