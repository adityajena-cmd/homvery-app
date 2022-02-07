import React, { useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetOffers } from '../../../config/Apis/BookingApi';
import moment from 'moment';

export const CouponApplyCard = ({ data,onPress }) => {
  const [tc, setTc] = React.useState(false)
  return (
    <View style={{ marginBottom: 10, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20, flexDirection: 'row', justifyContent: 'space-between', position: 'relative' }}>
      <Image source={require('../../../assets/couponapply.png')} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ color: '#000000', fontSize: 20, fontWeight: '600', }}>{data?.percentage ? data?.percentage + '% off' :data?.name}</Text>
        <Text style={{ color: '#000000', fontSize: 12, fontWeight: '400', }}>{data?.name}</Text>
        <Text style={{ color: '#000000', fontSize: 12, fontWeight: '400', }}>{'Valid till :' + moment(new Date(data?.toDate)).format('Do MMM YYYY')}</Text>
        <TouchableOpacity onPress={() => { setTc(!tc) }} style={{ marginTop: 10 }}>
          <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600', }}>View T&C <MaterialCommunityIcons size={15} name="chevron-down-circle-outline" /></Text>
        </TouchableOpacity>
        {
          tc && <View style={{ marginTop: 10 }}>
            {
              data?.terms && data?.terms?.length > 0 ?
                data?.terms?.map(item => {
                  return (<Text style={{ color: '#000000', }}><Text style={{ color: '#00B0EB' }}>{'\u2B24'}</Text>{item?.title}</Text>
                  )
                }) :
                <>
                </>
            }
          </View>
        }


      </View>
      <View style={{ position: 'absolute', top: 20, right: 20 }}>
        <Button
          onPress={onPress}
          style={{ width: 'auto', fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
          mode="contained">
          <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Apply</Text>
        </Button>
        <Text style={{ color: '#000000', fontSize: 12, fontWeight: '400', textAlign: 'center' }}>T&C Applied</Text>
      </View>
    </View>
  )
}

export default function CouponCode({navigation,route}) {

  let booking = route?.params?.data;

  const [userId, setUserId] = React.useState('');
  const [token, setToken] = React.useState('');
  const [searchText, setSearchText] = React.useState('');
  const [offers, setOffers] = React.useState([]);
  const [tempOffers, settempOffers] = React.useState([]);
  useEffect(() => {
    AsyncStorage.multiGet(
      ['API_TOKEN', 'USER_ID'],
      (err, items) => {
        if (err) {
          console.log("ERROR===================", err);
        } else {
          setToken(items[0][1])
          setUserId(items[1][1])
          GetOffers(59, items[0][1])
            .then(res => {
              console.log(res.data)
              if (res.status === 200) {
                setOffers(res.data)
                settempOffers(res.data)

              }
            }).catch(err => {
              console.log(err)

            })
        }
      })
  }, [])

  const searchCopoun = (text) => {
    setSearchText(text)
    if (text.length > 0) {
      setOffers(tempOffers.filter(it => it.name.toLowerCase().includes(text.toLowerCase())))
    } else {
      setOffers(tempOffers)
    }
  }

  function onSelectedItem(item) {
    route.params.onSelect(item);
    navigation.goBack();
}


  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <View style={{ backgroundColor: '#ffffff', borderRadius: 10, borderColor: '#00B0EB', borderWidth: 1, flexDirection: 'row', marginBottom: 10 }}>
            <TextInput
              placeholder='Enter coupon code'
              value={searchText}
              onChangeText={searchCopoun}
              style={{ paddingHorizontal: 10, paddingVertical: 10, flex: 1, fontSize: 15 }}
            />
            <TouchableOpacity style={{ backgroundColor: '#00B0EB', display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
              <Text style={{ fontSize: 15, color: '#fff', }}>Apply</Text>
            </TouchableOpacity>
          </View>


          {
            offers && offers.length > 0 ?
              offers.map(item => {
                return (
                  <CouponApplyCard data={item} onPress={()=>onSelectedItem(item)}/>
                )
              }) :
              <>
                <Text style={{ fontSize: 20, fontWeight: '500',  textAlign: 'center', marginTop: 15 }}>No Copouns for this Booking!</Text>
              </>
          }




        </View>
      </ScrollView>

    </View>
  );
}
