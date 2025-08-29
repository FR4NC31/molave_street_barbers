import React, { useState, useEffect } from 'react';
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
  const [formatError, setFormatError] = useState('');

  const formatPhoneNumber = (input: string) => {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limitedDigits = digits.slice(0, 10);
    
    // Format as XXX-XXX-XXXX
    let formatted = '';
    if (limitedDigits.length > 0) {
      formatted = limitedDigits;
      if (limitedDigits.length > 3) {
        formatted = `${limitedDigits.slice(0, 3)}-${limitedDigits.slice(3)}`;
      }
      if (limitedDigits.length > 6) {
        formatted = `${limitedDigits.slice(0, 3)}-${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6)}`;
      }
    }
    
    return formatted;
  };

  const handlePhoneNumberChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setContactNumber(formatted);
    
    // Validate format
    const digits = text.replace(/\D/g, '');
    if (digits.length > 0 && digits.length !== 10) {
      setFormatError('Phone number must be 10 digits');
    } else {
      setFormatError('');
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="px-5 pt-14 ">
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
            <View className="flex-row items-center">
              <View className="bg-gray-300 rounded-l-lg p-4 font-satoshibold border border-gray-200 border-r-0">
                <Text className="text-gray-800">+63</Text>
              </View>
              <TextInput
                className="flex-1 bg-gray-300 rounded-r-lg p-4 font-satoshibold border border-gray-200"
                placeholder="XXX-XXX-XXXX"
                placeholderTextColor="#6b7280"
                value={contactNumber}
                onChangeText={handlePhoneNumberChange}
                autoCapitalize="none"
                keyboardType="phone-pad"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                editable={!loading}
              />
            </View>
            <Text className="font-satoshiregular text-xs text-gray-600 mt-1">
              Format: +63 followed by your 10-digit mobile number
            </Text>
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