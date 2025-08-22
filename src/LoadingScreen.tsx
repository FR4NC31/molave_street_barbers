import { View, Text, Animated } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './Types/navigation';
import { useAuth } from './Context/AuthContext' // Import AuthContext
import '../global.css';

// Update navigation prop type for both possible destinations
type LoadingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GetStarted' | 'Home'
>;

export default function LoadingScreen() {
  const [fontsLoaded] = useFonts({
    'Satoshi-Bold': require('./Assets/Fonts/Satoshi-Bold.otf'),
    'Satoshi-Regular': require('./Assets/Fonts/Satoshi-Regular.otf'),
    'Satoshi-Medium': require('./Assets/Fonts/Satoshi-Medium.otf'),
  });

  const navigation = useNavigation<LoadingScreenNavigationProp>();
  const { user, loading: authLoading } = useAuth(); // Get auth state
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (fontsLoaded && !authLoading) {
      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();

      // Navigate based on authentication status
      const timer = setTimeout(() => {
        if (user) {
          // User is authenticated, navigate to Home
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } else {
          // User is not authenticated, navigate to GetStarted
          navigation.reset({
            index: 0,
            routes: [{ name: 'GetStarted' }],
          });
        }
      }, 2500); // Reduced to 2.5 seconds for better UX

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, authLoading, user, fadeAnim, scaleAnim, navigation]);

  // Show nothing while waiting for fonts and auth check
  if (!fontsLoaded || authLoading) {
    return null;
  }

  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Animated.Text 
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }}
        className='text-5xl font-satoshibold text-black'
      >
        LOGO ANIMATED
      </Animated.Text>
      
      {/* Optional: Add a small loading indicator */}
      <Animated.View 
        style={{ opacity: fadeAnim }}
        className="mt-8"
      >
        <Text className="text-gray-600 font-satoshimedium">
          {user ? 'Welcome back!' : 'Getting things ready...'}
        </Text>
      </Animated.View>
    </View>
  );
}