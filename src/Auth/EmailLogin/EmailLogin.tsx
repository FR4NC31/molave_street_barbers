import { View, Text, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, TextInput, Platform, Alert } from 'react-native';
import StatusBarWrapper from '../../Components/StatusBarWrapper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Types/navigation';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import NetInfo from '@react-native-community/netinfo';

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

type LoginStatus = 'idle' | 'loading' | 'success' | 'error';

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
  const [loginStatus, setLoginStatus] = useState<LoginStatus>('idle');
  const [networkError, setNetworkError] = useState('');
  
  const navigation = useNavigation<LoginOptionsNavigationProp>();
  const { signIn, loading: authLoading } = useAuth();

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const handleLogin = async () => {
    setLoginStatus('loading');
    setNetworkError('');
    
    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validate inputs
    if (!email.trim()) {
      setEmailError('Please enter your email');
      setLoginStatus('idle');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      setLoginStatus('idle');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Please enter your password');
      setLoginStatus('idle');
      return;
    }

    // Check network connectivity
    const networkState = await NetInfo.fetch();
    if (!networkState.isConnected) {
      setNetworkError('No internet connection. Please check your network and try again.');
      setLoginStatus('error');
      setTimeout(() => {
        setLoginStatus('idle');
      }, 3000);
      return;
    }

    try {
      if (__DEV__) {
        console.log('Attempting login with:', { email: email.trim() });
      }
      
      const result = await signIn(email, password);
      
      if (result.data) {
        setLoginStatus('success');
        
        // Navigate to home after a short delay to show success icon
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }, 1500);
      } else {
        // Handle specific error messages from signIn
        if (result.error && result.error.message) {
          if (result.error.message.includes('Invalid login credentials')) {
            setNetworkError('Invalid email or password. Please try again.');
          } else if (result.error.message.includes('Email not confirmed')) {
            setNetworkError('Please verify your email before logging in.');
          } else if (result.error.message.includes('Network Error') || 
                     result.error.message.includes('Network request failed')) {
            setNetworkError('Network error. Please check your internet connection and try again.');
          } else {
            setNetworkError(result.error.message);
          }
        } else {
          setNetworkError('Login failed. Please try again.');
        }
        setLoginStatus('error');
        
        // Reset error status after 3 seconds
        setTimeout(() => {
          setLoginStatus('idle');
        }, 3000);
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      
      // Handle network errors specifically
      if (error.message && (error.message.includes('Network Error') || 
                            error.message.includes('Network request failed'))) {
        setNetworkError('Network error. Please check your internet connection and try again.');
      } else {
        setNetworkError('Login failed. Please try again.');
      }
      
      setLoginStatus('error');
      
      // Reset error status after 3 seconds
      setTimeout(() => {
        setLoginStatus('idle');
      }, 3000);
    }
  };

  const getButtonStyle = () => {
    switch (loginStatus) {
      case 'loading':
        return 'bg-gray-400';
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return !email || !password ? 'bg-gray-400' : 'bg-black';
    }
  };

  return (
    <StatusBarWrapper className="flex-1">
      {/* Header */}
      <View className="px-5 pt-8">
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          className="w-8"
          disabled={authLoading || loginStatus === 'loading'}
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
            className={`bg-gray-300 rounded-lg p-4 font-satoshiregular ${emailError ? 'border border-red-500' : ''}`}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!authLoading && loginStatus !== 'loading'}
          />
          {emailError && <Text className="text-red-500 text-sm mt-1">{emailError}</Text>}
        </View>

        <View className="mb-6">
          <Text className="font-satoshibold text-base mb-2">Password</Text>
          <View className="relative">
            <TextInput
              className={`bg-gray-300 rounded-lg p-4 font-satoshiregular pr-12 ${passwordError ? 'border border-red-500' : ''}`}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!authLoading && loginStatus !== 'loading'}
            />
            <TouchableOpacity 
              className="absolute right-3 top-4"
              onPress={() => setShowPassword(!showPassword)}
              disabled={authLoading || loginStatus === 'loading'}
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

        {/* Network Error Message */}
        {networkError ? (
          <View className="mb-4 p-3 bg-red-100 rounded-lg">
            <Text className="text-red-700 text-sm text-center">{networkError}</Text>
          </View>
        ) : null}

        <TouchableOpacity 
          className="items-end mb-8" 
          disabled={authLoading || loginStatus === 'loading'}
        >
          <Text className="font-satoshibold text-black">Forgot your Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className={`rounded-3xl py-4 items-center justify-center ${getButtonStyle()}`}
          onPress={handleLogin}
          disabled={authLoading || loginStatus === 'loading' || loginStatus === 'success' || !email || !password}
        >
          {loginStatus === 'loading' ? (
            <ActivityIndicator color="white" />
          ) : loginStatus === 'success' ? (
            <AntDesign name="check" size={24} color="white" />
          ) : loginStatus === 'error' ? (
            <AntDesign name="close" size={24} color="white" />
          ) : (
            <Text className="text-white font-satoshibold text-base">Log in</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="font-satoshibold text-gray-600">Don't have an account? </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('SignupOptions')}
            disabled={authLoading || loginStatus === 'loading'}
          >
            <Text className="font-satoshibold text-black">Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </StatusBarWrapper>
  );
}
