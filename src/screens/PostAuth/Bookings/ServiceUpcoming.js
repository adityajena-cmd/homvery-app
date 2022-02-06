import React from 'react';
import { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { Accord } from '../../../components/common/Accordion/Accordion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetBookingStatus, GetTechinicianServices } from '../../../config/Apis/BookingApi';
import { BookingStatusCard } from '../../../components/BookingStatusCard';
import { StepperStage } from '../../../components/common/Stepper';

export default function ServiceUpcoming({ navigation, route }) {

    let booking = route?.params?.data;
    const [quotationList, setQuotationList] = React.useState([])
    const [assingedTo, setAssingedTo] = React.useState({})
    const [stepper, setStepper] = React.useState(0)
    const [isReschedule, setReschedule] = React.useState(false)
    const [isCancel, setCancel] = React.useState(false)

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
            case 'QUOTATION_APPROVED':
            case 'QUOTATION_REJECTED':
                setStepper(3)
                setCancel(false)
                setReschedule(false)
                break;
            case 'PAYMENT_COMPLETED':
                setStepper(4)
                setCancel(false)
                setReschedule(false)
                break;
            case 'BOOKING_COMPLETED':
                setStepper(5)
                setCancel(false)
                setReschedule(false)
                break;

            default:
                setStepper(0)
                break;
        }
    }


    useEffect(() => {
        console.log("ID", booking?.bookingid?.assignedto?.id)
        AsyncStorage.multiGet(
            ['API_TOKEN', 'USER_ID'],
            (err, items) => {
                if (err) {
                    console.log("ERROR===================", err);
                } else {
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
                            if (res.status === 200) {
                                updateStatus(res.data[0]?.bookingstatusid?.name)
                                console.log(res.data[0])
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                }
            })
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                {isReschedule && <Button onPress={() => { }}
                    style={{ width: '45%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Reschedule</Text></Button>}
                {isCancel && <Button onPress={() => {  }}
                    style={{ width: '45%', marginVertical: 20, fontSize: 20, backgroundColor: '#F8F8F8', borderColor: '#05194E', borderWidth: 2, borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#05194E', fontSize: 15, fontWeight: '400' }}>Cancel</Text></Button>}
            </View>}
        </View>
    );
}
