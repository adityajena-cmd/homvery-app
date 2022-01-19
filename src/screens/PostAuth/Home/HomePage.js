import React from 'react';
import { View, Text, Image, ScrollView, Dimensions, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Button } from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Modal from "react-native-modal";

export default function HomePage({ navigation }) {
    const [modal, setModal] = React.useState(false);
    const [modal1, setModal1] = React.useState(false);
    React.useEffect(() => {
        // setTimeout(()=>{setModal(true)},2000)
    }, [])
    
    const data3 = [
    "Price is on higher sidet", "Not satisfied with technician", "Delay in service", "Others"
]

    function ServiceBtn(props) {
        return <TouchableOpacity
            onPress={()=>{navigation.navigate('Service')}}
            style={{
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            width: Dimensions.get('screen').width / 4,
            height: Dimensions.get('screen').width / 4,
            marginVertical: 0,
            position: 'relative'
        }}>
            <Image source={props.image} />
            <Text style={{ fontSize: 12, color: '#000000', marginTop: 10, width: Dimensions.get('screen').width / 4 - 30, textAlign: 'center' }}>{props.text}</Text>
            <View style={{ opacity: 0.7,height: Dimensions.get('screen').width / 4 - 30, width: 0.7, backgroundColor: '#ccc', position: 'absolute', right: 0, marginLeft:1 }} />
            <View style={{ opacity: 0.7,width: Dimensions.get('screen').width / 4-30, height: 0.5, backgroundColor: '#ccc', position: 'absolute', bottom: 0 }}/>
        </TouchableOpacity>
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <StatusBar backgroundColor={'#25A8DE'} barStyle={'light-content'} />
            <ScrollView>
                <Image style={{ width: Dimensions.get('screen').width }} source={require('../../../assets/hometop.png')} resizeMode='cover' />
                <View style={{ position: 'absolute', top: 0, width: Dimensions.get('screen').width }}>
                    <View style={{ paddingHorizontal: 20, paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center', }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
                            <Icon name="map-marker" size={25} color={'#ffffff'} />
                            <Text style={{ color: '#ffffff', fontSize: 15 }}> Bhubaneswar</Text>
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
                        placeholder={'Search City'}
                        maxLength={50}
                        placeholderTextColor={'#d8d8d8'}
                            
                    />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Image resizeMode='cover' style={{ width: 255, marginLeft: 10, height: 125 }} source={require('../../../assets/home1.png')} />
                    <Image resizeMode='cover' style={{ width: 255, marginLeft: 10, height: 125 }} source={require('../../../assets/home2.png')} />
                    <Image resizeMode='cover' style={{ width: 255, marginLeft: 10, height: 125 }} source={require('../../../assets/home2.png')} />
                    <Image resizeMode='cover' style={{ width: 255, marginLeft: 10, height: 125 }} source={require('../../../assets/home1.png')} />
                </ScrollView>
                <View style={{ paddingHorizontal: 10, backgroundColor: 'white', marginTop: 15 }}>
                    <View style={{ backgroundColor: '#ffffff', elevation: 5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#00B0EB', fontSize: 18 }}>AC Repair</Text>
                            <Text style={{ color: '#000000', fontSize: 14 }}><Text style={{ fontWeight: '600' }}>Booking No:</Text> BH2908769</Text>
                        </View>
                        <View style={{ height: 1.5, backgroundColor: '#DCEBF7', marginTop: 5 }} />
                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <MaterialCommunityIcons name="calendar-range" color={'#000000'} size={30} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>14-Sep-2021</Text>
                                            <Text style={{ fontSize: 10, color: '#9d9d9d', fontWeight: '600' }}>(10.00 AM - 1.00 PM)</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <MaterialCommunityIcons name="map-marker" color={'#000000'} size={30} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 12, color: '#9d9d9d', fontWeight: '600' }}>Lorem ipsum dolor...</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: 1.5, height: '100%', backgroundColor: '#DCEBF7', marginHorizontal: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: '#00B0EB', fontSize: 15, marginBottom: 10 }}>Technician</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../../../assets/user.png')} resizeMode='contain' style={{ height: 40, width: 40 }} />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ color: '#000000', fontSize: 15, marginBottom: 5, fontWeight: '600' }}>Paresh K</Text>
                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <View style={{ backgroundColor: '#277B3B', paddingHorizontal: 5, borderRadius: 5, paddingVertical: 2, }}>
                                                    <Text style={{ color: '#ffffff', fontSize: 8 }}><MaterialCommunityIcons size={8} name="star" color={'#ffffff'} /> 4.3</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#DCEBF7', marginTop: 5 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
       
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: '#41C461', marginRight: 10 }} />
                                <Text style={{ fontSize: 15, color: '#41C461', fontWeight: '600' }}>Completed</Text>
                            </View>
                            <Button
                                onPress={() => { navigation.navigate('ServiceOngoing') }}
                                style={{ width: 'auto', fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                                mode="contained">
                                <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: '400' }}>Payment</Text>
                            </Button>
                            {/* <Text style={{ fontSize: 15, color: '#000000', fontWeight: '600' }}>View Details</Text> */}
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10, backgroundColor: '#ffffff', elevation: 5, paddingBottom: 20 }}>
                    <Text style={{ textAlign: 'center', width: Dimensions.get('screen').width, marginVertical: 20, fontSize: 20, color: '#000000' }}>Our Services</Text>
                    <ServiceBtn
                        image={require('../../../assets/s1.png')}
                        text={'Electrician'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/s2.png')}
                        text={'Plumber'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/s3.png')}
                        text={'AC Service'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/s4.png')}
                        text={'Appliance'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/s5.png')}
                        text={'Packers & Movers'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/s6.png')}
                        text={'Sanitization'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/s7.png')}
                        text={'Purifier'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/s8.png')}
                        text={'DTH Service'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/s9.png')}
                        text={'Laptop/Desktop'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/s10.png')}
                        text={'House Cleaning'}
                    />
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10, backgroundColor: '#ffffff', elevation: 5, paddingBottom: 20 }}>
                    <Text style={{ textAlign: 'center', width: Dimensions.get('screen').width, marginVertical: 20, fontSize: 20, color: '#000000' }}>Book appointment with experts</Text>
                    <ServiceBtn
                        image={require('../../../assets/b1.png')}
                        text={'Construction'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/b2.png')}
                        text={'Interior Design'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/b3.png')}
                        text={'Wedding Planner'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/b4.png')}
                        text={'Web/App'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/b5.png')}
                        text={'Baloon Decoration'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/b6.png')}
                        text={'Flower Decoration'}
                    />
                    <ServiceBtn
                        image={require('../../../assets/b7.png')}
                        text={'Solar Installation'}
                    />
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
                        <Text style={{color: '#9D9D9D', fontSize: 11,marginVertical:10, width: Dimensions.get('screen').width / 2}}>
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
                        <Text style={{color: '#9D9D9D', fontSize: 11,marginVertical:10, width: Dimensions.get('screen').width / 2}}>
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
                        <Text style={{color: '#9D9D9D', fontSize: 11,marginVertical:10, width: Dimensions.get('screen').width / 2}}>
                            Lorem ipsum dolor sit amet, elitr consetetur sadipscing elitr, sed ut diam nonumy eirmod tempor et invidunt ut labore et dolore magna aliquyam erat, sed.
                        </Text>
                        {/* <Image resizeMode='cover' style={{ width: 206, height: 125, elevation: 10 }} source={require('../../../assets/r1.png')} /> */}
                    </View>
                </ScrollView>
                <Text style={{ textAlign: 'center', width: Dimensions.get('screen').width, marginVertical: 10, fontSize: 20, color: '#000000' }}>Our Videos</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={{ elevation: 10, backgroundColor: '#ffffff', marginLeft: 10, marginVertical: 10, borderRadius: 15 }}><Image resizeMode='cover' style={{ width: 200, height: 130, elevation: 10 }} source={require('../../../assets/vid1.png')} /></View>
                    <View style={{ elevation: 10, backgroundColor: '#ffffff', marginLeft: 10, marginVertical: 10, borderRadius: 15 }}><Image resizeMode='cover' style={{ width: 200, height: 130, elevation: 10 }} source={require('../../../assets/vid2.png')} /></View>
                    <View style={{ elevation: 10, backgroundColor: '#ffffff', marginLeft: 10, marginVertical: 10, borderRadius: 15 }}><Image resizeMode='cover' style={{ width: 200, height: 130, elevation: 10 }} source={require('../../../assets/vid3.png')} /></View>
                </ScrollView>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Image resizeMode='contain' style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').width / 2.9 }} source={require('../../../assets/l1.png')} />
                    <Image resizeMode='contain' style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').width / 2.9 }} source={require('../../../assets/l1.png')} />
                </ScrollView>
            </ScrollView>
            <TouchableOpacity style={{ position: 'absolute', zIndex: 99, elevation: 5, width: Dimensions.get('screen').width / 7, height: Dimensions.get('screen').width / 7, backgroundColor: '#00B0EB', borderRadius: 1000, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', bottom: 20, right: 20 }}>
                <Icon name="headset" size={Dimensions.get('screen').width / 15} color={'#ffffff'} />
            </TouchableOpacity>
            <Modal
                isVisible={modal}
                hasBackdrop={true}
                backdropOpacity={0.3}
                backdropColor={"#000000"}
                animationType="fadeIn"
                swipeDirection={['down', "up", "left", "right"]}
                onSwipeComplete={() => { setModal(false) }}
                onBackdropPress={() => { setModal(false) }}
                style={{ margin: 30, justifyContent: "center", }}>
                <View style={{ backgroundColor: '#ffffff', padding: 20, borderRadius: 15, display: 'flex', alignContent: 'center', alignItems: 'center', }}>
                    <Image source={require('./../../../assets/quot1.png')} style={{ width: Dimensions.get('screen').width / 2, height: Dimensions.get('screen').width / 2 }} />
                    <Text style={{ color: '#000000', textAlign: 'center', fontSize: 20, marginVertical: 10, fontWeight: '600' }}>Quotation has been shared</Text>
                    <Text style={{ color: '#000000', textAlign: 'center', width: '70%', fontWeight: '400' }}>Please review and accept the payment details</Text>
                    <Button
                        onPress={() => { setModal(false); setModal1(true); }}
                        style={{ width: '100%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                        mode="contained">
                        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Done</Text>
                    </Button>
                </View>
            </Modal>
            <Modal
                isVisible={modal1}
                hasBackdrop={true}
                backdropOpacity={0.3}
                backdropColor={"#000000"}
                animationType="fadeIn"
                swipeDirection={['down', "up", "left", "right"]}
                onSwipeComplete={() => { setModal1(false) }}
                onBackdropPress={() => { setModal1(false) }}
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
                                        onPress={() => { }}
                                    />
                                )
                            })
                        }
                        <TextInput
                            style={{ height: Dimensions.get('screen').width / 4, backgroundColor: '#ffffff', borderRadius: 10, marginTop: 10, paddingHorizontal: 15, paddingVertical: 10, borderColor: '#cccccc', borderRadius: 10, borderWidth: 1 }}
                            multiline={true}
                            textAlignVertical='top'
                            placeholder='Other Reason'
                            placeholderTextColor={'#ddd'}
                        />
                    </View>
                    
                    <Button
                        onPress={() => { setModal1(false) }}
                        style={{ width: '100%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                        mode="contained">
                        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Submit</Text>
                    </Button>
                </View>
            </Modal>
        </View>
    );
}
