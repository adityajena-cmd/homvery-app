import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddressPage({navigation}) {
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView>
                <View style={{ paddingHorizontal: 20 }}>

                
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
                    {/* <View style={{ height: 1, backgroundColor: '#EAE2E2', marginBottom: 10 }} /> */}
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', }}>
                    <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>Manage Address</Text>
                    <TouchableOpacity onPress={() => { setBottomSheet(false) }}><MaterialCommunityIcons size={20} name='close' color={'#000000'} /></TouchableOpacity>
                        
                </View>
                <Button onPress={() => {
                    navigation.navigate('MapPage')
                }}
                    style={{ marginVertical: 10, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '500' }}>Add a new address</Text></Button>
                <View style={{ height: 1, backgroundColor: '#EAE2E2' }} /> */}
                    <Button onPress={() => {
                        navigation.navigate('MapPage')
                    }}
                        style={{ marginVertical: 10, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                        mode="contained"
                    ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Add a new address</Text></Button>
                    

                </View>
            </ScrollView>
        </View>
    );
}
