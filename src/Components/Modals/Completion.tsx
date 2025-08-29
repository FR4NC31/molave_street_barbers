import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React from 'react'

interface CompletionProps {
  visible: boolean;
  onClose: () => void;
}

export default function Completion({ visible, onClose }: CompletionProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 w-96 h-[40%]">
           <View className="border border-black h-[100%]">
              {/* Header */}
              <View className="flex-1 justify-between top-10 items-center">
                <Text className="text-3xl font-satoshibold">THANK YOU!</Text>
              </View>
              {/* Content */}
              <Text className="text-2xl ml-10 mr-10 font-satoshi text-black mb-14 text-center">
                Your booking has been submitted. You'll be notified once confirmed.
              </Text>
              
              {/* Action Button */}
              <TouchableOpacity 
                onPress={onClose}
                className="bg-black rounded-full w-60 py-4 left-12 bottom-10"
              >
                <Text className="text-white text-center font-satoshibold text-base">
                  Go to the Appointments
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  )
}
