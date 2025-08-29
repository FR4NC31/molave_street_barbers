import { View, Text, TouchableOpacity, Image, Pressable, TextInput, Platform, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { useFonts } from 'expo-font'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Types/navigation';

//components
import TabScreen from '../../Components/BottomTab'
import StatusBarWrapper from '../../Components/StatusBarWrapper'
import BarbersData from '../../Components/Dropdowns/BarbersData'
import ServicesData from '../../Components/Dropdowns/ServicesData'
import Completion from '../../Components/Modals/Completion';
import NoteAlert from '../../Components/Modals/NoteAlert';

//icons
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

type AppointmentPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function AppointmentPage() {
  const navigation = useNavigation<AppointmentPageNavigationProp>();
  
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showNoteAlert, setShowNoteAlert] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }

  const onChange = ({ type }: { type: string }, selectedDate: Date | undefined) => {
    if (type === "set") {
      const currentDate = selectedDate || date
      setDate(currentDate);
      if (Platform.OS === 'android') {
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  }

  const [fontsLoaded] = useFonts({
    'Satoshi-Bold': require('../../Assets/Fonts/Satoshi-Bold.otf'),
    'Satoshi-Regular': require('../../Assets/Fonts/Satoshi-Regular.otf'),
    'Satoshi-Medium': require('../../Assets/Fonts/Satoshi-Medium.otf'),
  });
  if (!fontsLoaded) return null;

  const handleTabPress = (tab: string) => {
    // Handle tab press logic here
    console.log(`Tab pressed: ${tab}`);
  };

  const handlePaymentPress = () => {
    setShowCompletion(true);
  };

  const handleCloseNoteAlert = () => {
    setShowNoteAlert(false);
  };

  const handleCloseCompletion = () => {
    setShowCompletion(false);
    navigation.navigate('Home');
    // The AppointmentNotif component will be shown when the Appointments tab is active
  };

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  return (
     <StatusBarWrapper>
      <View className='flex-1'>
        <ScrollView showsVerticalScrollIndicator={false} className='flex-1'>
          <View className='flex-row items-center top-5 space-x-4 px-4 py-3'>
            <TouchableOpacity className='p-2' onPress={handleBackPress}>
              <AntDesign name="arrowleft" size={28} color="black" />
            </TouchableOpacity>
            <Text className='text-xl left-[60px] font-satoshibold'>Book an appointment</Text>
          </View>
          <View className='flex-row justify-center items-center mt-10'>
            <Image source={require('../../Assets/tempID.jpg')} className='w-36 h-36'/>
            <View className='ml-6 gap-2'>
              <Text className='text-lg font-satoshi'>Name:
                <Text className='text-shatoshibold'> John Doe</Text>
              </Text>
              <Text className='text-lg font-satoshi'>
                Expertise: <Text className='text-shatoshibold'>Haircut</Text>
              </Text>
              <Text className='text-lg font-satoshi'>
                Rest Day: <Text className='text-shatoshibold'>Tuesday</Text>
              </Text>
            </View>
          </View>
          <View className='mt-10 px-4 space-y-6 pb-20'>
            <Text className='text-xl mb-2 font-satoshibold'>Choose a barber</Text>
            <BarbersData />
            <Text className='text-xl mt-8 mb-2 font-satoshibold'>Choose a service</Text>
            <ServicesData />
            <Text className='text-xl mt-8 mb-2 font-satoshibold'>Choose a date</Text>

            {showPicker && (
              <DateTimePicker
                mode='date'
                value={date}
                display='default'
                onChange={onChange}
                />
            )}
            <Pressable onPress={toggleDatePicker} >
              <TextInput 
                pointerEvents="none"
                className='bg-white border border-gray-300 text-lg font-satoshibold rounded-lg px-4 h-14'
                placeholder='Select date'
                placeholderTextColor="#9CA3AF"
                value={date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'numeric', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
                editable={false}
              />
            </Pressable>
            <View className='flex-row items-center'>
              <Text className='text-xl mt-8 mb-2 font-satoshibold'>Choose a time</Text>
              <Pressable className=' ml-2 mt-7'>
                  <Feather name="info" size={15} color="black" />
              </Pressable>
            </View>
            <View className="flex-row flex-wrap justify-between mt-2">
              {[
                '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
                '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
                '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
              ].map((time) => (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  className={`w-36 h-14 mb-4 rounded-lg border items-center justify-center border-gray-300 ${
                    selectedTime === time ? 'bg-black' : 'bg-white'
                  }`}
                >
                  <Text className={`text-sm font-satoshibold ${selectedTime === time ? 'text-white' : 'text-black'}`}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View className='px-4 space-y-2 mb-32'>
            <Text className='text-xl bottom-20 font-satoshibold'>Enter your name</Text>
            <TextInput 
              className='bg-white border border-gray-300 text-lg bottom-16 font-satoshibold rounded-lg px-4 h-14'
              placeholder='Full Name'
              />
          </View>
          <View className='px-4 bottom-36 w-screen h-48 bg-black'>
              <View className='flex-row justify-between mt-6'>
                <Text className='text-xl font-satoshi text-white'>SubTotal</Text>
                <Text className='text-xl font-satoshi text-white'>Null</Text>
              </View>
               <View className='flex-row justify-between mt-6'>
                <Text className='text-xl font-satoshi text-white'>Appointment Fee
                  <Pressable>
                    <Feather name="info" size={15} color="white" className='ml-1 top-1'/>
                  </Pressable>
                </Text>
                <Text className='text-xl font-satoshi text-white'>Null</Text>
              </View>
               <View className='flex-row justify-between top-12'>
                <Text className='text-xl font-satoshi text-white'>Total</Text>
                <Text className='text-xl font-satoshibold text-white'>Null</Text>
              </View>
          </View >
          <View className='px-4 bottom-28 space-y-4 justify-center'>
            <Text className='text-md font-satoshibold'>Payment Method
              <Pressable className='top-5'>
                <Feather name="info" size={15} color="black" className='ml-1 top-1'/>
              </Pressable>
            </Text>
            <View>
              <TouchableOpacity 
                onPress={handlePaymentPress}
                className='flex-row items-center justify-center space-x-3 bg-blue-500 rounded-full h-14 mt-4'
              >
                <Text className='text-lg font-satoshibold text-white'>Pay with Gcash</Text>
              </TouchableOpacity>
               <TouchableOpacity 
                onPress={handlePaymentPress}
                className='flex-row items-center justify-center space-x-3 bg-green-500 rounded-full h-14 mt-4'
              >
                <Text className='text-lg font-satoshibold text-white'>Pay with Maya</Text>
              </TouchableOpacity>
               <TouchableOpacity 
                onPress={handlePaymentPress}
                className='flex-row items-center justify-center space-x-3 bg-black rounded-full h-14 mt-4'
              >
                <Text className='text-lg font-satoshibold text-white'>Pay in Person</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {/* Fixed Bottom Tab */}
        <View className='absolute -bottom-6 left-0 right-0'>
          <TabScreen activeTab='Home' onTabPress={handleTabPress} />
        </View>
      </View>

      {/* Modals */}
      <NoteAlert 
        visible={showNoteAlert} 
        onClose={handleCloseNoteAlert} 
      />
      <Completion 
        visible={showCompletion} 
        onClose={handleCloseCompletion} 
      />
    </StatusBarWrapper>
  )
}
