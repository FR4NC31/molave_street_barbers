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

// 👉 Import the new ones
import UserNamePasswordScreen from './src/Auth/EmailRegister/options/UserPassScreen';
import ContactNumberScreen from './src/Auth/EmailRegister/options/ContactNumScreen';
import DisplayNameScreen from './src/Auth/EmailRegister/options/DisplayNameScreen';
import {EmailScreen} from './src/Auth/EmailRegister/options/EmailScreen';

// If using TypeScript, extend your root stack param list
type RootStackParamList = {
  LoadingScreen: undefined;
  GetStarted: undefined;
  LoginOptions: undefined;
  SignupOptions: undefined;
  EmailLogin: undefined;
  EmailRegOptions: undefined;
  UseNamePasswordScreen: undefined;
  ContactNumberScreen: undefined;
  DisplayNameScreen: undefined;
  EmailScreen: undefined;
  Home: undefined;
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

          {/* 👉 Add new screens here */}
          <Stack.Screen name="UseNamePasswordScreen" component={UserNamePasswordScreen} />
          <Stack.Screen name="ContactNumberScreen" component={ContactNumberScreen} />
          <Stack.Screen name="DisplayNameScreen" component={DisplayNameScreen} />
          <Stack.Screen name="EmailScreen" component={EmailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
