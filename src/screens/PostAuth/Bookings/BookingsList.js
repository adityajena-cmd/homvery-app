import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export const BookingCard = ({completed, onPress = ()=>{}}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#ffffff', elevation: 5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#00B0EB', fontSize: 20 }}>AC Repair</Text>
        <Text style={{ color: '#000000', fontSize: 15 }}><Text style={{ fontWeight: '600' }}>Booking No:</Text> BH2908769</Text>
      </View>
      <View style={{ height: 1, backgroundColor: '#DCEBF7', marginTop: 10 }} />
      <View style={{ paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
              <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>14-Sep-2021</Text>
                <Text style={{ fontSize: 10, color: '#9d9d9d', fontWeight: '600' }}>(10.00 AM - 1.00 PM)</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
              <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>Lorem ipsum dolor...</Text>
              </View>
            </View>
          </View>
          <View style={{ width: 1, height: '100%', backgroundColor: '#DCEBF7', marginHorizontal: 10 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#00B0EB', fontSize: 15, marginBottom: 10 }}>Technician</Text>
            <View style={{ flexDirection: 'row' }}>
              <Image source={require('../../../assets/user.png')} resizeMode='contain' style={{ height: 50, width: 50 }} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: '#000000', fontSize: 18, marginBottom: 5, fontWeight: '600' }}>Paresh K</Text>
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
        {
          !completed ?
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <View style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: '#E39328', marginRight: 10 }} />
              <Text style={{ fontSize: 15, color: '#E39328', fontWeight: '600' }}>Assigned</Text>
            </View>
            :
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <View style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: '#41C461', marginRight: 10 }} />
              <Text style={{ fontSize: 15, color: '#41C461', fontWeight: '600' }}>Completed</Text>
            </View>
        }
        <Text style={{ fontSize: 15, color: '#000000', fontWeight: '600' }}>View Details</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function Bookings({navigation}) {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={{ elevation: 5, backgroundColor: '#ffffff', zIndex: 9, position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', padding: 15, width: Dimensions.get('screen').width }}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={25} /></TouchableOpacity>
        <Text style={{ fontSize: 20, color: '#000000', fontWeight: '600' }}>Bookings</Text>
        <Fontisto name="arrow-left" color={'#ffffff00'} size={20} />
      </View>
      <View style={{ flex: 1, backgroundColor: '#F8F8F8', paddingHorizontal: 20,paddingTop: 20, marginTop: 40 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ color: '#000000', fontSize: 20, fontWeight: '600', marginBottom: 20 }}>Upcoming Bookings</Text>
          <BookingCard completed={false} onPress={()=>{navigation.navigate('ServiceUpcoming')}}/>
          <Text style={{ color: '#000000', fontSize: 20, fontWeight: '600', marginVertical: 20 }}>Completed</Text>
          <BookingCard completed={true} onPress={()=>{navigation.navigate('ServiceCompleted')}} />
          <BookingCard completed={true} onPress={()=>{navigation.navigate('ServiceCompleted')}} />
        </ScrollView>
      </View>
    </View>
  );
}
