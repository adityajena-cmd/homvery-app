import moment from 'moment';
import React from 'react';
import { ToastAndroid } from 'react-native';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Loader from '../../../components/Loader';
import RescheduleModal from '../../../components/RescheduleModal';
import { CancelBoking, RescheduleBooking } from '../../../config/Apis/BookingApi';
import { getFullAddress } from '../../../config/Apis/Utils';

export default function ConfirmBooking({ navigation, route }) {
    const width = Dimensions.get('screen').width;
    const [remodal, setReModal] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    let booking = route?.params?.data
    let service = route?.params?.service

    const bookingRescheduled = (from, to, comm) => {
        setLoading(true)
        const body = {
            bookingId: booking?.bookingid?.id,
            fromTime: from,
            toTime: to,
            comments: comm,
        }
        console.log(body)

        RescheduleBooking(route?.params?.token, body)
            .then(res => {
                setLoading(false)

                console.log("response----", res.data)
                if (res.status === 200) {
                    ToastAndroid.show("Booking Rescheduled!", ToastAndroid.SHORT)
                    navigation.navigate('Homepage')
                }
            }).catch(err => {
                setLoading(false)

                console.log(err.response.data)
            })

    }

    const cancelBooking = () => {
        setLoading(true)
        const body = {
            "bookingId": booking?.bookingid?.id,
            "comments": "Aise hie cancel kar diya"
        }

        CancelBoking(body, route?.params?.token)
            .then(res => {
                setLoading(false)
                if (res.status === 200) {
                    ToastAndroid.show("Booking Canclled", ToastAndroid.SHORT)
                    navigation.navigate('Homepage')
                }

            }).catch(err => {
                setLoading(false)
                console.log(err.response.data)
            })
    }




    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Loader loading={loading} />

            <RescheduleModal
                modal={remodal}
                setModal={setReModal}
                onReschedule={bookingRescheduled}
            />
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                {booking?.bookingId &&
                    <View style={{ width: width, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}><Image style={{ width: width - 40, height: width / 3 }} source={require('../../../assets/bookingFeedback.png')} /></View>
                }
                <View style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <Image
                        style={{ width: width / 1.5, height: width / 2 }}
                        source={require('../../../assets/confbook.png')} resizeMode='contain' />
                </View>
                <View style={{ padding: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>Booking Details</Text>
                        <TouchableOpacity onPress={() => { }}><Text style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>{booking?.bookingId}  <MaterialCommunityIcons size={20} name='content-copy' color={'#000000'} /></Text></TouchableOpacity>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10 }} />
                    <View style={{ padding: 20 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={{ paddingRight: 20, left: 10 }}>
                                <Image style={{ marginTop: 10 }} source={require('../../../assets/sc1.png')} resizeMode='cover' />
                            </View>
                            <View style={{ left: 10 }}>
                                <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Service Type</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>{service?.name}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={{ paddingRight: 20 }}>
                                <Image style={{ marginTop: 10 }} source={require('../../../assets/sc2.png')} resizeMode='cover' />
                            </View>
                            <View >
                                <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Service Location</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>{getFullAddress(booking?.address)}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={{ paddingRight: 20 }}>
                                <Image style={{ marginTop: 10 }} source={require('../../../assets/sc3.png')} resizeMode='cover' />
                            </View>
                            <View >
                                <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Date & time</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>{moment(booking?.fromTime).utcOffset("+05:30").format('Do MMM hh:mm a') + " - " + moment(booking?.toTime).utcOffset("+05:30").format('Do MMM hh:mm a')}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ paddingRight: 20 }}>
                                <Image style={{ marginTop: 10 }} source={require('../../../assets/sc4.png')} resizeMode='cover' />
                            </View>
                            <View >
                                <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Problem Statement</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>{booking?.problem}</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center', elevation: 20, zIndex: 20, backgroundColor: '#F8F8F8', paddingHorizontal: 20 }}>
                <Button onPress={() => {
                    setReModal(true)
                }}
                    loading={loading}
                    disabled={loading}
                    color='#05194E'
                    style={{ width: '45%', marginVertical: 20, fontSize: 17, borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 17, fontWeight: '400' }}>Reschedule</Text></Button>
                <Button onPress={() => { cancelBooking() }}
                    color='#F8F8F8'
                    loading={loading}
                    disabled={loading}
                    style={{ width: '45%', marginVertical: 20, fontSize: 17, borderColor: '#05194E', borderWidth: 2, borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#05194E', fontSize: 17, fontWeight: '400' }}>Cancel</Text></Button>
            </View>
        </View>
    );
}
