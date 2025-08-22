import React, { useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Types/navigation';
import { useFonts } from 'expo-font';
import { supabase } from '../../Lib/Supabase/client';

// Import separated screens
import { EmailScreen } from './options/EmailScreen';
import DisplayNameScreen from './options/DisplayNameScreen';
import UserNamePasswordScreen from './options/UserPassScreen';
import ContactNumberScreen from './options/ContactNumScreen';

type Screen = 'Email' | 'displayName' | 'userNamePassword' | 'contactNumber';

export default function EmailRegisterOptions() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [fontsLoaded] = useFonts({
    'Satoshi-Bold': require('../../Assets/Fonts/Satoshi-Bold.otf'),
    'Satoshi-Regular': require('../../Assets/Fonts/Satoshi-Regular.otf'),
    'Satoshi-Medium': require('../../Assets/Fonts/Satoshi-Medium.otf'),
  });

  const [currentScreen, setCurrentScreen] = useState<Screen>('Email');
  const [email, setEmail] = useState('');
  const [display_name, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contact_number, setContactNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const goBack = () => {
    if (currentScreen === 'displayName') setCurrentScreen('Email');
    else if (currentScreen === 'userNamePassword') setCurrentScreen('displayName');
    else if (currentScreen === 'contactNumber') setCurrentScreen('userNamePassword');
    else navigation.navigate('SignupOptions');
  };

  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username.toLowerCase())
        .single();

      return !data; // If no data found, username is available
    } catch (error) {
      console.error('Username check error:', error);
      return true; // Don't block on error
    }
  };

  const handleNext = async () => {
    if (currentScreen === 'Email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Please enter a valid email address');
        return;
      }
      setEmailError('');
      setCurrentScreen('displayName');
      
    } else if (currentScreen === 'displayName') {
      if (!display_name.trim()) {
        Alert.alert('Error', 'Please enter your display name');
        return;
      }
      if (display_name.length < 2) {
        Alert.alert('Error', 'Display name must be at least 2 characters');
        return;
      }
      setCurrentScreen('userNamePassword');
      
    } else if (currentScreen === 'userNamePassword') {
      if (!username.trim()) {
        Alert.alert('Error', 'Please enter a username');
        return;
      }
      if (username.length < 3) {
        Alert.alert('Error', 'Username must be at least 3 characters');
        return;
      }
      
      const isAvailable = await checkUsernameAvailability(username);
      if (!isAvailable) {
        Alert.alert('Error', 'Username is already taken. Please choose another one.');
        return;
      }
      
      if (!password || password.length < 6) {
        setPasswordError('Password must be at least 6 characters');
        return;
      }
      
      setPasswordError('');
      setCurrentScreen('contactNumber');
    }
  };

  const handleSubmit = async () => {
    if (!contact_number.trim()) {
      Alert.alert('Error', 'Please enter your contact number');
      return;
    }

    if (!isChecked) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    setLoading(true);
    
    try {
      // Create user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: {
          data: {
            display_name: display_name.trim(),
            username: username.trim(),
            contact_number: contact_number.trim()
          }
        }
      });

      if (error) {
        console.error('Registration error:', error);
        
        if (error.message?.includes('already registered')) {
          Alert.alert('Error', 'This email is already registered. Please try logging in.');
        } else if (error.message?.includes('password')) {
          Alert.alert('Error', 'Password must be at least 6 characters');
        } else if (error.message?.includes('username')) {
          Alert.alert('Error', 'Username is already taken');
        } else {
          Alert.alert('Registration Error', error.message || 'Registration failed. Please try again.');
        }
        return;
      }

      // Check if user was created successfully
      if (data.user?.identities?.length === 0) {
        Alert.alert('Email Exists', 'This email is already registered. Please check your email or try logging in.');
        return;
      }

      Alert.alert(
        'Success', 
        'Registration completed! Please check your email for verification.',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.navigate('GetStarted') 
          }
        ]
      );

    } catch (error: any) {
      console.error('Unexpected error:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const screens = {
    Email: (
      <EmailScreen
        email={email}
        setEmail={setEmail}
        handleNext={handleNext}
        goBack={goBack}
        loading={loading}
        error={emailError}
      />
    ),
    displayName: (
      <DisplayNameScreen
        displayName={display_name}
        setDisplayName={setDisplayName}
        handleNext={handleNext}
        goBack={goBack}
        loading={loading}
      />
    ),
    userNamePassword: (
      <UserNamePasswordScreen
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        toggleShowPassword={() => setShowPassword(!showPassword)}
        handleNext={handleNext}
        goBack={goBack}
        loading={loading}
        error={passwordError}
      />
    ),
    contactNumber: (
      <ContactNumberScreen
        contactNumber={contact_number}
        setContactNumber={setContactNumber}
        isChecked={isChecked}
        setChecked={setChecked}
        handleSubmit={handleSubmit}
        goBack={goBack}
        loading={loading}
      />
    ),
  };

  return screens[currentScreen];
}