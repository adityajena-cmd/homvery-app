import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';

import SplashScreenComponent from '../screens/PreAuth/SplashScreenComponent';
import LoginScreen from '../screens/PreAuth/Login';
import OTPVerify from '../screens/PreAuth/OTPVerify';
import OnBoarding from '../screens/PreAuth/OnBoarding';

import SearchCity from '../screens/PostAuth/Home/SearchCity';
import Service from '../screens/PostAuth/Service/Service';
import HomePage from '../screens/PostAuth/Home/HomePage';
import ServiceBooking from '../screens/PostAuth/ServiceBooking/ServiceBooking';
import MapPage from '../screens/PostAuth/ServiceBooking/MapPage';
import AddressEditPage from '../screens/PostAuth/ServiceBooking/AddressEditPage';
import ConfirmBooking from '../screens/PostAuth/ServiceBooking/ConfirmBook';
import BookingsList from '../screens/PostAuth/Bookings/BookingsList';
import ServiceCompleted from '../screens/PostAuth/Bookings/ServiceCompleted';
import ServiceOngoing from '../screens/PostAuth/Bookings/ServiceOngoing';
import ServiceUpcoming from '../screens/PostAuth/Bookings/ServiceUpcoming';
import CouponCode from '../screens/PostAuth/Bookings/CouponCode';
import Review from '../screens/PostAuth/Bookings/Review';
import Profile from '../screens/PostAuth/Profile/Profile';
import AddressPage from '../screens/PostAuth/Profile/AddressPage';
import Reward from '../screens/PostAuth/Reward/Reward';
import ContactUs from '../screens/PostAuth/Profile/ContactUs';
import AboutUs from '../screens/PostAuth/Profile/AboutUs';
import PersonalDetails from '../screens/PostAuth/Profile/PersonalDetails';
import Dispute from '../screens/PostAuth/Bookings/Dispute';

const Stack = createStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();

function Bottomtabs() {
  
  return (
    <BottomTab.Navigator
      initialRouteName='Home'
      barStyle={{ backgroundColor: '#ffffff', elevation: 50 }}
      activeColor="#00B0EB"
      inactiveColor="#ccc"
    >
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
        name="Landing page"
        component={HomePage} />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar-clock" color={color} size={24} />
          ),
        }}
        name="Bookings"
        component={BookingsList} />
      {/* <BottomTab.Screen
        options={{
          tabBarLabel: 'Rewards',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="gift" color={color} size={24} />
          ),
        }}
        name="Rewards"
        component={Reward} /> */}
      <BottomTab.Screen
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-box-outline" color={color} size={24} />
          ),
        }}
        name="My Profile"
        component={Profile} />
    </BottomTab.Navigator>
  );
}
const AuthNavigator = () => {

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
      <Stack.Screen
        name="SearchCity"
        component={SearchCity}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Homepage"
        component={Bottomtabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Service"
        component={Service}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ServiceBooking"
        component={ServiceBooking}
        options={{
          headerShown: true,
          headerLeft: () => (<TouchableOpacity onPress={() => { navigation.navigate('Homepage') }}>
            <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
          </TouchableOpacity>),
          headerTitleAlign: 'center',
          headerTitle: 'Booking'
        }}
      />
      <Stack.Screen
        name="MapPage"
        component={MapPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddressEditPage"
        component={AddressEditPage}
        options={{
          headerShown: true,
          headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
          </TouchableOpacity>),
          headerTitleAlign: 'center',
          headerTitle: 'New Address'
        }}
      />
      <Stack.Screen
        name="ConfirmBooking"
        component={ConfirmBooking}
        options={{
          headerShown: true,
          headerLeft: () => (<TouchableOpacity onPress={() => { navigation.navigate('Homepage') }}>
            <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
          </TouchableOpacity>),
          headerTitleAlign: 'center',
          headerTitle: 'Upcoming Booking'
        }}
      />
      <Stack.Screen
        name="ServiceCompleted"
        component={ServiceCompleted}
        options={{
          headerShown: true,
          headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
          </TouchableOpacity>),
          headerTitleAlign: 'center',
          headerTitle: 'Service Completed'
        }}
      />
      <Stack.Screen
        name="ServiceOngoing"
        component={ServiceOngoing}
        options={{
          headerShown: true,
          headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
          </TouchableOpacity>),
          headerTitleAlign: 'center',
          headerTitle: 'Ongoing Service'
        }}
      />
      <Stack.Screen
        name="ServiceUpcoming"
        component={ServiceUpcoming}
        options={{
          headerShown: true,
          headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
          </TouchableOpacity>),
          headerTitleAlign: 'center',
          headerTitle: 'Upcoming Service'
        }}
      />
      <Stack.Screen
        name="CouponCode"
        component={CouponCode}
        options={{
          headerShown: true,
          headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
          </TouchableOpacity>),
          headerTitleAlign: 'center',
          headerTitle: 'Coupon Code'
        }}
      />
      <Stack.Screen
        name="Review"
        component={Review}
        options={{
          headerShown: true,
          headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
          </TouchableOpacity>),
          headerTitleAlign: 'center',
          headerTitle: 'Review'
        }}
      />
      <Stack.Screen
        name="Dispute"
        component={Dispute}
        options={{
          headerShown: true,
          headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
          </TouchableOpacity>),
          headerTitleAlign: 'center',
          headerTitle: 'Dispute'
        }}
      />

      <Stack.Screen
        name="AddressBook"
        component={AddressPage}
        options={{
          headerShown: true,
          headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
          </TouchableOpacity>),
          headerTitleAlign: 'center',
          headerTitle: 'Address Book'
        }}
      />

      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetails}
        options={{
          headerShown: true,
          headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
          </TouchableOpacity>),
          headerTitleAlign: 'center',
          headerTitle: 'Personal Details'
        }}
      />

      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          headerShown: true,
          headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
          </TouchableOpacity>),
          headerTitleAlign: 'center',
          headerTitle: 'About Us'
        }}
      />

      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerShown: true,
          headerLeft: () => (<TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={30} />
          </TouchableOpacity>),
          headerTitleAlign: 'center',
          headerTitle: 'Contact Us'
        }}
      />

    </Stack.Navigator>
  )
};

export default AuthNavigator;
