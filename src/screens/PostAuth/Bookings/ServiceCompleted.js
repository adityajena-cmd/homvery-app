import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Rating, AirbnbRating } from 'react-native-ratings';

export const Accord = () => {
    const [accordion, setAccordion] = React.useState(true);
    const width = Dimensions.get('screen').width;
    return (
        <TouchableOpacity onPress={() => { setAccordion(!accordion) }} style={{ padding: 10, backgroundColor: '#ffffff', borderRadius: 10, marginBottom: 10, elevation: 3 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#00B0EB', fontSize: 18 }}>Booking Details</Text>
                {
                    accordion ?
                        <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>BH2908769  <MaterialCommunityIcons size={17} name='content-copy' color={'#000000'} /></Text>
                        :
                        <MaterialCommunityIcons name='chevron-down' size={18} color={'grey'} />
                }
                            
            </View>
            {
                accordion &&
                <>
                    <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10 }} />
                    <View style={{ padding: 20 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={{ paddingRight: 20 }}>
                                <Image style={{marginTop: 10}} source={require('../../../assets/sc1.png')} resizeMode='cover'/>
                            </View>
                            <View >
                                <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Service Type</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>Air Conditioner Service</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={{ paddingRight: 20 }}>
                                <Image style={{marginTop: 10}} source={require('../../../assets/sc2.png')} resizeMode='cover'/>
                            </View>
                            <View >
                                <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Service Location</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>Lorem ipsum dolor sit amet, consetetur ipsum dolor sit amet, consetetur   </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <View style={{ paddingRight: 20 }}>
                                <Image style={{marginTop: 10}} source={require('../../../assets/sc3.png')} resizeMode='cover'/>
                            </View>
                            <View >
                                <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Date & time</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>12 Sep 2021    12.00 PM - 3.00 PM</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ paddingRight: 20 }}>
                                <Image style={{marginTop: 10}} source={require('../../../assets/sc4.png')} resizeMode='cover'/>
                            </View>
                            <View >
                                <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600' }}>Problem Statement</Text>
                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '400', width: width / 1.5 }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt</Text>
                            </View>
                        </View>
                        
                    </View>
                </>
            }
        </TouchableOpacity>
    )
}

export const BookingStatusCard = () => {
    const width = Dimensions.get('screen').width;
    return (
        <View style={{ padding: 10, backgroundColor: '#ffffff', borderRadius: 10, marginBottom: 10, elevation: 3 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#00B0EB', fontSize: 18 }}>Technician</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: '#E39328', marginRight: 10 }} />
                    <Text style={{ fontSize: 15, color: '#E39328', fontWeight: '600' }}>Assigned</Text>
                </View>
            </View>
            <View style={{ height: 1.5, backgroundColor: '#DCEBF7', marginVertical: 10 }} />
            <View style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <Image source={require('../../../assets/user.png')} resizeMode='contain' style={{ height: 50, width: 50 }} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 15, marginBottom: 1, fontWeight: '600', width: width/3.5 }} numberOfLines={1}>Paresh Kumar</Text>
                        <Text style={{ color: '#9d9d9d', fontSize: 12, marginBottom: 1, fontWeight: '600', width: width/3.5 }} numberOfLines={1}>Electrician</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{ backgroundColor: '#277B3B', paddingHorizontal: 5, borderRadius: 5, paddingVertical: 2, }}>
                                <Text style={{ color: '#ffffff', fontSize: 12 }}><MaterialCommunityIcons size={12} name="star" color={'#ffffff'} /> 4.3</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: 1.5, height: '100%', backgroundColor: '#DCEBF700', marginHorizontal: 10 }} />
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', alignContent: 'center', borderLeftColor: '#DCEBF7', borderLeftWidth: 2 }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <Fontisto name="injection-syringe" color={'#00B0EB'} size={25} />
                        <Text style={{ fontSize: 15, color: '#707070', fontWeight: '500', marginLeft: 10 }}>Vaccinated</Text>
                    </View>
                    <TouchableOpacity style={{ marginTop: 10, borderColor: '#00B0EB', borderWidth: 1, borderRadius: 8, padding: 5, }}>       
                        <Text style={{ color: '#00B0EB', fontSize: 15 }}>View Certificate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export const TrickImg = () => {
    const width = Dimensions.get('screen').width;
    return (
        <TouchableOpacity>
            <Image style={{ width: width - 40, height: width / 3.5, marginBottom: 5 }} source={require('../../../assets/tricksImg.png')} resizeMode='contain' />
        </TouchableOpacity>
    )
}

