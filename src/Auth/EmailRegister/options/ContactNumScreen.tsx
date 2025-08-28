import React from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, SafeAreaView, Platform, ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';

interface Props {
  contactNumber: string;
  setContactNumber: (text: string) => void;
  isChecked: boolean;
  setChecked: (value: boolean) => void;
  handleSubmit: () => void;
  goBack: () => void;
  loading: boolean;
}

export default function ContactNumberScreen({
  contactNumber,
  setContactNumber,
  isChecked,
  setChecked,
  handleSubmit,
  goBack,
  loading,
}: Props) {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="px-5 pt-14">
          <TouchableOpacity onPress={goBack} className="w-8 mb-6">
            <AntDesign name="arrowleft" size={28} color="black" />
          </TouchableOpacity>

          <Text className="text-3xl font-satoshibold text-center mt-6">
            Let's finish up!
          </Text>

          {/* Contact Number */}
          <View className="mt-12">
            <Text className="font-satoshibold text-base mb-2 text-gray-800">
              Contact Number
            </Text>
            <TextInput
              className="bg-gray-300 rounded-lg p-4 font-satoshibold border border-gray-200"
              placeholder="Enter your phone number"
              placeholderTextColor="#6b7280"
              value={contactNumber}
              onChangeText={setContactNumber}
              autoCapitalize="none"
              keyboardType="phone-pad"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              editable={!loading}
            />
          </View>

          {/* Checkbox + Terms */}
          <View className="mt-6 flex-row items-start">
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? '#000' : undefined}
              className="mt-1 mr-2"
              disabled={loading}
            />
            <View className="flex-1">
              <View className="flex-row flex-wrap">
                <Text className="font-satoshibold text-sm text-gray-800">
                  Molave Street Barbers may send me personalized emails regarding products and services. (Optional)
                </Text>
              </View>

              <View className="flex-row flex-wrap mt-2">
                <Text className="font-satoshibold text-sm text-gray-800">
                  By clicking Create Account, you agree to the{' '}
                </Text>
                <TouchableOpacity>
                  <Text className="font-satoshibold text-sm text-black">
                    Terms of Service
                  </Text>
                </TouchableOpacity>
                <Text className="font-satoshibold text-sm text-gray-800">
                  {' '}and{' '}
                </Text>
                <TouchableOpacity>
                  <Text className="font-satoshibold text-sm text-black">
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
                <Text className="font-satoshibold text-sm text-gray-800">
                  {' '}of Molave Street's Barbers.
                </Text>
              </View>
            </View>
          </View>

          {/* Create Account Button */}
          <TouchableOpacity
            className="bg-black rounded-3xl py-3 items-center justify-center mt-8"
            onPress={handleSubmit}
            activeOpacity={0.8}
            disabled={loading || !contactNumber.trim() || !isChecked}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-satoshibold text-base">
                Create Account
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}