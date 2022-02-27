import React, { useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, TextInput, Image, ToastAndroid } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ButtonGroup } from 'react-native-elements'
import Modal from "react-native-modal";
import CustomCalendar from '../../../components/common/CustomCalendar/CustomCalendar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserDeatils, UpdateUserAddress } from '../../../config/Apis/ProfileApi';
import moment from 'moment';
import { CreateBooking } from '../../../config/Apis/BookingApi';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../../components/Loader';


export function BtnGrp(props) {
    return <Button
        onPress={props.onPress}
        mode='contained'
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: props.active ? '#00B0EB' : '#ffffff', color: '#ffffff', borderRadius: 50, marginBottom: 10, borderColor: '#00B0EB', borderWidth: 1, width: Dimensions.get('screen').width / 2 - 30, alignContent: 'center', alignItems: 'center', ...props.customButtonStyle }}>
        {
            props.iconName && <MaterialCommunityIcons style={{ color: props.active ? '#ffffff' : '#00B0EB', fontSize: 15, marginRight: 20 }} name={props.iconName} />
        }
        <Text style={{ color: props.active ? '#ffffff' : '#00B0EB', fontSize: 12, }}>{props.name}</Text>
    </Button>
};
export default function ServiceBooking({ navigation, route }) {

    const width = Dimensions.get('screen').width;

    const [preferedTime, setPreferedTime] = React.useState(-1);
    const [problem, setProblem] = React.useState(0);
    const [issue, setIssue] = React.useState('');
    const [savedCity, setSavedCity] = React.useState('');
    const [bottomSheet, setBottomSheet] = React.useState(false);
    const [bottomSheet2, setBottomSheet2] = React.useState(false);
    const [userId, setUserId] = React.useState('');
    const [token, setToken] = React.useState('');
    const [addressLine, setAddressLine] = React.useState('Select a Address ...');
    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [address, setAddress] = React.useState([]);
    const [selectedAddress, setSelectedAddress] = React.useState({});
    let service = route?.params?.data
    const [scheduledDate, setScheduledDate] = React.useState(new Date())
    const [load, setLoad] = React.useState(0);

    console.log(service?.id)
    useFocusEffect(
        React.useCallback(() => {
            setLoading(true)
            AsyncStorage.multiGet(
                ['API_TOKEN', 'USER_ID','CITY'],
                (err, items) => {
                    if (err) {
                        console.log("ERROR===================", err);
                    } else {
                        setToken(items[0][1])
                        setUserId(items[1][1])
                        setSavedCity(items[2][1])
                        GetUserDeatils(items[1][1], items[0][1])
                            .then(res => {
                                setLoading(false)

                                if (res.status === 200) {
                                    setAddress(res?.data?.address)
                                }
                            }).catch(err => {
                                setLoading(false)

                                console.log('err', err)
                            })
                    }
                })
        }, [load]))

    const data1 = [
        {
            name: '9.00AM - 12.00PM',
            fromTime: { h: 9, m: 0 },
            toTime: { h: 12, m: 0 },
        },
        {
            name: '12.00PM - 1.00PM',
            fromTime: { h: 12, m: 0 },
            toTime: { h: 13, m: 0 },
        },
        {
            name: '1.00PM - 3.00PM',
            fromTime: { h: 13, m: 0 },
            toTime: { h: 15, m: 0 },
        },
        {
            name: '3.00PM - 6.00PM',
            fromTime: { h: 15, m: 0 },
            toTime: { h: 18, m: 0 },
        },

    ]

    const data2 = [
        {
            name: 'AC not cooling'
        },
        {
            name: 'General servicing'
        },
        {
            name: 'remote  not working'
        },
        {
            name: 'Mcb fuse'
        },

    ]


    const getAddresLogo = (type = 'home') => {
        switch (type) {
            case 'Home':
            case 'home':
                return 'home-variant-outline'
                break
            case 'Work':
            case 'work':
                return 'office-building'
                break
            case 'other':
            case 'Other':
                return 'map-marker-outline'
                break
            default:
                return 'map-marker-outline'

        }
    }


    const removeAddress = (id) => {
        setLoading(true)
        let newList = address.map((item) => {
            if (item.id === id) {
                let updatedItem = {
                    ...item,
                    active: false,
                };

                return updatedItem;
            }

            return item;
        });

        UpdateUserAddress(userId, token, { address: newList })
            .then(res => {
                setLoading(false)
                if (res.status === 200) {
                    setLoad(load + 1)
                }
            }).catch(err => {
                setLoading(false)
                console.log(err)
            })
    }


    const updateTime = time => {
        setPreferedTime(time)
        let current = moment(scheduledDate).format('YYYY-MM-DD')
        let startT = data1[time].fromTime?.h.toString() + ':' + data1[time].fromTime?.m.toString() + '0'
        let endT = data1[time].toTime?.h.toString() + ':' + data1[time].toTime?.m.toString() + '0'
        let fd = moment(current + ' ' + startT)
        let td = moment(current + ' ' + endT)

        setFromDate(fd.utc().utcOffset("+05:30"))
        setToDate(td.utc().utcOffset("+05:30"))
    }

    const selectAdd = (item) =>{
        if(savedCity !== item?.city){
            ToastAndroid.show("Service not available in this location",ToastAndroid.SHORT)

        }else{
            setAddressLine(item?.addressline1 + ", " + item?.city);
             setSelectedAddress(item);
              setBottomSheet(false) 
        }
    }


    const confirmBooking = () => {
        setLoading(true)
        const body = {
            "totime": toDate,
            "serviceid": service?.id,
            "bookingId": 'HV' + (Math.floor(1000000 + Math.random() * 9000000)).toString(),
            "address": selectedAddress,
            "fromtime": fromDate,
            "booking_medium": "APP",
            "updated_by": parseInt(userId),
            "createdby": parseInt(userId),
            "problem": issue
        }
        console.log(body)
        CreateBooking(body, token)
            .then(res => {
                setLoading(false)

                if (res.status === 200) {
                    setBottomSheet2(false)
                    navigation.navigate('ConfirmBooking', { data: body, service: service, token: token })
                }
            }).catch(err => {
                setLoading(false)
                if(err.response.status === 400){
                    ToastAndroid.show("Some Server error occured ! \nTry Later!",ToastAndroid.SHORT);

                }
                console.log("ERR", err.response.data?.message)
            })

    }
    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <Loader loading={loading} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1 }}>
                        <View style={{ backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', padding: 20, elevation: 7, zIndex: 10 }}>
                            <View style={{maxWidth:"80%"}}>
                                <Text style={{ color: '#000', fontSize: 23, fontWeight: '600' }}>Address</Text>
                                <Text style={{ color: '#000000a3', fontSize: 15 }}>
                                    <MaterialCommunityIcons name="map-marker" color={'#000000'} style={{ marginHorizontal: 10 }} size={15} />{addressLine}</Text>
                            </View>
                            <Button onPress={() => {
                                setBottomSheet(true)
                                //
                            }}
                                style={{ marginVertical: 10, fontSize: 16, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 ,marginLeft:20}}
                                mode="contained"
                            ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Change</Text></Button>
                        </View>
                        <View style={{ backgroundColor: '#ffffff', elevation: 6, padding: 20, zIndex: 9 }}>
                            <Text style={{ width: '100%', textAlign: 'center', color: '#000000', fontSize: 18 }}>On which date you want the service?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                <Text style={{ textAlign: 'center', color: '#000000', fontSize: 12 }}>Dec 2021</Text>
                                <Text style={{ textAlign: 'center', color: '#000000', fontSize: 12 }}><MaterialCommunityIcons name='calendar-range' size={12} /> More Details</Text>
                            </View>
                            <CustomCalendar
                                setTimestamp={(ts) => { setScheduledDate(ts) }}
                            />
                        </View>
                        <View style={{ backgroundColor: '#ffffff', elevation: 5, padding: 20, zIndex: 8 }}>
                            <Text style={{ width: '100%', textAlign: 'center', color: '#000000', fontSize: 18 }}>Your Prefered Time?</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 }}>

                                {
                                    data1.map((item, index) => {
                                        return <BtnGrp
                                            key={index}
                                            index={index}
                                            onPress={() => { updateTime(index) }}
                                            name={item.name}
                                            active={preferedTime === index} />
                                    })
                                }
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#ffffff', elevation: 4, padding: 20, zIndex: 7 }}>
                            <Text style={{ width: '100%', textAlign: 'center', color: '#000000', fontSize: 18 }}>Tell us what problem you are facing</Text>
                            <TextInput
                                style={{ height: Dimensions.get('screen').width / 3, backgroundColor: '#ffffff', borderRadius: 10, elevation: 5, marginTop: 10, paddingHorizontal: 15, paddingVertical: 10 }}
                                multiline={true}
                                value={issue}
                                textAlignVertical='top'
                                onChangeText={(text) => setIssue(text)}
                                placeholder='Please write your problem statement here'
                                placeholderTextColor={'#ddd'}

                            />
                        </View>
                        <View style={{ backgroundColor: '#ffffff', elevation: 4, padding: 20, zIndex: 7 }}>
                            <Text style={{ width: '100%', textAlign: 'center', color: '#000000', fontSize: 18 }}>Or choose specific  problems</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>

                                {
                                    data2.map((item, index) => {
                                        return <BtnGrp
                                            key={index}
                                            index={index}
                                            setPreferedTime={setProblem}
                                            onPress={() => { setIssue(item.name); setProblem(index) }}
                                            name={item.name}
                                            customButtonStyle={{ width: 'auto', borderRadius: 5, marginRight: 10 }}
                                            active={problem === index} />
                                    })
                                }
                            </View>
                        </View>


                    </View>
                </ScrollView>
                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', elevation: 20, zIndex: 20, backgroundColor: '#F8F8F8' }}>
                    <Button onPress={() => {
                        setBottomSheet2(true)
                    }}
                        disabled={selectedAddress?.city === undefined || fromDate === null || toDate === null}
                        color='#05194E'
                        style={{ width: '70%', marginVertical: 20, fontSize: 20, borderRadius: 10, paddingVertical: 0 }}
                        mode="contained"
                    ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Proceed to Book</Text></Button>
                </View>
            </View>
            <Modal
                isVisible={bottomSheet}
                hasBackdrop={true}
                backdropOpacity={0.3}
                backdropColor={"#000000"}
                animationType="slideUp"
                swipeDirection={['down']}
                onSwipeComplete={() => { setBottomSheet(false) }}
                onBackdropPress={() => { setBottomSheet(false) }}
                style={{ margin: 0, justifyContent: "flex-end", }}>
                <View style={{
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    borderColor: '#00000000',
                    height: 'auto',
                    paddingBottom: 12,
                    minHeight: 200,
                    padding: 20
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: '#000000', fontSize: 20, fontWeight: '500' }}>Manage Address</Text>
                        <TouchableOpacity onPress={() => { setBottomSheet(false) }}><MaterialCommunityIcons size={20} name='close' color={'#000000'} /></TouchableOpacity>

                    </View>
                    <Button onPress={() => {
                        setBottomSheet(false)
                        navigation.navigate('MapPage', { data: address })
                    }}
                        style={{ marginVertical: 10, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                        mode="contained"
                    ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Add a new address</Text></Button>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2' }} />
                    <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500', marginVertical: 10 }}>Saved Address</Text>
                    {
                        address && address.length > 0 ?
                            address.map(item => {
                                if (item.active) {
                                    return (
                                        <>
                                            <TouchableOpacity activeOpacity={0.9} onPress={() => { selectAdd(item) }} style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'flex-start', }}>
                                                <MaterialCommunityIcons size={40} color={'#000000'} name={getAddresLogo(item?.type)} />
                                                <View style={{ flex: 1, paddingLeft: 20 }}>
                                                    <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>{item?.alias ? item?.alias : 'N/A'}</Text>
                                                    <Text style={{ color: '##707070', fontSize: 12, fontWeight: '500' }}>{(item?.addressline1 ? item?.addressline1 : 'N/A') + ", " + (item?.pincode && item.pincode) + ",\n" + (item?.city && item?.city)}</Text>
                                                    <Text style={{ color: '##707070', fontSize: 12, fontWeight: '500' }}>{item?.phoneNumber ? item?.phoneNumber : 'N/A'}</Text>
                                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                                        <Button
                                                            onPress={() => { navigation.navigate('AddressEditPage', { coords: [item.latitude, item.longitude], address: address, initialValue: item }) }}
                                                            mode='contained'
                                                            style={{ backgroundColor: '#ffffff', color: '#ffffff', borderRadius: 5, marginBottom: 10, borderColor: '#00B0EB', borderWidth: 1, }}>
                                                            <Text style={{ color: '#00B0EB', fontSize: 12, }}>Edit</Text>
                                                        </Button>
                                                        <Button
                                                            onPress={() => {
                                                                removeAddress(item.id)
                                                            }}
                                                            mode='contained'
                                                            style={{ marginLeft: 20, backgroundColor: '#ffffff', color: '#ffffff', borderRadius: 5, marginBottom: 10, borderColor: '#ffffff', borderWidth: 1, }}>
                                                            <Text style={{ color: '#00B0EB', fontSize: 12, }}>Remove</Text>
                                                        </Button>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ height: 1, backgroundColor: '#EAE2E2', marginBottom: 10 }} />

                                        </>
                                    )
                                }
                            }) : <>
                                <Text style={{ textAlign: 'center', fontSize: 17, marginTop: 15, marginBottom: 20, fontWeight: '600' }}>No Address Found! Please add some new address.</Text></>
                    }



                </View>
            </Modal>
            <Modal
                isVisible={bottomSheet2}
                hasBackdrop={true}
                backdropOpacity={0.3}
                backdropColor={"#000000"}
                animationType="slideUp"
                swipeDirection={['down']}
                onSwipeComplete={() => { if (!loading) setBottomSheet2(false) }}
                onBackdropPress={() => { if (!loading) setBottomSheet2(false) }}
                style={{ margin: 0, justifyContent: "flex-end", }}>
                <View style={{
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    borderColor: '#00000000',
                    height: 'auto',
                    paddingBottom: 12,
                    minHeight: 200,
                    padding: 20
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: '#000000', fontSize: 20, fontWeight: '500' }}>Booking Details</Text>
                        <TouchableOpacity onPress={() => { if (!loading) setBottomSheet2(false) }}><MaterialCommunityIcons size={20} name='close' color={'#000000'} /></TouchableOpacity>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10 }} />
                    <View style={{ padding: 20 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={{ paddingRight: 20, left: 10 }}>
                                <Image style={{ marginTop: 10 }} source={require('../../../assets/sc1.png')} resizeMode='cover' />
                            </View>
                            <View style={{ left: 10 }}>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Service Type</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400' }}>{service.name}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={{ paddingRight: 20 }}>
                                <Image style={{ marginTop: 10 }} source={require('../../../assets/sc2.png')} resizeMode='cover' />
                            </View>
                            <View >
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Service Location</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400' }}>{addressLine}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={{ paddingRight: 20 }}>
                                <Image style={{ marginTop: 10 }} source={require('../../../assets/sc3.png')} resizeMode='cover' />
                            </View>
                            <View >
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Date & time</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400' }}>{moment(fromDate).utcOffset("+05:30").format('Do MMM hh:mm a') + " - " + moment(toDate).utcOffset("+05:30").format('Do MMM hh:mm a')}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ paddingRight: 20 }}>
                                <Image style={{ marginTop: 10 }} source={require('../../../assets/sc4.png')} resizeMode='cover' />
                            </View>
                            <View >
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Problem Statement</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400' }}>{issue}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Button onPress={() => {

                            confirmBooking()
                        }}
                            color="#05194E"
                            loading={loading}
                            disabled={loading}
                            style={{ width: '60%', marginVertical: 10, fontSize: 20, borderRadius: 10, paddingVertical: 0 }}
                            mode="contained"
                        ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Confirm</Text></Button>
                    </View>
                    <View style={{ backgroundColor: '#F2FCF6', borderRadius: 12, padding: 20, justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
                        <AntDesign name="exclamationcircleo" color={'#00C72E'} size={35} />
                        <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', marginLeft: 20, width: width / 1.5 }}>Coupon code can be applied on payment after during the service only</Text>
                    </View>
                </View>
            </Modal>
        </>
    );
}
