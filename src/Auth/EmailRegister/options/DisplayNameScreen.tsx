import React from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, SafeAreaView, Platform, ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface Props {
  displayName: string;
  setDisplayName: (text: string) => void;
  handleNext: () => void;
  goBack: () => void;
  loading: boolean;
  error?: string;
}

export default function DisplayNameScreen({ 
  displayName, 
  setDisplayName, 
  handleNext, 
  goBack, 
  loading,
  error 
}: Props) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <View className="px-5 pt-10">
          <TouchableOpacity onPress={goBack} className="w-8 mb-6">
            <AntDesign name="arrowleft" size={28} color="black" />
          </TouchableOpacity>

          <Text className="text-3xl font-satoshibold text-center mt-6">What's Your Name</Text>

          <View className="mt-12">
            <Text className="font-satoshibold text-base mb-2 text-gray-800">Display Name</Text>
            <TextInput
              className={`bg-gray-100 rounded-lg p-4 font-satoshibold border ${error ? 'border-red-500' : 'border-gray-200'}`}
              placeholder="Enter your name"
              placeholderTextColor="#6b7280"
              value={displayName}
              onChangeText={setDisplayName}
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={handleNext}
              editable={!loading}
            />
            {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
          </View>

          <Text className="mt-2 font-satoshibold text-sm text-gray-800">This is the name that will appear on your profile.</Text>

          <TouchableOpacity 
            className="bg-black rounded-3xl py-3 items-center justify-center mt-8" 
            onPress={handleNext}
            disabled={loading || !displayName.trim()}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-satoshibold text-base">Next</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
