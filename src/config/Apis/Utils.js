import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { Text, View } from 'react-native';
import { ToastAndroid } from 'react-native';
import { Linking } from 'react-native'



const getStatus = (type) => {

    switch (type) {
      case 'BOOKING_CANCELLED':
        return (
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: 'red', marginRight: 10 }} />
            <Text style={{ fontSize: 15, color: 'red', fontWeight: '600' }}>CANCELLED</Text>
          </View>
        )
        break;
      case 'BOOKING_COMPLETED':
        return (
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: '#41C461', marginRight: 10 }} />
            <Text style={{ fontSize: 15, color: '#41C461', fontWeight: '600' }}>COMPLETED</Text>
          </View>
        )
        break;
      default:
        return (
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: '#E39328', marginRight: 10 }} />
            <Text style={{ fontSize: 15, color: '#E39328', fontWeight: '600' }}>{type.split('_')[1]}</Text>
          </View>
        )
  
  
    }
  
  }


const openPhone = phoneNumber => {
    Linking.openURL(`tel:${phoneNumber}`)

}

const openBrowser = (link="www.google.com") =>{
    Linking.openURL(link)
}

const getDate = (date) => {
    let dates;
    if (date !== null || date !== undefined || date !== "") {
        dates = date.split("-")
    }else{
        dates = ["NA","NA","NA"]
    }

    return dates
}

const openMaps = (lat, lng, loclabel) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = loclabel;
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url);
}

const getFullAddress = (addr) => {
    let address = ''
    if (addr === null || addr === undefined) {
        address = "NA"
    } else {
        address = addr.flat + ", " + addr.street + ", " + addr.addressline1 + "\n" + addr.landmark + ", " + addr.pincode + ", " + addr.city;
    }

    return address
}

const copyClipboard = id => {
    Clipboard.setString(id);
    ToastAndroid.show('Text Copied!', ToastAndroid.SHORT);
}

export {
    getFullAddress,
    copyClipboard,
    openPhone,
    openMaps,
    getDate,
    openBrowser,
    getStatus
}