export const Invoice = (props) => {
    const width = Dimensions.get('screen').width;
    return (
        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, padding: 20 }}>
            <Text style={{ color: '#000000', fontSize: 14, textAlign: 'center' }}>Payment Details</Text>
            <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10, marginBottom: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#000000', fontSize: 14 }}>Coin discount </Text>
                        <Image source={require('../../../assets/coin.png')} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14 }}>Base Payment</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14 }}>Extra Amount</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14 }}>Part 1</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14 }}>Part 2</Text>
                    </View>
                </View>
                {
                    props.paid && <View>
                    <Image style={{ width: width / 3, height: width / 3, }} source={require('../../../assets/paid.png')} />
                </View>
                }
                
                <View>
                    <View style={{}}>
                        <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right', marginTop: 20 }}>-₹80</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>₹500</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>₹300</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>₹200</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>₹400</Text>
                    </View>
                </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#EAE2E2', marginTop: 10 }} />
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#000000', fontSize: 14, fontWeight: '600' }}>Total Payable Amount</Text>
                <Text style={{ color: '#000000', fontSize: 14, textAlign: 'right' }}>₹1400</Text>
            </View>
        </View>
    )
}

export const RatingComp = () => {
    const width = Dimensions.get('screen').width;
    return (
        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, padding: 20, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
            <Image source={require('../../../assets/techGuy.png')} style={{ width: width / 4, height: width / 4 }} />
            <View style={{ marginLeft: 20 }}>
                <Text style={{ color: '#000000', fontWeight: '600', fontSize: 16 }}>Air Conditioner Service</Text>
                <Rating
                    style={{ paddingVertical: 10 }}
                />
            </View>
        </View>
    )
}

export const StepperStage = ({stage}) => {
    const width = Dimensions.get('screen').width;
    return (
        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, padding: 10, paddingTop: 30 }}>
                        <View style={{borderBottomColor: '#000000', borderBottomWidth: 1, borderStyle: 'dashed', width: '80%', alignSelf: 'center', marginBottom: -10}}/>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
                            <View style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                                <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 },  ![1,2,3,4,5].includes(stage) && {tintColor: '#E9E9E9'}]} source={require('../../../assets/steperTick.png')} />
                                <Image resizeMode='cover' style={[{ width: width / 15, height: width / 6, marginBottom: 20 }, ![1,2,3,4,5].includes(stage) && {tintColor: '#E9E9E9'}]} source={require('../../../assets/steper1.png')} />
                                <Text style={{fontWeight: '700', color: '#000000', width: width / 6, fontSize: 10, textAlign: 'center'}}>Technician Started</Text>
                            </View>

                            <View style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                                <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 },  ![2,3,4,5].includes(stage) && {tintColor: '#E9E9E9'}]} source={require('../../../assets/steperTick.png')} />
                                <Image resizeMode='cover' style={[{ width: width / 8+20, height: width / 6, marginBottom: 20 }, ![2,3,4,5].includes(stage) && {tintColor: '#E9E9E9'}]} source={require('../../../assets/steper2.png')} />
                                <Text style={{fontWeight: '700', color: '#000000', width: width / 6, fontSize: 10, textAlign: 'center'}}>Technician Arrived</Text>
                            </View>

                            <View style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                                <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 },  ![3,4,5].includes(stage) && {tintColor: '#E9E9E9'}]} source={require('../../../assets/steperTick.png')} />
                                <Image resizeMode='cover' style={[{ width: width / 8+10, height: width / 6, marginBottom: 20 }, ![3,4,5].includes(stage) && {tintColor: '#E9E9E9'}]} source={require('../../../assets/steper3.png')} />
                                <Text style={{fontWeight: '700', color: '#000000', width: width / 6, fontSize: 10, textAlign: 'center'}}>Quotation Started</Text>
                            </View>

                            <View style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                                <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 },  ![4,5].includes(stage) && {tintColor: '#E9E9E9'}]} source={require('../../../assets/steperTick.png')} />
                                <Image resizeMode='cover' style={[{ width: width / 6, height: width / 6, marginBottom: 20 }, ![4,5].includes(stage) && {tintColor: '#E9E9E9'}]} source={require('../../../assets/steper4.png')} />
                                <Text style={{fontWeight: '700', color: '#000000', width: width / 6, fontSize: 10, textAlign: 'center'}}>Payment Done</Text>
                            </View>

                            <View style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                                <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 },  ![5].includes(stage) && {tintColor: '#E9E9E9'}]} source={require('../../../assets/steperTick.png')} />
                                <Image resizeMode='cover' style={[{ width: width / 20, height: width / 6, marginBottom: 20 }, ![5].includes(stage) && {tintColor: '#E9E9E9'}]}  source={require('../../../assets/steper5.png')} />
                                <Text style={{fontWeight: '700', color: '#000000', width: width / 6, fontSize: 10, textAlign: 'center'}}>Job Completed</Text>
                            </View>
                        </View>
                    </View>
    )
}

export default function ServiceCompleted({ navigation }) {
    

    

    return (
        <View style={{ backgroundColor: '#F8F8F8', flex: 1 }}>
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <Accord/>
                    <BookingStatusCard />
                    <TrickImg />
                    <Invoice paid={true} />
                    <RatingComp />
                </View>
            </ScrollView>
        </View>
    );
}
