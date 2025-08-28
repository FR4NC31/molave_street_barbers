import React from 'react';
import { View, Text } from 'react-native';

interface AppointmentNotifProps {
  title: string;
  message: string;
}

const AppointmentNotif: React.FC<AppointmentNotifProps> = ({ title, message }) => {
  return (
    <View className=' p-4 rounded-lg shadow-md mb-2'>
      <Text className='text-lg font-bold'>{title}</Text>
      <Text className='text-gray-600'>{message}</Text>
    </View>
  );
};

export default AppointmentNotif;
