import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetBookings } from '../../../config/Apis/BookingApi';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import { getFullAddress, getStatus } from '../../../config/Apis/Utils';
import moment from 'moment';

export const BookingCard = ({ type, data, onPress = () => { } }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#ffffff', elevation: 5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#00B0EB', fontSize: 20 }}>{data?.bookingid?.serviceid?.name}</Text>
        <Text style={{ color: '#000000', fontSize: 15 }}><Text style={{ fontWeight: '600' }}>Booking No:</Text>{data?.bookingid?.bookingId}</Text>
      </View>
      <View style={{ height: 1, backgroundColor: '#DCEBF7', marginTop: 10 }} />
      <View style={{ paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
              <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>{moment(new Date(data.bookingid?.fromtime)).format('Do MMM YYYY')}</Text>
                <Text style={{ fontSize: 10, color: '#9d9d9d', fontWeight: '600' }}>{moment(new Date(data.bookingid?.fromtime)).format('hh:mm a') + " - " + moment(new Date(data.bookingid?.totime)).format('hh:mm a')}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
              <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>{getFullAddress(data.bookingid?.address)}</Text>
              </View>
            </View>
          </View>
          <View style={{ width: 1, height: '100%', backgroundColor: '#DCEBF7', marginHorizontal: 10 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#00B0EB', fontSize: 15, marginBottom: 10 }}>Technician</Text>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../../../assets/user.png')} resizeMode='contain' style={{ height: 50, width: 50 }} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: '#000000', fontSize: 18, marginBottom: 5, fontWeight: '600' }}>{ data.bookingid?.assignedto?.id?data.bookingid?.assignedto?.firstname + " "+data.bookingid?.assignedto?.lastname :'Not Assinged'}</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <View style={{ backgroundColor: '#277B3B', paddingHorizontal: 5, borderRadius: 5, paddingVertical: 2, }}>
                    <Text style={{ color: '#ffffff', fontSize: 12 }}><MaterialCommunityIcons size={12} name="star" color={'#ffffff'} /> 4.3</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: '#DCEBF7', marginTop: 10 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        {getStatus(type)}
        <Text style={{ fontSize: 15, color: '#000000', fontWeight: '600' }}>View Details</Text>
      </View>
    </TouchableOpacity>
  )
}

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
                console.log("err++++++++++++", err)

              })
          }
        }
      )
    }, [load]))



  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white'}}
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
                return <BookingCard type={item?.bookingstatusid?.name} data={item} onPress={() => { navigation.navigate('ServiceUpcoming',{data:item}) }} />
              }) : <View style={{flex:1}}><Text style={{ textAlign: 'center', fontSize: 17, marginTop: 15, marginBottom: 20, fontWeight: '600' }}>No Upcoming Bookings Yet.</Text></View>}



            <Text style={{ color: '#000000', fontSize: 20, fontWeight: '600', marginVertical: 20 }}>Completed</Text>
            {completedBookings && completedBookings.length > 0 ?
              completedBookings.map(item => {
                return <BookingCard type={item?.bookingstatusid?.name} data={item} onPress={() => { navigation.navigate('ServiceCompleted',{data:item}) }} />
              }) : <View style={{flex:1}}><Text style={{ textAlign: 'center', fontSize: 17, marginTop: 15, marginBottom: 20, fontWeight: '600' }}>No Booking Completed Yet.</Text></View>
            }
          </ScrollView>
        </View>
      </ScrollView >
    </View >
  );
}
