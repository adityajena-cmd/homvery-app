import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import SplashScreenComponent from '../screens/PreAuth/SplashScreenComponent';
import LoginScreen from '../screens/PreAuth/Login';
import OTPVerify from '../screens/PreAuth/OTPVerify';
import OnBoarding from '../screens/PreAuth/OnBoarding';


const Stack = createStackNavigator();


const AppNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreenComponent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OTPVerify"
        component={OTPVerify}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
};

export default AppNavigator;
