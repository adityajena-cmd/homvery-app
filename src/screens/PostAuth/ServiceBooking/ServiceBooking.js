import React from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ButtonGroup } from 'react-native-elements'
import Modal from "react-native-modal";

export function BtnGrp(props){
    return <Button
                onPress={()=>props.setPreferedTime(props.index)}
                mode='contained'
                style={{display: 'flex', flexDirection: 'row', justifyContent: 'center' , backgroundColor: props.active ? '#00B0EB':'#ffffff', color: '#ffffff', borderRadius: 50, marginBottom: 10, borderColor: '#00B0EB', borderWidth: 1, width: Dimensions.get('screen').width/2-30,alignContent: 'center',alignItems: 'center', ...props.customButtonStyle }}>
        {
            props.iconName && <MaterialCommunityIcons style={{ color: props.active ? '#ffffff' : '#00B0EB', fontSize: 15,marginRight: 20 }} name={props.iconName}/>
        }
        <Text style={{ color: props.active ? '#ffffff' : '#00B0EB', fontSize: 12, }}>{props.name}</Text>
            </Button>
};
export default function ServiceBooking({ navigation }) {

    const width = Dimensions.get('screen').width;    
    
    const [preferedTime, setPreferedTime] = React.useState(0);
    const [problem, setProblem] = React.useState(0);
    const [bottomSheet, setBottomSheet] = React.useState(false);
    const [bottomSheet2, setBottomSheet2] = React.useState(false);
    
    const data1 = [
        {
            name: '9.00 AM - 12.00 PM'
        },
        {
            name: '12.00 PM - 1.00 PM'
        },
        {
            name: '1.00 PM - 3.00 PM'
        },
        {
            name: '3.00 PM - 6.00 PM'
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
            name: 'X not working'
        },
        {
            name: 'abcd'
        },
        {
            name: 'xyz'
        },
         {
            name: 'abcd'
        },
        {
            name: 'xyz'
        },
    ]


    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1 }}>
                        <View style={{ backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', padding: 20, elevation: 7, zIndex: 10 }}>
                            <View>
                                <Text style={{ color: '#000', fontSize: 23, fontWeight: '600' }}>Address</Text>
                                <Text style={{ color: '#000000a3', fontSize: 15, }}>
                                    <MaterialCommunityIcons name="map-marker" color={'#000000'} style={{ marginHorizontal: 10 }} size={15} />  Patia, Bhubaneswar...</Text>
                            </View>
                            <Button onPress={() => {
                                setBottomSheet(true)
                            }}
                                style={{ marginVertical: 10, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                                mode="contained"
                            ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Change</Text></Button>
                        </View>
                        <View style={{ backgroundColor: '#ffffff', elevation: 6, padding: 20, zIndex: 9 }}>
                            <Text style={{ width: '100%', textAlign: 'center', color: '#000000', fontSize: 18 }}>On which date you want the service?</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                <Text style={{ textAlign: 'center', color: '#000000', fontSize: 12 }}>Dec 2021</Text>
                                <Text style={{ textAlign: 'center', color: '#000000', fontSize: 12 }}><MaterialCommunityIcons name='calendar-range' size={12} /> More Details</Text>
                            </View>
                            <Text style={{ width: '100%', textAlign: 'center', color: '#ddd', fontSize: 25, marginTop: 50 }}>CALENDAR</Text>
                        </View>
                        <View style={{ backgroundColor: '#ffffff', elevation: 5, padding: 20, zIndex: 8 }}>
                            <Text style={{ width: '100%', textAlign: 'center', color: '#000000', fontSize: 18 }}>Your Prefered Time?</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 }}>

                                {
                                    data1.map((item, index) => {
                                        return <BtnGrp
                                            key={index}
                                            index={index}
                                            setPreferedTime={setPreferedTime}
                                            name={item.name}
                                            active={preferedTime === index} />
                                    })
                                }
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#ffffff', elevation: 4, padding: 20, zIndex: 7 }}>
                            <Text style={{ width: '100%', textAlign: 'center', color: '#000000', fontSize: 18 }}>Tell us what problem you are facing</Text>
                            <TextInput
                                style={{ height: Dimensions.get('screen').width / 2, backgroundColor: '#ffffff', borderRadius: 10, elevation: 5, marginTop: 10, paddingHorizontal: 15, paddingVertical: 10 }}
                                multiline={true}
                                textAlignVertical='top'
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
                        style={{ width: '70%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
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
                        navigation.navigate('MapPage')
                    }}
                        style={{ marginVertical: 10, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                        mode="contained"
                    ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Add a new address</Text></Button>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2' }} />
                    <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500', marginVertical: 10 }}>Saved Address</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'flex-start', }}>
                        <MaterialCommunityIcons size={40} color={'#000000'} name='home-variant-outline' />
                        <View style={{ flex: 1, paddingLeft: 20 }}>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>Lorem ipsum</Text>
                            <Text style={{ color: '##707070', fontSize: 12, fontWeight: '500' }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam </Text>
                            <Text style={{ color: '##707070', fontSize: 12, fontWeight: '500' }}>8936789367</Text>
                            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <Button
                                    onPress={() => { }}
                                    mode='contained'
                                    style={{ backgroundColor: '#ffffff', color: '#ffffff', borderRadius: 5, marginBottom: 10, borderColor: '#00B0EB', borderWidth: 1, }}>
                                    <Text style={{ color: '#00B0EB', fontSize: 12, }}>Edit</Text>
                                </Button>
                                <Button
                                    onPress={() => { }}
                                    mode='contained'
                                    style={{ marginLeft: 20, backgroundColor: '#ffffff', color: '#ffffff', borderRadius: 5, marginBottom: 10, borderColor: '#ffffff', borderWidth: 1, }}>
                                    <Text style={{ color: '#00B0EB', fontSize: 12, }}>Remove</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginBottom: 10 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'flex-start', }}>
                        <MaterialCommunityIcons size={40} color={'#000000'} name='office-building' />
                        <View style={{ flex: 1, paddingLeft: 20 }}>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>Lorem ipsum</Text>
                            <Text style={{ color: '##707070', fontSize: 12, fontWeight: '500' }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam </Text>
                            <Text style={{ color: '##707070', fontSize: 12, fontWeight: '500' }}>8936789367</Text>
                            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <Button
                                    onPress={() => { }}
                                    mode='contained'
                                    style={{ backgroundColor: '#ffffff', color: '#ffffff', borderRadius: 5, marginBottom: 10, borderColor: '#00B0EB', borderWidth: 1, }}>
                                    <Text style={{ color: '#00B0EB', fontSize: 12, }}>Edit</Text>
                                </Button>
                                <Button
                                    onPress={() => { }}
                                    mode='contained'
                                    style={{ marginLeft: 20, backgroundColor: '#ffffff', color: '#ffffff', borderRadius: 5, marginBottom: 10, borderColor: '#ffffff', borderWidth: 1, }}>
                                    <Text style={{ color: '#00B0EB', fontSize: 12, }}>Remove</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginBottom: 10 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'flex-start', }}>
                        <MaterialCommunityIcons size={40} color={'#000000'} name='map-marker-outline' />
                        <View style={{ flex: 1, paddingLeft: 20 }}>
                            <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>Lorem ipsum</Text>
                            <Text style={{ color: '##707070', fontSize: 12, fontWeight: '500' }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam </Text>
                            <Text style={{ color: '##707070', fontSize: 12, fontWeight: '500' }}>8936789367</Text>
                            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <Button
                                    onPress={() => { }}
                                    mode='contained'
                                    style={{ backgroundColor: '#ffffff', color: '#ffffff', borderRadius: 5, marginBottom: 10, borderColor: '#00B0EB', borderWidth: 1, }}>
                                    <Text style={{ color: '#00B0EB', fontSize: 12, }}>Edit</Text>
                                </Button>
                                <Button
                                    onPress={() => { }}
                                    mode='contained'
                                    style={{ marginLeft: 20, backgroundColor: '#ffffff', color: '#ffffff', borderRadius: 5, marginBottom: 10, borderColor: '#ffffff', borderWidth: 1, }}>
                                    <Text style={{ color: '#00B0EB', fontSize: 12, }}>Remove</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginBottom: 10 }} />
                </View>
            </Modal>
            <Modal
                isVisible={bottomSheet2}
                hasBackdrop={true}
                backdropOpacity={0.3}
                backdropColor={"#000000"}
                animationType="slideUp"
                swipeDirection={['down']}
                onSwipeComplete={() => { setBottomSheet2(false) }}
                onBackdropPress={() => { setBottomSheet2(false) }}
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
                        <TouchableOpacity onPress={() => { setBottomSheet2(false) }}><MaterialCommunityIcons size={20} name='close' color={'#000000'} /></TouchableOpacity>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10 }} />
                    <View style={{ padding: 20 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={{ paddingRight: 20 }}>
                                <Image style={{marginTop: 10}} source={require('../../../assets/sc1.png')} resizeMode='cover'/>
                            </View>
                            <View >
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Service Type</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400' }}>Air Conditioner Service</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={{ paddingRight: 20 }}>
                                <Image style={{marginTop: 10}} source={require('../../../assets/sc2.png')} resizeMode='cover'/>
                            </View>
                            <View >
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Service Location</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400' }}>Lorem ipsum dolor sit amet, consetetur ipsum dolor sit amet, consetetur   </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={{ paddingRight: 20 }}>
                                <Image style={{marginTop: 10}} source={require('../../../assets/sc3.png')} resizeMode='cover'/>
                            </View>
                            <View >
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Date & time</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400' }}>12 Sep 2021    12.00 PM - 3.00 PM</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ paddingRight: 20 }}>
                                <Image style={{marginTop: 10}} source={require('../../../assets/sc4.png')} resizeMode='cover'/>
                            </View>
                            <View >
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '600' }}>Problem Statement</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400' }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt</Text>
                            </View>
                        </View>
                        
                    </View>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Button onPress={() => {
                            navigation.navigate('ConfirmBooking')
                        }}
                            style={{ width: '60%', marginVertical: 10, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                            mode="contained"
                        ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Confirm</Text></Button>
                    </View>
                    <View style={{ backgroundColor: '#F2FCF6', borderRadius: 12, padding: 20, justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
                        <AntDesign name="exclamationcircleo" color={'#00C72E'} size={35} />
                        <Text style={{ color: '#000000', fontSize: 16, fontWeight: '600', marginLeft: 20, width: width/1.5 }}>Coupon code can be applied on payment after during the service only</Text>
                    </View>
                </View>
            </Modal>
        </>
    );
}
