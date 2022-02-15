import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../../components/Loader';
import { GetUserDeatils, UpdateUserAddress } from '../../../config/Apis/ProfileApi';

export default function AddressPage({ navigation }) {
    const [address, setAddress] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [token, settoken] = React.useState('');
    const [userId, setuserId] = React.useState('');
    const [load, setLoad] = React.useState(0);



    useFocusEffect(
        React.useCallback(() => {
            setLoading(true)
            AsyncStorageLib.multiGet(
                ['API_TOKEN', 'USER_ID'],
                (err, items) => {
                    if (err) {
                        console.log("ERROR===================", err);
                    } else {
                        setuserId(items[1][1])
                        settoken(items[0][1])
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

        console.log(newList)
        UpdateUserAddress(userId, token, {address:newList})
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


    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Loader loading={loading} />
            <ScrollView>
                <View style={{ paddingHorizontal: 20 }}>
                    {
                        address && address.length > 0 ?
                            address.map(item => {
                                if (item.active) {
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
                                }else{
                                    return <></>
                                }
                            }) : <>
                                <Text style={{ textAlign: 'center', fontSize: 17, marginTop: 15, marginBottom: 20, fontWeight: '600' }}>No Address Found! Please add some new address.</Text></>
                    }



                    <Button onPress={() => {
                        navigation.navigate('MapPage', { data: address })
                    }}
                        style={{ marginVertical: 10, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                        mode="contained"
                    ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Add a new address</Text></Button>


                </View>
            </ScrollView>
        </View>
    );
}
