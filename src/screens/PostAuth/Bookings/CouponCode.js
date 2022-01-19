import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export const CouponApplyCard = () => {
  const [tc, setTc]= React.useState(false)
  return (
    <View style={{ marginBottom: 10,backgroundColor: '#FFFFFF', borderRadius: 10, padding: 20, flexDirection: 'row', justifyContent: 'space-between', position: 'relative' }}>
            <Image source={require('../../../assets/couponapply.png')} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ color: '#000000', fontSize: 20, fontWeight: '600', }}>100% off</Text>
              <Text style={{ color: '#000000', fontSize: 12, fontWeight: '400', }}>Lorem ipsum dolor sit amet  </Text>
              <Text style={{ color: '#000000', fontSize: 12, fontWeight: '400', }}>Valid till : 28-09-2021</Text>
              <TouchableOpacity onPress={()=>{setTc(!tc)}} style={{ marginTop: 10 }}>
                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600', }}>View T&C <MaterialCommunityIcons size={15} name="chevron-down-circle-outline" /></Text>
              </TouchableOpacity>
              {
                tc && <View style={{ marginTop: 10 }}>
                  <Text style={{ color: '#000000', }}><Text style={{ color: '#00B0EB' }}>{'\u2B24'}</Text>  Lorem ipsum dolor sit amet</Text>
                  <Text style={{ color: '#000000', }}><Text style={{ color: '#00B0EB' }}>{'\u2B24'}</Text>  Lorem ipsum dolor sit amet</Text>
                  <Text style={{ color: '#000000', }}><Text style={{ color: '#00B0EB' }}>{'\u2B24'}</Text>  Lorem ipsum dolor sit amet</Text>
                  <Text style={{ color: '#000000', }}><Text style={{ color: '#00B0EB' }}>{'\u2B24'}</Text>  Lorem ipsum dolor sit amet</Text>
                  <Text style={{ color: '#000000', }}><Text style={{ color: '#00B0EB' }}>{'\u2B24'}</Text>  Lorem ipsum dolor sit amet</Text>
                </View>
              }
              
              
            </View>
            <View style={{ position: 'absolute', top: 20, right: 20 }}>
              <Button
                onPress={() => { }}
                style={{ width: 'auto', fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                mode="contained">
                <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Apply</Text>
              </Button>
              <Text style={{ color: '#000000', fontSize: 12, fontWeight: '400', textAlign: 'center' }}>T&C Applied</Text>
            </View>
          </View>
  )
}

export default function CouponCode() {
  
  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <View style={{ backgroundColor: '#ffffff', borderRadius: 10, borderColor: '#00B0EB', borderWidth: 1, flexDirection: 'row', marginBottom: 10 }}>
            <TextInput
              placeholder='Enter coupon code'
              style={{ paddingHorizontal: 10, paddingVertical: 10, flex: 1, fontSize: 15 }}
            />
            <TouchableOpacity style={{ backgroundColor: '#00B0EB', display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
              <Text style={{ fontSize: 15, color: '#fff', }}>Apply</Text>
            </TouchableOpacity>
          </View>
          <CouponApplyCard/>
          <CouponApplyCard/>
          <CouponApplyCard/>
          
          

        </View>
      </ScrollView>

    </View>
  );
}
