import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ToastAndroid, TextInput, Dimensions, RefreshControl } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Button } from 'react-native-paper';
import { Accord } from '../../../components/common/Accordion/Accordion';
import { BookingStatusCard } from '../../../components/BookingStatusCard';
import { validatePathConfig } from '@react-navigation/native';
import { AcceptQuotation, GetBillingDetails, GetBookingStatus, RejectQuotation, UpdatePayment } from '../../../config/Apis/BookingApi';
import { Invoice } from '../../../components/Invoice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { getPaytmToken } from '../../../config/Apis/PaymentApis';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { TrickImg } from '../../../components/CoinBanner';
import Loader from '../../../components/Loader';
import { TrickModal } from '../Reward/Reward';

const data3 = [
    "Price is on higher sidet", "Not satisfied with technician", "Delay in service", "Others"
]

export const Coupon = ({ navigation, onSelect, bookingId, copoun, isAccepted }) => {


    return <TouchableOpacity onPress={() => { !isAccepted && navigation.navigate('CouponCode', { bookingId: bookingId, onSelect: onSelect }) }} style={{ padding: 20, backgroundColor: '#ffffff', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginBottom: 10, elevation: 2 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
            <Image source={require('../../../assets/coupon.png')} />
            <View style={{ marginLeft: 20 }}>
                {copoun?.percentage && copoun?.percentage ? <><Text style={{ color: '#000000', fontWeight: '600', fontSize: 14 }}>1 Coupon Applied!</Text>
                    <Text style={{ color: '#707070', fontWeight: '400', fontSize: 12 }}>{`${copoun?.name}\n${copoun?.percentage}% off !`}</Text>
                </>
                    :
                    <>
                        <Text style={{ color: '#000000', fontWeight: '600', fontSize: 14 }}>Apply Coupon</Text>
                        <Text style={{ color: '#707070', fontWeight: '400', fontSize: 12 }}>3 offers available</Text>
                    </>
                }
            </View>
        </View>

        <MaterialCommunityIcons name="chevron-right" size={35} color={'#707070'} />
    </TouchableOpacity>
};

export default function ServiceOngoing({ navigation, route }) {
    const [paid, setPaid] = React.useState(route?.params?.paid)
    const [isAccepted, setAccepted] = React.useState(route?.params?.isAccepted)
    const [coupon, setCopoun] = React.useState({})
    const [token, setToken] = React.useState('')
    const [userId, setUserId] = React.useState('')
    const [commentsReject, setCommentsReject] = React.useState('')
    let booking = route?.params?.data;
    const [quotationList, setQuotationList] = React.useState([])
    const [discount, setDiscount] = React.useState(0)
    const [coins, setCoins] = React.useState(0)
    const [rejectModal, setRejectModal] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [modal, setModal] = React.useState(false)
    const [completed, setCompleted] = React.useState(false)
    const [load, setLoad] = React.useState(0)



    const updateTransaction = (ptmBody, isSuccess) => {
        setLoading(true)
        const body = {
            bookingId: booking?.bookingid?.id,
            txnSuccess: isSuccess,
            ...ptmBody

        }
        console.log("method\n\n\n", body)
        UpdatePayment(body, token)
            .then(res => {
                setLoading(false)
                console.log(res.data)
                if (res.status === 200) {
                    setLoad(load + 1)

                    // setPaid(true)
                }
            }).catch(err => {
                setLoading(false)
                console.log(err.response.data)
            })
    }


    const InitiateTransaction = (data) => {
        let paytmPayload = {
            orderId: data.orderId,
            mid: 'uHnuRf08065935005565',
            txnToken: data.body.txnToken,
            amount: data.amount,
            callbackUrl: 'https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=' + data.orderId,
            isStaging: false,
            restrictAppInvoke: false
        }

        AllInOneSDKManager.startTransaction(
            paytmPayload.orderId,
            paytmPayload.mid,
            paytmPayload.txnToken,
            paytmPayload.amount,
            paytmPayload.callbackUrl,
            paytmPayload.isStaging,
            paytmPayload.restrictAppInvoke
        )
            .then((result) => {
                console.log("result", result);

                // handle result ..
                if (result.STATUS === 'TXN_SUCCESS') {
                    ToastAndroid.show('Transaction Succesfull!', ToastAndroid.SHORT);
                    updateTransaction(result, true)

                } else if (result.STATUS === 'TXN_FAILURE') {
                    ToastAndroid.show('Transaction Failed!', ToastAndroid.SHORT);
                    updateTransaction(result, false)

                }
                else {
                    ToastAndroid.show('Some Error OCcured !\nTry Again.', ToastAndroid.SHORT);
                }
            })
            .catch((err) => {
                // handle error ..
                alert("Some Error OCcured !\nTry Again.")
                console.log(err)
            });
    }

    const startPayment = () => {

        setLoading(true)
        getPaytmToken(userId, booking?.bookingid?.bookingId, token)
            .then(res => {
                setLoading(false)
                if (res.status === 200 && res.data.body.txnToken !== '' && res.data.body.txnToken !== null) {
                    InitiateTransaction(res.data)
                }

            }).catch(err => {
                setLoading(false)


            })

    }


    const checkCoins = (data) => {
        data.length > 0 &&
            data.forEach(element => {
                if (element.type === 'COINS') {
                    setCoins(Math.abs(element.cost))
                    return
                }
            });
    }

    const setButtons = (data) => {
        let status = data.bookingstatusid?.name;
        console.log(status)
        switch (status) {
            case 'QUOTATION_CREATED':
                setAccepted(false)
                setPaid(false)
                break;

            case 'QUOTATION_APPROVED':
                setAccepted(true)
                setPaid(false)
                break;

            case 'QUOTATION_REJECTED':
                navigation.goBack()
                break;

            case 'PAYMENT_COMPLETED':
                setAccepted(true)
                setPaid(true)
                break;
            case 'BOOKING_COMPLETED':
                setCompleted(true)
                setAccepted(true)
                setPaid(true)
                break;

            default:
                setAccepted(false)
                setPaid(false)
                break;
        }

    }




    useEffect(() => {
        setLoading(true)
        AsyncStorage.multiGet(
            ['API_TOKEN', 'USER_ID'],
            (err, items) => {
                if (err) {
                    console.log("ERROR===================", err);
                } else {
                    setToken(items[0][1])
                    setUserId(items[1][1])
                    GetBookingStatus(booking?.bookingid?.id, items[0][1])
                        .then(result => {
                            // setRefresh(false)
                            if (result.status === 200 && result.data.length > 0) {
                                setButtons(result.data[0])
                            }
                        }).catch(err => {
                            // setRefresh(false)

                            console.log(err)
                        })
                    console.log("NEUOhfwre=99999999999999==========================", items[0][1])
                    GetBillingDetails(items[0][1], booking?.bookingid?.id)
                        .then(res => {
                            setLoading(false)
                            console.log("RESPONSE QUOTATIN---------------", res.data.length)
                            if (res.status === 200) {
                                setQuotationList(res.data)
                                checkCoins(res.data)
                            }
                        }).catch(err => {
                            setLoading(false)

                            console.log(err)
                        })
                }
            })
    }, [load])

    const acceptBooking = () => {
        setLoading(true)
        let body = {}
        if (coupon?.id) {
            body = {
                "bookingId": booking?.bookingid?.id,
                "offerId": coupon?.id ? coupon?.id : null
            }
        } else {
            body = {
                "bookingId": booking?.bookingid?.id,
            }
        }
        console.log(body)
        AcceptQuotation(body, token).then(res => {
            setLoading(false)
            if (res.status === 200) {
                setLoad(load + 1)
                // setAccepted(true)
            }
        }).catch(err => {
            setLoading(false)
            console.log("accept error----------------", err.response.data)
        })
    }


    const rejectBooking = () => {
        setLoading(true)

        const body = {
            "bookingId": booking?.bookingid?.id,
            "comments": commentsReject
        }
        RejectQuotation(body, token(res => {
            setLoading(false)

            if (res.status === 200) {
                setLoad(load + 1)
                // setRejectModal(false)
            }
        })).catch(err => {
            setLoading(false)
            ToastAndroid.show("Some Error Occured!", ToastAndroid.SHORT)
            console.log("reject error----------------", err)
        })
    }

    const onRefresh = () => {
        setLoad(load + 1)
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8', }}>
            <Loader loading={loading} />
            <TrickModal modal={modal} setModal={setModal} />

            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={onRefresh} />
                }>
                <View style={{ padding: 20 }}>
                    <Accord data={route?.params?.data} />
                    {route.params?.assingedTo?.technician && <BookingStatusCard
                        techDetails={route.params?.assingedTo}
                        status={booking?.bookingstatusid?.name}
                        serviceType={booking?.bookingid?.serviceid?.name}
                        assingedTo={booking?.bookingid?.assignedto}
                    />}
                    {coins > 0 && <TrickImg coins={coins} onClick={() => setModal(true)} />}
                    <Coupon
                        isAccepted={isAccepted}
                        copoun={coupon}
                        bookingId={booking?.bookingid?.id} navigation={navigation} onSelect={(obj) => {
                            setCopoun(obj);
                            console.log(obj?.percentage)
                            setDiscount(obj?.percentage && !isAccepted ? obj?.percentage : 0)
                        }} />
                    {quotationList.length > 0 ? <Invoice offer={discount} quotationList={quotationList} paid={paid} /> : <></>}
                </View>

            </ScrollView>
            {
                completed ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center', elevation: 20, zIndex: 20, backgroundColor: '#F8F8F8', paddingHorizontal: 20 }}>
                        <Button
                            onPress={() => { navigation.navigate('Review', { data: booking?.bookingid }) }}
                            style={{ width: '40%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                            mode="contained"
                        ><Text style={{ color: '#ffffff', fontSize: 12, fontWeight: '400' }}>Review</Text></Button>
                        <Button onPress={() => { navigation.navigate('Dispute', { data: booking?.bookingid }) }}
                            style={{ width: '40%', marginVertical: 20, fontSize: 20, backgroundColor: '#F8F8F8', borderColor: '#05194E', borderWidth: 2, borderRadius: 10, paddingVertical: 0 }}
                            mode="contained"
                        ><Text style={{ color: '#05194E', fontSize: 12, fontWeight: '400' }}>Raise Dispute</Text></Button>
                    </View>
                    : isAccepted && !paid ?
                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', elevation: 20, zIndex: 20, backgroundColor: '#F8F8F8' }}>
                            <Button onPress={() => {
                                startPayment()
                            }}
                                loading={loading}
                                disabled={loading}
                                color='#05194E'
                                style={{ width: '50%', marginVertical: 20, fontSize: 20, borderRadius: 10, paddingVertical: 0 }}
                                mode="contained"
                            ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Make Payment</Text></Button>
                        </View>
                        :
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center', elevation: 20, zIndex: 20, backgroundColor: '#F8F8F8', paddingHorizontal: 20 }}>
                            <Button
                                onPress={() => { acceptBooking() }}
                                loading={loading}
                                disabled={loading}
                                color='#05194E'
                                style={{ width: '40%', marginVertical: 20, fontSize: 20, borderRadius: 10, paddingVertical: 0 }}
                                mode="contained"
                            ><Text style={{ color: '#ffffff', fontSize: 12, fontWeight: '400' }}>Accept</Text></Button>
                            <Button onPress={() => { setRejectModal(true) }}
                                style={{ width: '40%', marginVertical: 20, fontSize: 20, backgroundColor: '#F8F8F8', borderColor: '#05194E', borderWidth: 2, borderRadius: 10, paddingVertical: 0 }}
                                mode="contained"
                            ><Text style={{ color: '#05194E', fontSize: 12, fontWeight: '400' }}>Reject</Text></Button>
                        </View>
            }


            <Modal
                isVisible={rejectModal}
                hasBackdrop={true}
                backdropOpacity={0.3}
                backdropColor={"#000000"}
                animationType="fadeIn"
                swipeDirection={['down']}
                onSwipeComplete={() => { setRejectModal(false) }}
                onBackdropPress={() => { setRejectModal(false) }}
                style={{ margin: 30, justifyContent: "center", }}>
                <View style={{ backgroundColor: '#ffffff', paddingHorizontal: 30, paddingTop: 20, borderRadius: 15, display: 'flex', alignContent: 'center', alignItems: 'center', }}>
                    <Image source={require('./../../../assets/quot2.png')} style={{ width: Dimensions.get('screen').width / 4, height: Dimensions.get('screen').width / 2 }} />
                    <Text style={{ color: '#000000', textAlign: 'center', fontSize: 20, marginVertical: 10, fontWeight: '600' }}>We are sorry to hear that!</Text>
                    <Text style={{ color: '#000000', textAlign: 'center', width: '100%', fontWeight: '400' }}>Please specify reason for the rejection, so that we can improve our service next time</Text>

                    <View style={{ width: '100%' }}>

                        <View style={{ height: 1, backgroundColor: '#DCEBF7', marginVertical: 20 }} />
                        {
                            data3.map((item) => {
                                return (
                                    <BouncyCheckbox
                                        key={item}
                                        size={25}
                                        fillColor="#00B0EB"
                                        unfillColor="#FFFFFF"
                                        text={item}
                                        iconStyle={{ borderColor: "#00B0EB", borderRadius: 5 }}
                                        textStyle={{ textDecorationLine: "none", fontSize: 12 }}
                                        style={{ marginBottom: 10 }}
                                        onPress={(checked) => {

                                        }}
                                    />
                                )
                            })
                        }
                        <TextInput
                            style={{ height: Dimensions.get('screen').width / 4, backgroundColor: '#ffffff', borderRadius: 10, marginTop: 10, paddingHorizontal: 15, paddingVertical: 10, borderColor: '#cccccc', borderRadius: 10, borderWidth: 1 }}
                            multiline={true}
                            value={commentsReject}
                            textAlignVertical='top'
                            placeholder='Other Reason'
                            placeholderTextColor={'#ddd'}
                            onChangeText={(txt) => { setCommentsReject(txt) }}
                        />
                    </View>

                    <Button
                        onPress={() => { rejectBooking() }}
                        loading={loading}
                        disabled={loading}
                        color='#05194E'
                        style={{ width: '100%', marginVertical: 20, fontSize: 20, borderRadius: 10, paddingVertical: 0 }}
                        mode="contained">
                        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Submit</Text>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}
