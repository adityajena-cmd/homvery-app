import { TouchableOpacity, View, Image, Dimensions, Text, ToastAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment';
import React from 'react';
import { Button } from 'react-native-paper';
import { copyClipboard, getFullAddress } from '../../../config/Apis/Utils';


export const Accord = ({ data = {} }) => {
    const [accordion, setAccordion] = React.useState(false);
    const width = Dimensions.get('screen').width;
    return (
        <TouchableOpacity onPress={() => { setAccordion(!accordion) }} style={{ padding: 10, backgroundColor: '#ffffff', borderRadius: 10, marginVertical: 10, elevation: 3, marginHorizontal: 3 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
                <Text style={{ color: '#00B0EB', fontSize: 18 }}>Booking Details</Text>
                {
                    accordion ?
                        <Text onPress={() => { copyClipboard(data?.bookingid?.bookingId) }} style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>{data?.bookingid?.bookingId}  <MaterialCommunityIcons size={17} name='content-copy' color={'#000000'} /></Text>
                        :
                        <MaterialCommunityIcons name='chevron-down' size={25} color={'grey'} />
                }

            </View>
            {
                accordion &&
                <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: 15, paddingTop: 10, borderTopColor: '#EAE2E2', borderTopWidth: 1 }}>

                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ paddingRight: 20 }}>
                            <Image style={{ marginTop: 5 }} source={require('../../../assets/sc1.png')} resizeMode='cover' />
                        </View>
                        <View >
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Service Type</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>{data?.bookingid?.serviceid?.name}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ paddingRight: 20 }}>
                            <Image style={{ marginTop: 5 }} source={require('../../../assets/sc2.png')} resizeMode='cover' />
                        </View>
                        <View >
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Service Location</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>{getFullAddress(data.bookingid?.address)} </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                        <View style={{ paddingRight: 20 }}>
                            <Image style={{ marginTop: 5 }} source={require('../../../assets/sc3.png')} resizeMode='cover' />
                        </View>
                        <View >
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>{'Date & time'}</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>{moment(new Date(data.bookingid?.fromtime)).format('Do MMM YYYY') + "  -  " + moment(new Date(data.bookingid?.fromtime)).format('hh:mm a') + " - " + moment(new Date(data.bookingid?.totime)).format('hh:mm a')}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingRight: 20 }}>
                            <Image style={{ marginTop: 10 }} source={require('../../../assets/sc4.png')} resizeMode='cover' />
                        </View>
                        <View >
                            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Problem Statement</Text>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>{data?.bookingid?.problem}</Text>
                        </View>
                    </View>
                </>
            }
        </TouchableOpacity>
    )
}
