import React from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ConfirmBooking({navigation}) {
    const width = Dimensions.get('screen').width;
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <View style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <Image
                        style={{ width: width / 1.5, height: width / 2 }}
                        source={require('../../../assets/confbook.png')} resizeMode='contain' />
                </View>
                <View style={{ padding: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>Booking Details</Text>
                        <TouchableOpacity onPress={() => { }}><Text style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>BH2908769  <MaterialCommunityIcons size={20} name='content-copy' color={'#000000'} /></Text></TouchableOpacity>
                    </View>
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
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center', elevation: 20, zIndex: 20, backgroundColor: '#F8F8F8', paddingHorizontal: 20 }}>
                <Button onPress={() => {
                        navigation.navigate('Homepage')
                }}
                    style={{ width: '45%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Reschedule</Text></Button>
                <Button onPress={() => { navigation.navigate('Homepage') }}
                    style={{ width: '45%', marginVertical: 20, fontSize: 20, backgroundColor: '#F8F8F8', borderColor: '#05194E', borderWidth: 2, borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#05194E', fontSize: 20, fontWeight: '400' }}>Cancel</Text></Button>
            </View>
        </View>
    );
}
