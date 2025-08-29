import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
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
  Appointment: undefined;
  AppointmentNotif: undefined;
};


export type LoadingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LoadingScreen'
>;
