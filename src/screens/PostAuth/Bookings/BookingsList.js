import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image, ToastAndroid } from 'react-native';
import { Button } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetBookings } from '../../../config/Apis/BookingApi';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import { getFullAddress, getInitials, getStatus } from '../../../config/Apis/Utils';
import moment from 'moment';
import Loader from '../../../components/Loader';
import { BookingCard } from '../../../components/BookingCard';


export default function Bookings({ navigation }) {

  const [loading, setLoading] = React.useState(false);
  const [load, setLoad] = React.useState(0);
  const [userId, setUserId] = React.useState('');
  const [token, setToken] = React.useState('');
  const [isRefresh, setRefresh] = React.useState(false);
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [completedBookings, setCompletedBookings] = useState([])

  const onRefresh = () => {
    setLoad(load + 1)
  }
  function completedBook(item) {
    if (item.bookingstatusid?.name === 'BOOKING_CANCELLED' || item.bookingstatusid?.name === 'BOOKING_COMPLETED') {
      return item;
    }
  }

  function newBook(item) {
    if (item.bookingstatusid?.name !== 'BOOKING_CANCELLED' && item.bookingstatusid?.name !== 'BOOKING_COMPLETED') {
      return item;
    }
  }

  const getBookingData = data => {
    let newBooking = data.filter(newBook)
    let completedBooking = data.filter(completedBook)

    setUpcomingBookings(newBooking)
    setCompletedBookings(completedBooking)
  }

  useFocusEffect(
    React.useCallback(() => {
      setRefresh(true);
      AsyncStorage.multiGet(
        ['API_TOKEN', 'USER_ID'],
        (err, items) => {
          if (err) {
            console.log("ERROR===================", err);
          } else {

            setToken(items[0][1])
            setUserId(items[1][1])
            setLoading(true)

            GetBookings(items[1][1], items[0][1])
              .then(res => {
                setLoading(false)
                setRefresh(false);
                if (res.status === 200) {
                  let data = res.data;
                  let bookings = []
                  data.forEach(item => {
                    let findItem = bookings.find((x) => x.bookingid.id === item.bookingid.id);
                    if (!findItem) {
                      bookings.push(item)
                    }
                  })
                  getBookingData(bookings)
                }

              }).catch(err => {
                setLoading(false)
                setRefresh(false);
                if(err.response.status === 500){
                  ToastAndroid.show("Some Error Occured!\nServer Down.",ToastAndroid.LONG)
                }
                console.log("err++++++++++++", err)

              })
          }
        }
      )
    }, [load]))



  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Loader loading={isRefresh} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={onRefresh} />
        }>
        <View style={{ elevation: 5, backgroundColor: '#ffffff', zIndex: 9, position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', padding: 15, width: Dimensions.get('screen').width }}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={25} /></TouchableOpacity>
          <Text style={{ fontSize: 20, color: '#000000', fontWeight: '600' }}>Bookings</Text>
          <Fontisto name="arrow-left" color={'#ffffff00'} size={20} />
        </View>
        <View style={{ flex: 1, backgroundColor: '#F8F8F8', paddingHorizontal: 20, paddingTop: 20, marginTop: 40 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{ color: '#000000', fontSize: 20, fontWeight: '600', marginBottom: 20 }}>Upcoming Bookings</Text>
            {upcomingBookings && upcomingBookings.length > 0 ?
              upcomingBookings.map(item => {
                return <BookingCard type={item?.bookingstatusid?.name} data={item} onPress={() => { navigation.navigate('ServiceUpcoming', { data: item }) }} />
              }) : <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', fontSize: 17, marginTop: 15, marginBottom: 20, fontWeight: '600' }}>No Upcoming Bookings Yet.</Text></View>}



            <Text style={{ color: '#000000', fontSize: 20, fontWeight: '600', marginVertical: 20 }}>Completed</Text>
            {completedBookings && completedBookings.length > 0 ?
              completedBookings.map(item => {
                return <BookingCard type={item?.bookingstatusid?.name} data={item} onPress={() => { navigation.navigate('ServiceCompleted', { data: item }) }} />
              }) : <View style={{ flex: 1 }}><Text style={{ textAlign: 'center', fontSize: 17, marginTop: 15, marginBottom: 20, fontWeight: '600' }}>No Booking Completed Yet.</Text></View>
            }
          </ScrollView>
        </View>
      </ScrollView >
    </View >
  );
}
