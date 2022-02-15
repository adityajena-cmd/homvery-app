import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { getFullAddress, getInitials, getStatus } from '../config/Apis/Utils';
import moment from 'moment';

export const BookingCard = ({ type, data, onPress = () => { } }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#ffffff', elevation: 5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#00B0EB', fontSize: 16 }}>{data?.bookingid?.serviceid?.name}</Text>
          <Text style={{ color: '#000000', fontSize: 14 }}><Text style={{ fontWeight: '600' }}>Booking No: </Text>{data?.bookingid?.bookingId}</Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#DCEBF7', marginTop: 10 }} />
        <View style={{ paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={24} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>{moment(new Date(data.bookingid?.fromtime)).format('Do MMM YYYY')}</Text>
                  <Text style={{ fontSize: 10, color: '#9d9d9d', fontWeight: '600' }}>{moment(new Date(data.bookingid?.fromtime)).format('hh:mm a') + " - " + moment(new Date(data.bookingid?.totime)).format('hh:mm a')}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                <MaterialCommunityIcons name="map-marker" color={'#000000'} size={24} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>{getFullAddress(data.bookingid?.address).length < 16 ? getFullAddress(data.bookingid?.address) : getFullAddress(data.bookingid?.address).substring(0, 16) + '...'}</Text>
                </View>
              </View>
            </View>
            <View style={{ width: 1, height: '100%', backgroundColor: '#DCEBF7', marginHorizontal: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#00B0EB', fontSize: 15, marginBottom: 10 }}>Technician</Text>
              <View style={{ flexDirection: 'row' }}>
                {data.bookingid?.assignedto?.profilepic?
                <Image source={data.bookingid?.assignedto?.profilepic && 
                  data.bookingid?.assignedto?.profilepic?.url ?
                  {uri:data.bookingid?.assignedto?.profilepic?.url}
                  :require('../assets/user.png')} resizeMode='contain' style={{ borderRadius:25,height: 50, width: 50 }} />:
                  getInitials(data.bookingid?.assignedto?.firstname, data.bookingid?.assignedto?.lastname, 40)}
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: '#000000', fontSize: 14, marginBottom: 5, fontWeight: '600' }}>{data.bookingid?.assignedto?.id ? data.bookingid?.assignedto?.firstname + " " + data.bookingid?.assignedto?.lastname : 'Not Assigned'}</Text>
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