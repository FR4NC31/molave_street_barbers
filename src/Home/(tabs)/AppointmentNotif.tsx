import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';
import React, { useState } from 'react'

//components
import NotificationList from '../../Components/Lists/NotificationList';
import StatusList from '../../Components/Lists/StatusList';

export default function AppointmentNotif() {
  const [fontsLoaded] = useFonts({
      'Satoshi-Bold': require('../../Assets/Fonts/Satoshi-Bold.otf'),
      'Satoshi-Regular': require('../../Assets/Fonts/Satoshi-Regular.otf'),
      'Satoshi-Medium': require('../../Assets/Fonts/Satoshi-Medium.otf'),
    });
    
    const [activeTab, setActiveTab] = useState('notifications');
    
    if (!fontsLoaded) return null;
    
    const renderActiveList = () => {
      switch (activeTab) {
        case 'notifications':
          return <NotificationList />;
        case 'status':
          return <StatusList />;
        default:
          return <NotificationList />;
      }
    };
    
  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-2xl font-satoshibold top-20'>Appointments</Text>
      <View className='flex-row justify-around bg-gray-300 w-[90%] h-16 rounded-xl items-center top-28'>
       <View >
       </View>
          <TouchableOpacity 
            className={`w-48 h-12 rounded-xl right-2 justify-center items-center ${
              activeTab === 'notifications' ? 'bg-white' : 'bg-gray-300'
            }`}
            onPress={() => setActiveTab('notifications')}
          >
            <Text className={`text-xl font-satoshibold ${activeTab === 'status' ? 'text-gray-500' : 'text-black'}`}>Notifications</Text>
          </TouchableOpacity>
         <TouchableOpacity 
           className={`w-48 h-12 rounded-xl right-1 justify-center items-center ${
             activeTab === 'status' ? 'bg-white' : 'bg-gray-300'
           }`}
           onPress={() => setActiveTab('status')}
         >
          <Text className={`text-xl font-satoshibold ${activeTab === 'status' ? 'text-black' : 'text-gray-500'}`}>Status</Text>
         </TouchableOpacity>
      </View>
      {renderActiveList()}
    </View>
  )
}
