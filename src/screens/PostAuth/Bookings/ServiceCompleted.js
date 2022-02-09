import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { getStatus, openBrowser } from '../../../config/Apis/Utils';
import { Accord } from '../../../components/common/Accordion/Accordion';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GetBillingDetails, GetTechinicianServices } from '../../../config/Apis/BookingApi';
import { BookingStatusCard } from '../../../components/BookingStatusCard';
import { TrickImg } from '../../../components/CoinBanner';

export const Invoice = ({ quotationList=[] }) => {
    const width = Dimensions.get('screen').width;
    return (
        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, padding: 20 }}>
            <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center' }}>Payment Details</Text>
            <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10, marginBottom: 10 }} />

            {quotationList.length > 0 && quotationList.map((item, index) => {
                return (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>

                        <View style={{ marginTop: 10, flexDirection: 'row' }}>
                            <Text style={{ color: '#000000', fontSize: 14 }}>{item.name}</Text>
                        </View>

                        <View style={{ marginTop: 10 }}>

                            <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>{'₹ ' + item.cost.toString()}</Text>
                        </View>
                        {
                            index == 0 ?
                                <Image style={{ marginLeft: width / 3, position: 'absolute', top: -10, width: width / 5, height: width / 5 }} source={require('../../../assets/paid.png')} />
                                : <></>

                        }
                    </View>)
            })}
            <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10 }} />
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#000000', fontSize: 14, fontWeight: '600' }}>Total Payable Amount</Text>
                <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>₹1400</Text>
            </View>
        </View>
    )
}

export const RatingComp = ({ rating }) => {
    const width = Dimensions.get('screen').width;
    return (
        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, padding: 20, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
            <Image source={require('../../../assets/techGuy.png')} style={{ width: width / 4, height: width / 4 }} />
            <View style={{ marginLeft: 20 }}>
                <Text style={{ color: '#000000', fontWeight: '600', fontSize: 16 }}>Air Conditioner Service</Text>
                <Rating
                    style={{ paddingVertical: 10 }}
                    startingValue={rating}
                    readonly={true}
                />
            </View>
        </View>
    )
}


export default function ServiceCompleted({ navigation, route }) {
    let booking = route?.params?.data;
    const [quotationList, setQuotationList] = React.useState([])
    const [coins, setCoins] = React.useState(0)

    const [assingedTo, setAssingedTo] = React.useState({})


    const checkCoins = (data) => {
        data.length > 0 &&
            data.forEach(element => {
                if (element.type === 'COINS') {
                    setCoins(Math.abs(element.cost))
                    return
                }
            });
    }
    useEffect(() => {
        console.log("ID", booking?.bookingid?.review)
        AsyncStorage.multiGet(
            ['API_TOKEN', 'USER_ID'],
            (err, items) => {
                if (err) {
                    console.log("ERROR===================", err);
                } else {
                    if (booking?.bookingid?.assignedto !== null) {
                        GetTechinicianServices(booking?.bookingid?.assignedto?.id, items[0][1])
                            .then(res => {
                                if (res.status === 200) {
                                    setAssingedTo(res.data[0])
                                }
                            }).catch(err => {
                                console.log("EROR PRO===========",err.response.data)
                            })
                    }

                    GetBillingDetails(items[0][1], booking?.bookingid?.id)
                        .then(res => {
                            console.log(res.data)
                            if (res.status === 200) {
                                setQuotationList(res.data)
                                checkCoins(res.data)
                                
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                }
            })
    }, [])

    return (
        <View style={{ backgroundColor: '#F8F8F8', flex: 1 }}>
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <Accord data={booking} />
                    {assingedTo?.technician && <BookingStatusCard techDetails={assingedTo} status={booking?.bookingstatusid?.name} serviceType={booking?.bookingid?.serviceid?.name} assingedTo={booking?.bookingid?.assignedto} />}
                    {quotationList.length>0 &&<TrickImg coins={coins} />}
                    {quotationList.length>0 && <Invoice paid={true} quotationList={quotationList} />}
                    <RatingComp  rating={booking?.bookingid?.review ? booking?.bookingid?.review : 0} />
                </View>
            </ScrollView>
        </View>
    );
}
