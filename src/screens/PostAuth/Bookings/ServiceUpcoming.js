import React from 'react';
import { useEffect } from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import { Button } from 'react-native-paper';
import { Accord } from '../../../components/common/Accordion/Accordion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CancelBoking, GetBookingStatus, GetTechinicianServices, RescheduleBooking } from '../../../config/Apis/BookingApi';
import { BookingStatusCard } from '../../../components/BookingStatusCard';
import { StepperStage } from '../../../components/common/Stepper';
import QuotationAcceptModal from '../../../components/QuoatationAcceptModal';
import { RefreshControl } from 'react-native';
import RescheduleModal from '../../../components/RescheduleModal';

export default function ServiceUpcoming({ navigation, route }) {

    let booking = route?.params?.data;
    const [quotationList, setQuotationList] = React.useState([])
    const [modal, setModal] = React.useState(false)
    const [remodal, setReModal] = React.useState(false)
    const [assingedTo, setAssingedTo] = React.useState({})
    const [stepper, setStepper] = React.useState(0)
    const [isReschedule, setReschedule] = React.useState(false)
    const [isCancel, setCancel] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [token, setToken] = React.useState('')

    console.log(booking?.bookingid)
    const updateStatus = (status) => {
        switch (status) {
            case 'TECHNICIAN_STARTED':
                setStepper(1)
                setCancel(false)
                setReschedule(true)
                break;
            case 'TECHNICIAN_REACHED':
                setStepper(2)
                setCancel(false)
                setReschedule(false)
                break;
            case 'QUOTATION_CREATED':
                setStepper(3)
                setCancel(false)
                setReschedule(false)
                setModal(true)
                break
            case 'QUOTATION_APPROVED':
                setStepper(3)
                setCancel(false)
                setReschedule(false)
                navigation.navigate('ServiceOngoing', { data: booking, assingedTo: assingedTo, isAccepted: true, paid: false })
                break
            case 'QUOTATION_REJECTED':
                setStepper(3)
                setCancel(false)
                setReschedule(false)
                break;
            case 'PAYMENT_COMPLETED':
                setStepper(4)
                setCancel(false)
                setReschedule(false)
                navigation.navigate('ServiceOngoing', { data: booking, assingedTo: assingedTo, isAccepted: true, paid: true })

                break;
            case 'BOOKING_COMPLETED':
                setStepper(5)
                setCancel(false)
                setReschedule(false)
                break;
                case 'BOOKING_RESCHEDULED':
                setStepper(0)
                setCancel(true)
                setReschedule(true)
                break;
            case 'BOOKING_CREATED':
                setCancel(true)
                setReschedule(true)
                break;
            default:
                setStepper(0)
                break;
        }
    }
    const [load, setLoad] = React.useState(0);


    const onRefresh = () => {
        setLoad(load + 1)
    }
    const [isRefresh, setRefresh] = React.useState(false);



    useEffect(() => {
        setRefresh(true);
        console.log("IoooooooooooD", booking?.bookingid?.id)
        AsyncStorage.multiGet(
            ['API_TOKEN', 'USER_ID'],
            (err, items) => {
                if (err) {
                    console.log("ERROR===================", err);
                } else {
                    setToken(items[0][1])
                    if (booking?.bookingid?.assignedto !== null) {
                        GetTechinicianServices(booking?.bookingid?.assignedto?.id, items[0][1])
                            .then(res => {
                                console.log("Err----------", res.data)
                                if (res.status === 200) {
                                    setAssingedTo(res.data[0])

                                }
                            }).catch(err => {
                                console.log(err)
                            })
                    } else {
                        console.log("ERR", booking?.bookingid?.assignedto?.id)
                    }

                    GetBookingStatus(booking?.bookingid?.id, items[0][1])
                        .then(res => {
                            setRefresh(false)
                            if (res.status === 200) {
                                updateStatus(res.data[0]?.bookingstatusid?.name)
                                console.log(res.data[0])
                            }
                        }).catch(err => {
                            setRefresh(false)

                            console.log(err)
                        })
                }
            })
    }, [load])


    const cancelBooking = () => {
        const body = {
            "bookingId": booking?.bookingid?.id,
            "comments": "Aise hie cancel kar diya"
        }

        CancelBoking(body, token)
            .then(res => {
                if (res.status === 200) {
                    ToastAndroid.show("Booking Canclled", ToastAndroid.SHORT)
                    navigation.goBack()
                }

            }).catch(err => {
                console.log(err)
            })
    }


    const bookingRescheduled = (from,to,comm) => {
        setLoading(true)
        const body = {
            bookingId: booking?.bookingid?.id,
            fromTime: from,
            toTime: to,
            comments: comm,
        }
        console.log(body)

        RescheduleBooking(token, body)
            .then(res => {
                setLoading(true)

                console.log("response----", res.data)
                if (res.status === 200) {
                   ToastAndroid.show("Booking Rescheduled!",ToastAndroid.SHORT)
                    navigation.goBack()
                }
            }).catch(err => {
                setLoading(true)

                console.log(err.response.data)
            })

    }


    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
            <QuotationAcceptModal
                modal={modal}
                setModal={setModal}
                onPress={() => {
                    navigation.navigate('ServiceOngoing', { data: booking, assingedTo: assingedTo, isAccepted: false, paid: false })
                }}
            />
            <RescheduleModal
                modal={remodal}
                setModal={setReModal}
                onReschedule={ bookingRescheduled }
            />
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefresh}
                        onRefresh={onRefresh} />
                }>
                <View style={{ padding: 20 }}>
                    <Accord data={route?.params?.data} />
                    <BookingStatusCard techDetails={assingedTo}
                        status={booking?.bookingstatusid?.name}
                        serviceType={booking?.bookingid?.serviceid?.name}
                        assingedTo={booking?.bookingid?.assignedto} />
                    <StepperStage active={stepper} />
                </View>
            </ScrollView>
            {(isReschedule || isCancel) && <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center', elevation: 20, zIndex: 20, backgroundColor: '#F8F8F8', paddingHorizontal: 20 }}>
                {isReschedule && <Button onPress={() => { setReModal(true) }}
                loading={loading}
                disabled={loading}
                    style={{ width: '45%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Reschedule</Text></Button>}
                {isCancel && <Button onPress={() => { cancelBooking() }}
                    style={{ width: '45%', marginVertical: 20, fontSize: 20, backgroundColor: '#F8F8F8', borderColor: '#05194E', borderWidth: 2, borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#05194E', fontSize: 15, fontWeight: '400' }}>Cancel</Text></Button>}
            </View>}
        </View>
    );
}
