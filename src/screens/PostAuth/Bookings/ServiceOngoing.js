import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Accord, BookingStatusCard, Invoice, TrickImg } from './ServiceCompleted';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button } from 'react-native-paper';

export const Coupon = ({navigation}) => {
    return <TouchableOpacity onPress={() => { navigation.navigate('CouponCode') }} style={{ padding: 20, backgroundColor: '#ffffff', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginBottom: 10, elevation: 2 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
            <Image source={require('../../../assets/coupon.png')} />
            <View style={{ marginLeft: 20 }}>
                <Text style={{ color: '#000000', fontWeight: '600', fontSize: 14 }}>Apply Coupon</Text>
                <Text style={{ color: '#707070', fontWeight: '400', fontSize: 12 }}>3 offers available</Text>
            </View>
        </View>
                        
        <MaterialCommunityIcons name="chevron-right" size={35} color={'#707070'} />
    </TouchableOpacity>
};

export default function ServiceOngoing({ navigation }) {
    const [paid, setPaid] = React.useState(false)
    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8', }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ padding: 20 }}>
                    <Accord />
                    <BookingStatusCard />
                    <TrickImg />
                    <Coupon navigation={navigation}/>
                    <Invoice paid={paid} />
                </View>
                
            </ScrollView>
            {
                paid ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center', elevation: 20, zIndex: 20, backgroundColor: '#F8F8F8', paddingHorizontal: 20 }}>
                        <Button
                            onPress={() => { navigation.navigate('Review')}}
                            style={{ width: '40%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                            mode="contained"
                        ><Text style={{ color: '#ffffff', fontSize: 12, fontWeight: '400' }}>Review</Text></Button>
                        <Button onPress={() => { }}
                            style={{ width: '40%', marginVertical: 20, fontSize: 20, backgroundColor: '#F8F8F8', borderColor: '#05194E', borderWidth: 2, borderRadius: 10, paddingVertical: 0 }}
                            mode="contained"
                        ><Text style={{ color: '#05194E', fontSize: 12, fontWeight: '400' }}>Raise Dispute</Text></Button>
                    </View>
                    :
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', elevation: 20, zIndex: 20, backgroundColor: '#F8F8F8' }}>
                        <Button onPress={() => {
                            setPaid(true)
                        }}
                            style={{ width: '50%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                            mode="contained"
                        ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Make Payment</Text></Button>
                    </View>
            }
            
        </View>
    )
}
