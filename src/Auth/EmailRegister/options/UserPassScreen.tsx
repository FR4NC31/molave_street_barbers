// UserPassScreen.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

interface UserNamePasswordScreenProps {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  handleNext: () => void; // Make sure this prop is included
  goBack: () => void;
  loading: boolean;
  error?: string;
}

export default function UserNamePasswordScreen({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  toggleShowPassword,
  handleNext, // This should be passed to the button
  goBack,
  loading,
  error
}: UserNamePasswordScreenProps) {
  return (
    <View className="flex-1 bg-white px-5 pt-10">
      <TouchableOpacity onPress={goBack} className="w-8 mb-6">
        <AntDesign name="arrowleft" size={28} color="black" />
      </TouchableOpacity>
      
      <Text className="text-3xl font-satoshibold text-center mt-6">
        Create Account
      </Text>

      <View className="mt-12">
        {/* Username Input */}
        <Text className="font-satoshibold text-base mb-2 text-gray-800">Username</Text>
        <TextInput
          className="bg-gray-100 rounded-lg p-4 font-satoshibold border border-gray-200"
          placeholder="Choose a username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          editable={!loading}
        />

        {/* Password Input */}
        <Text className="font-satoshibold text-base mb-2 text-gray-800 mt-6">Password</Text>
        <View className="relative">
          <TextInput
            className={`bg-gray-100 rounded-lg p-4 font-satoshibold border ${error ? 'border-red-500' : 'border-gray-200'}`}
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!loading}
          />
          <TouchableOpacity 
            onPress={toggleShowPassword}
            className="absolute right-3 top-4"
          >
            <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="gray" />
          </TouchableOpacity>
        </View>
        
        {error && (
          <Text className="text-red-500 font-satoshiregular text-sm mt-1">
            {error}
          </Text>
        )}
      </View>

      {/* Next Button - This should call handleNext */}
      <TouchableOpacity 
        className={`bg-black rounded-xl py-4 items-center justify-center mt-8 ${
          (!username || !password || loading) ? 'opacity-50' : ''
        }`}
        onPress={handleNext} // This should call the handleNext function
        disabled={loading || !username || !password}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-satoshibold text-base">Next</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}