import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GetUserDeatils } from '../../../config/Apis/ProfileApi';

export default function AddressPage({ navigation }) {
    const [address, setAddress] = React.useState([]);

    useEffect(() => {

        AsyncStorageLib.multiGet(
            ['API_TOKEN', 'USER_ID'],
            (err, items) => {
                if (err) {
                    console.log("ERROR===================", err);
                } else {
                    GetUserDeatils(items[1][1], items[0][1])
                        .then(res => {
                            if (res.status === 200) {
                                setAddress(res?.data?.address)
                            }
                        }).catch(err => {
                            console.log('err', err)
                        })
                }
            })
    })

    
    const getAddresLogo = (type = 'home') => {
        switch (type) {
            case 'home':
                return 'home-variant-outline'
                break
            case 'work':
                return 'office-building'
                break
            case 'other':
                return 'map-marker-outline'
                break
            default:
                return 'map-marker-outline'

        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView>
                <View style={{ paddingHorizontal: 20 }}>
                    {
                        address && address.length > 0 ?
                            address.map(item => {
                                return (
                                    <>
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => { }} style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'flex-start', }}>
                                            <MaterialCommunityIcons size={40} color={'#000000'} name={getAddresLogo(item?.type)} />
                                            <View style={{ flex: 1, paddingLeft: 20 }}>
                                                <Text style={{ color: '#000000', fontSize: 15, fontWeight: '500' }}>{item?.alias ? item?.alias : 'N/A'}</Text>
                                                <Text style={{ color: '##707070', fontSize: 12, fontWeight: '500' }}>{(item?.addressline1 ? item?.addressline1 : 'N/A') + ", " + (item?.pincode && item.pincode) + ",\n" + (item?.city && item?.city)}</Text>
                                                <Text style={{ color: '##707070', fontSize: 12, fontWeight: '500' }}>{item?.phoneNumber ? item?.phoneNumber : 'N/A'}</Text>
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
                                        </TouchableOpacity>
                                        <View style={{ height: 1, backgroundColor: '#EAE2E2', marginBottom: 10 }} />

                                    </>
                                )
                            }) : <>
                                <Text style={{ textAlign: 'center', fontSize: 17, marginTop: 15, marginBottom: 20, fontWeight: '600' }}>No Address Found! Please add some new address.</Text></>
                    }



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
