import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { AuthProvider } from './src/Context/AuthContext';

enableScreens(true);

// Import screens
import LoadingScreen from './src/LoadingScreen';
import GetStarted from './src/GetStarted';
import LoginOptions from './src/Auth/LoginOptions';
import SignupOptions from './src/Auth/SignupOptions';
import EmailLogin from './src/Auth/EmailLogin/EmailLogin';
import EmailRegOptions from './src/Auth/EmailRegister/EmailRegOptions';
import Home from './src/Home/HomeScreen'
import Appointment from './src/Home/Appointments/AppointmentPage'

// If using TypeScript, extend your root stack param list
type RootStackParamList = {
  LoadingScreen: undefined;
  GetStarted: undefined;
  LoginOptions: undefined;
  SignupOptions: undefined;
  EmailLogin: undefined;
  EmailRegOptions: undefined;
  Home: undefined;
  Appointment: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Common screen options
const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="LoadingScreen"
          screenOptions={screenOptions}
        >
          <Stack.Screen 
            name="LoadingScreen" 
            component={LoadingScreen} 
            options={{ animation: 'none' }}
          />
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="LoginOptions" component={LoginOptions} />
          <Stack.Screen name="SignupOptions" component={SignupOptions} />
          <Stack.Screen name="EmailLogin" component={EmailLogin} />
          <Stack.Screen name="EmailRegOptions" component={EmailRegOptions} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Appointment" component={Appointment} />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
