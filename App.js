import React from 'react';
import Routes from "./src/Routes";
import { AuthProvider } from "./src/providers/AuthProvider";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { ToastProvider } from 'react-native-toast-notifications'

export default function App(){
  let [fontsLoaded] = useFonts({
    'Montserrat': require('./assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    'Montserrat-bold' : require('./assets/fonts/Montserrat/Montserrat-SemiBold.ttf')
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
          <ToastProvider>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </ToastProvider>
    );
  }

}

