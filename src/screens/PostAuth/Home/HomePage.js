import React from 'react';
import { View, Text, Image, ScrollView, Dimensions, StatusBar, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Button } from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetLocalAdSliders, GetServices, GetTopSliders, GetVideoSliders } from '../../../config/Apis/PublicApi';
import urlConfig from '../../../config/config.json'
import Loader from '../../../components/Loader';
import { openBrowser, openPhone } from '../../../config/Apis/Utils';
import { GetBookingsHomePage } from '../../../config/Apis/BookingApi';
import { BookingCard } from '../../../components/BookingCard';
import { RefreshControl } from 'react-native';
import QuotationAcceptModal from '../../../components/QuoatationAcceptModal';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function HomePage({ navigation }) {
    const [modal, setModal] = React.useState(false);
    const [modal1, setModal1] = React.useState(false);
    const [city, setCity] = React.useState('loading...');
    const [services, setServices] = React.useState([]);
    const [tempServices, settempServices] = React.useState([]);
    const [videoSliders, setVideoSliders] = React.useState([]);
    const [topSliders, setTopSliders] = React.useState([]);
    const [localSliders, setLocalSliders] = React.useState([]);
    const [currentBooking, setCurrentBookings] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [searchtext, setSearchText] = React.useState('');
    const [quotedBooking,setQuotedBooking] = React.useState({})


    let cureentCity = ''
    const filterServicesByCity = (services_new, cityId) => {

        if (services_new.length > 0 && cityId !== '') {

            return services_new.filter((service) => {
                let cityFound = false;
                service.service_locations.every((location) => {
                    if (location?.city?.name === cityId && location?.user_access) {
                        cityFound = true;
                        return false;
                    }
                    return true;
                })
                return cityFound;
            })

        }

        return services_new;
    }


    const searchServices = (text) => {
        setSearchText(text)
        if (text.length > 0) {
            setServices(services.filter(it => it.name.toLowerCase().includes(text.toLowerCase())))
        } else {
            setServices(tempServices)
        }
    }



    const getSliders = () => {
        GetTopSliders().then(res => {
            if (res.data.length > 0) {
                setTopSliders(res.data)
            }
        }).catch(err => {
            console.log("errTOP", err)
        })
        GetVideoSliders().then(res => {
            if (res.data.length > 0) {
                setVideoSliders(res.data)
            }
        }).catch(err => {
            console.log("errTOP", err)
        })
        GetLocalAdSliders().then(res => {
            if (res.data.length > 0) {
                setLocalSliders(res.data)
            }
        }).catch(err => {
            console.log("errTOP", err)
        })
    }
    const [load, setLoad] = React.useState(0);

    const getCurrent = (item) => {
        if (item.bookingstatusid?.name !== 'BOOKING_CANCELLED' &&
            item.bookingstatusid?.name !== 'BOOKING_COMPLETED' &&
            item.bookingstatusid?.name !== 'BOOKING_CREATED' &&
            item.bookingstatusid?.name !== 'BOOKING_RESCHEDULED' &&
            item.bookingstatusid?.name !== 'BOOKING_ASSIGNED'
        ) {
            return item;
        }
    }

    
    const getModal = (token,user) =>{
       
        axios.get(`http://homvery-dev.us-west-2.elasticbeanstalk.com:1337/bookingstatusmaps?bookingid.createdby=${user}&bookingid.approval_status=PENDING&_sort=id:DESC&bookingstatusid.name=QUOTATION_CREATED`,{
            headers:{
                Authorization: 'Bearer ' + token,
            }
        }).then(res=>{
            if(res.status === 200 && res.data.length > 0){
                console.log("booking ==================",res.data[0])
                setQuotedBooking(res.data[0])
                setModal(true)
            }
        }).catch(err=>{
            console.log('err',err)
        })
    }

    useFocusEffect(
        React.useCallback(() => {
        getSliders()
        setLoading(true)
        
        AsyncStorage.multiGet(['CITY', 'API_TOKEN', 'USER_ID'], (err, items) => {
            if (err) {
                console.log("ERROR===================", err);
            } else {
                console.log("DOOM===============", items)
                cureentCity = items[0][1]
                setCity(items[0][1])
                getModal(items[1][1],items[2][1])
                if (items[1][1] !== null && items[2][1] !== null) {
                    GetBookingsHomePage(items[2][1], items[1][1])
                        .then(res => {
                            if (res.status === 200) {
                                let data = res.data;
                                let bookings = []
                                data.forEach(item => {
                                    let findItem = bookings.find((x) => x.bookingid.id === item.bookingid.id);
                                    if (!findItem) {
                                        bookings.push(item)
                                    }
                                })
                                setCurrentBookings(bookings.filter(getCurrent))
                                
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                }

                GetServices()
                    .then(res => {
                        setLoading(false)
                        if (res.status === 200) {
                            let data = filterServicesByCity(res.data, items[0][1])
                            setServices(data)
                            settempServices(data)
                        }
                    }).catch(err => {
                        setLoading(false)

                        console.log(err);
                    })
            }
        })

    }, [load]))



    const data3 = [
        "Price is on higher sidet", "Not satisfied with technician", "Delay in service", "Others"
    ]

    function ServiceBtn(props) {
        return <TouchableOpacity
            onPress={props.onPress}
            style={{
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                width: Dimensions.get('screen').width / 4,
                height: Dimensions.get('screen').width / 4,
                marginVertical: 0,
                position: 'relative'
            }}>
            <Image source={props.image} style={{ width: 40, height: 40 }} />
            <Text style={{ fontSize: 12, color: '#000000', marginTop: 10, width: Dimensions.get('screen').width / 4 - 30, textAlign: 'center' }}>{props.text}</Text>
            <View style={{ opacity: 0.7, height: Dimensions.get('screen').width / 4 - 30, width: 0.7, backgroundColor: '#ccc', position: 'absolute', right: 0, marginLeft: 1 }} />
            <View style={{ opacity: 0.7, width: Dimensions.get('screen').width / 4 - 30, height: 0.5, backgroundColor: '#ccc', position: 'absolute', bottom: 0 }} />
        </TouchableOpacity>
    }

    const onRefresh = () => {
        setLoad(load + 1)
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Loader loading={loading} />
            <QuotationAcceptModal
                modal={modal}
                onBackDrop={()=>setModal(false)}
                setModal={setModal}
                onPress={() => {
                    setModal(false);
                    navigation.navigate('ServiceOngoing', { data: quotedBooking, assingedTo: quotedBooking.bookingid.assignedto, isAccepted: false, paid: false })
                }}
            />
            <StatusBar backgroundColor={'#25A8DE'} barStyle={'light-content'} />
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={onRefresh} />
            }>
                <Image style={{ width: Dimensions.get('screen').width }} source={require('../../../assets/hometop.png')} resizeMode='cover' />
                <View style={{ position: 'absolute', top: 0, width: Dimensions.get('screen').width }}>
                    <View style={{ paddingHorizontal: 20, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center', }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
                            <Icon onPress={() => {
                                navigation.navigate('SearchCity',{goBack:true})
                            }} name="map-marker" size={25} color={'#ffffff'} />
                            <Text onPress={() => {
                                navigation.navigate('SearchCity',{goBack:true})
                            }} style={{ color: '#ffffff', fontSize: 15 }}>{city}</Text>
                        </View>
                        <Icon name="bell" size={25} color={'#ffffff'} />
                    </View>
                    <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <Text style={{ color: '#ffffff', fontSize: 25, fontWeight: '700' }}>Homvery</Text>
                        <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: '700' }}>Services <Text style={{ fontWeight: '400' }}>to suit your</Text> needs</Text>
                    </View>

                </View>
                <View style={{ marginTop: -15, marginBottom: 10, flexDirection: 'row', paddingVertical: 0, paddingHorizontal: 20, borderRadius: 10, elevation: 5, alignItems: 'center', justifyContent: 'flex-start', marginHorizontal: 20, backgroundColor: '#ffffff' }}>
                    <AntDesign size={20} name="search1" color='#00b0eb' />
                    <TextInput
                        style={{ width: '70%', color: '#000000', fontSize: 18, paddingLeft: 20 }}
                        placeholder={'Search Services'}
                        maxLength={50}
                        value={searchtext}
                        onChangeText={searchServices}
                        placeholderTextColor={'#d8d8d8'}

                    />
                </View>
                {topSliders.length > 0 && <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {topSliders.length > 0 && topSliders.map(item => {
                        return <Image resizeMode='cover'  style={{ width: 255, marginLeft: 10, height: 125,borderRadius:12 }} source={item?.image?.formats?.small && item?.image?.formats?.small?.url ? { uri: item?.image?.formats?.small?.url  } : require('../../../assets/home1.png')} />
                    })

                    }
                </ScrollView>
                }

                {
                    currentBooking.length > 0 &&
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                        {
                            currentBooking.map(item => {

                                return <View style={{ padding: 5, margin: 5 }}>
                                    <BookingCard type={item?.bookingstatusid?.name} data={item} onPress={() => { navigation.navigate('ServiceUpcoming', { data: item }) }} />
                                </View>

                            })
                        }
                    </ScrollView>

                }
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10, backgroundColor: '#ffffff', elevation: 5, paddingBottom: 20 }}>
                    <Text style={{ textAlign: 'center', width: Dimensions.get('screen').width, marginVertical: 20, fontSize: 20, color: '#000000' }}>Our Services</Text>

                    {
                        services.length > 0 && services.map(item => {
                            console.log("pic---------------", item?.category?.name)
                            if (item?.category?.name === "Services") {
                                return (<ServiceBtn
                                    image={item.displayPic?.url ? { uri: item.displayPic?.url } : require('../../../assets/s1.png')}
                                    text={item.name}

                                    onPress={() => { navigation.navigate('Service', { data: item }) }}
                                />)
                            } else {
                                return <></>
                            }

                        })
                    }

                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10, backgroundColor: '#ffffff', elevation: 5, paddingBottom: 20 }}>
                    <Text style={{ textAlign: 'center', width: Dimensions.get('screen').width, marginVertical: 20, fontSize: 20, color: '#000000' }}>Book appointment with experts</Text>
                    {
                        services.length > 0 && services.map(item => {
                            console.log("pic---------------", item?.category?.name)
                            if (item?.category?.name === "Individual") {
                                return (<ServiceBtn
                                    image={item.displayPic?.url ? { uri:  item.displayPic?.url } : require('../../../assets/s1.png')}
                                    text={item.name}

                                    onPress={() => { navigation.navigate('Service', { data: item }) }}
                                />)
                            } else {
                                return <></>
                            }

                        })
                    }
                </View>
                <View style={{ marginVertical: 10, backgroundColor: '#f8f8f8', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', width: Dimensions.get('screen').width, marginVertical: 10, fontSize: 20, color: '#000000' }}>Why Homvery?</Text>
                    <Image source={require('../../../assets/why.png')} style={{ width: Dimensions.get('screen').width - 20, height: Dimensions.get('screen').width / 2.5, borderRadius: 10, marginBottom: 10 }} resizeMode='contain' />
                </View>
                <Text style={{ textAlign: 'center', width: Dimensions.get('screen').width, marginVertical: 10, fontSize: 20, color: '#000000' }}>What our customers are saying</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ elevation: 10, backgroundColor: '#ffffff', marginLeft: 10, marginVertical: 10, borderRadius: 15, paddingTop: 10, paddingHorizontal: 20 }}>
                        <View style={{ width: Dimensions.get('screen').width / 2, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                                <Image resizeMode='cover' style={{ width: 20, height: 20, borderRadius: 100 }} source={require('../../../assets/r1.png')} />
                                <Text style={{ marginLeft: 7, fontSize: 12, color: '#000000', fontWeight: '600' }}>Paresh K.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons size={18} name="star" color={'#41C461'} />
                                <Text style={{ marginLeft: 7, fontSize: 12, color: '#000000', fontWeight: '600' }}>4.3</Text>
                            </View>
                        </View>
                        <View style={{ height: 1, opacity: 0.5, backgroundColor: '#DCEBF7', marginTop: 15 }} />
                        <Text style={{ color: '#9D9D9D', fontSize: 11, marginVertical: 10, width: Dimensions.get('screen').width / 2 }}>
                            Lorem ipsum dolor sit amet, elitr consetetur sadipscing elitr, sed ut diam nonumy eirmod tempor et invidunt ut labore et dolore magna aliquyam erat, sed.
                        </Text>
                        {/* <Image resizeMode='cover' style={{ width: 206, height: 125, elevation: 10 }} source={require('../../../assets/r1.png')} /> */}
                    </View>
                    <View style={{ elevation: 10, backgroundColor: '#ffffff', marginLeft: 10, marginVertical: 10, borderRadius: 15, paddingTop: 10, paddingHorizontal: 20 }}>
                        <View style={{ width: Dimensions.get('screen').width / 2, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                                <Image resizeMode='cover' style={{ width: 20, height: 20, borderRadius: 100 }} source={require('../../../assets/r1.png')} />
                                <Text style={{ marginLeft: 7, fontSize: 12, color: '#000000', fontWeight: '600' }}>Paresh K.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons size={18} name="star" color={'#41C461'} />
                                <Text style={{ marginLeft: 7, fontSize: 12, color: '#000000', fontWeight: '600' }}>4.3</Text>
                            </View>
                        </View>
                        <View style={{ height: 1, opacity: 0.5, backgroundColor: '#DCEBF7', marginTop: 15 }} />
                        <Text style={{ color: '#9D9D9D', fontSize: 11, marginVertical: 10, width: Dimensions.get('screen').width / 2 }}>
                            Lorem ipsum dolor sit amet, elitr consetetur sadipscing elitr, sed ut diam nonumy eirmod tempor et invidunt ut labore et dolore magna aliquyam erat, sed.
                        </Text>
                        {/* <Image resizeMode='cover' style={{ width: 206, height: 125, elevation: 10 }} source={require('../../../assets/r1.png')} /> */}
                    </View>
                    <View style={{ elevation: 10, backgroundColor: '#ffffff', marginLeft: 10, marginVertical: 10, borderRadius: 15, paddingTop: 10, paddingHorizontal: 20 }}>
                        <View style={{ width: Dimensions.get('screen').width / 2, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                                <Image resizeMode='cover' style={{ width: 20, height: 20, borderRadius: 100 }} source={require('../../../assets/r1.png')} />
                                <Text style={{ marginLeft: 7, fontSize: 12, color: '#000000', fontWeight: '600' }}>Paresh K.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons size={18} name="star" color={'#41C461'} />
                                <Text style={{ marginLeft: 7, fontSize: 12, color: '#000000', fontWeight: '600' }}>4.3</Text>
                            </View>
                        </View>
                        <View style={{ height: 1, opacity: 0.5, backgroundColor: '#DCEBF7', marginTop: 15 }} />
                        <Text style={{ color: '#9D9D9D', fontSize: 11, marginVertical: 10, width: Dimensions.get('screen').width / 2 }}>
                            Lorem ipsum dolor sit amet, elitr consetetur sadipscing elitr, sed ut diam nonumy eirmod tempor et invidunt ut labore et dolore magna aliquyam erat, sed.
                        </Text>
                        {/* <Image resizeMode='cover' style={{ width: 206, height: 125, elevation: 10 }} source={require('../../../assets/r1.png')} /> */}
                    </View>
                </ScrollView>



                <Text style={{ textAlign: 'center', width: Dimensions.get('screen').width, marginVertical: 10, fontSize: 20, color: '#000000' }}>Our Videos</Text>
                {videoSliders.length > 0 && <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {videoSliders.length > 0 && videoSliders.map(item => {

                        return <TouchableOpacity onPress={() => {
                            if (item?.iframeUrl.length > 0) {
                                openBrowser(item?.iframeUrl)
                            }
                        }}
                            style={{ elevation: 10, backgroundColor: '#ffffff', marginLeft: 10, marginVertical: 10, borderRadius: 15 }}>
                            <Image
                                resizeMode='cover'
                                style={{ width: 200, height: 100, elevation: 10 }}
                                source={item?.image && item?.image?.url ? { uri: item?.image?.url } : require('../../../assets/vid1.png')} />
                                <Text style={{fontSize:14,width:200, textAlign:'justify',margin:5}}>{item?.description}</Text>
                        </TouchableOpacity>
                    })
                    }
                </ScrollView>}
                {localSliders.length > 0 &&
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {localSliders.length > 0 && localSliders.map(item => {

                            return <Image resizeMode='contain'
                                style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').width / 2.9 }}
                                source={item?.image && item?.image?.url ? { uri: item?.image?.url } : require('../../../assets/l1.png')} />
                        })
                        }
                    </ScrollView>}
            </ScrollView>
            <TouchableOpacity
            onPress={()=>openPhone('+917853802121')} 
            style={{ position: 'absolute', zIndex: 99, elevation: 5, width: Dimensions.get('screen').width / 7, height: Dimensions.get('screen').width / 7, backgroundColor: '#00B0EB', borderRadius: 1000, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', bottom: 20, right: 20 }}>
                <Icon name="headset" size={Dimensions.get('screen').width / 15} color={'#ffffff'} />
            </TouchableOpacity>
         
        </View>
    );
}
