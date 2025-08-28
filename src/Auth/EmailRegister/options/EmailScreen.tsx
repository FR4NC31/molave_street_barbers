// EmailScreen.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface EmailScreenProps {
  email: string;
  setEmail: (email: string) => void;
  handleNext: () => void;
  goBack: () => void;
  loading: boolean;
  error?: string;
}

export const EmailScreen = ({ 
  email, 
  setEmail, 
  handleNext, 
  goBack,
  loading,
  error 
}: EmailScreenProps) => {
  return (
    <View className="flex-1 px-5 pt-14">
      <TouchableOpacity onPress={goBack} className="w-8 mb-6">
        <AntDesign name="arrowleft" size={28} color="black" />
      </TouchableOpacity>
      
      <Text className="text-3xl font-satoshibold text-center mt-6">
        What's Your Email
      </Text>

      <View className="mt-12">
        <Text className="font-satoshibold text-base mb-2 text-gray-800">Email</Text>
        <TextInput
          className={`bg-gray-300 rounded-lg p-4 font-satoshibold border ${error ? 'border-red-500' : 'border-gray-200'}`}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!loading}
        />
        {error && (
          <Text className="text-red-500 font-satoshiregular text-sm mt-1">
            {error}
          </Text>
        )}
      </View>

      <TouchableOpacity 
        className={`bg-black rounded-3xl py-3 items-center justify-center mt-8 ${
          (!email || loading) ? 'opacity-50' : ''
        }`}
        onPress={handleNext}
        disabled={loading || !email}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-satoshibold text-base">Next</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};