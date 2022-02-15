import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TextInput, ToastAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-paper';
import { useEffect } from 'react';
import { UpdateUserAddress } from '../../../config/Apis/ProfileApi';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
DropDownPicker.setListMode("SCROLLVIEW");


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

export const FormTextInput = (props) => {
    const { label, placeholder, ...def } = props;
    return (
        <View style={{ marginBottom: 10, zIndex: 1 }}>
            {
                label && <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>{label}</Text>
            }
            <TextInput
                {...def}
                placeholder={placeholder}
                placeholderTextColor={'#D8D8D8'}
                style={{ borderWidth: 1, borderColor: '#00B0EB', borderRadius: 10, padding: 10 }}
            />
        </View>
    )
}

const FormDropDown = (props) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(props.value);
    const { label } = props;
    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    return (
        <View style={{ marginBottom: 10, zIndex: 5 }}>
            {
                label && <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>{label}</Text>
            }
            <DropDownPicker
                style={{ borderColor: '#00B0EB', borderWidth: 1 }}
                showTickIcon={false}
                dropDownContainerStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: '#00B0EB', borderWidth: 1

                }}
                containerStyle={{
                    borderColor: '#00B0EB',
                    backgroundColor: '#ffffff',
                    zIndex: 5
                }}
                placeholderStyle={{ color: '#D8D8D8' }}

                selectedItemContainerStyle={{
                    backgroundColor: '#00B0EB',
                }}
                selectedItemLabelStyle={{
                    color: "#ffffff"
                }}
                open={open}
                value={value}
                items={props.items}
                setOpen={setOpen}
                setValue={setValue}
                onSelectItem={props.setItems}
            />
        </View>
    );
}
export default function AddressEditPage({ navigation, route }) {
    React.useEffect(() => {
        DropDownPicker.setListMode("SCROLLVIEW");
    }, []);
    let initialVal = route?.params?.initialValue

    const [title, setTitle] = useState(initialVal ? initialVal.alias : '');
    const [flat, setFlat] = useState(initialVal ? initialVal.flat : '');
    const [street, setstreet] = useState(initialVal ? initialVal.street : '');
    const [addressLine, setaddressLine] = useState(initialVal ? initialVal.addressline1 : '');
    const [pincode, setpincode] = useState(initialVal ? initialVal.pincode : '');
    const [city, setcity] = useState(initialVal ? initialVal.city : '');
    const [type, settype] = useState(initialVal ? initialVal.type : '');
    const [phoneNumber, setphoneNumber] = useState(initialVal ? initialVal.phoneNumber : '');
    const [userId, setUserId] = React.useState('');
    const [token, setToken] = React.useState('');
    const [currentAddress, setCurrentAddress] = useState(route?.params.address)

    const [loading, setLoading] = React.useState(false);

    // let address = route?.params.address
    let coords = route?.params.coords

    useEffect(() => {
        AsyncStorageLib.multiGet(
            ['API_TOKEN', 'USER_ID'],
            (err, items) => {
                if (err) {
                    console.log("ERROR===================", err);
                } else {
                    setToken(items[0][1])
                    setUserId(items[1][1])
                }
            })

    }, [])



    const updateAddress = () => {
        if (title === '' || title === null || title === undefined) {
            ToastAndroid.show("Enter a Valid Title", ToastAndroid.SHORT)
            return;
        }
        if (flat === '' || flat === null || flat === undefined) {
            ToastAndroid.show("Enter a Valid flat No", ToastAndroid.SHORT)
            return;
        }
        if (street === '' || street === null || street === undefined) {
            ToastAndroid.show("Enter a Valid a Street Name", ToastAndroid.SHORT)
            return;
        }
        if (addressLine === '' || addressLine === null || addressLine === undefined) {
            ToastAndroid.show("Enter a Valid addressLine", ToastAndroid.SHORT)
            return;
        }
        if (city === '' || city === null || city === undefined) {
            ToastAndroid.show("Enter a Valid city", ToastAndroid.SHORT)
            return;
        }
        if (pincode === '' || pincode === null || pincode === undefined) {
            ToastAndroid.show("Enter a Valid pincode", ToastAndroid.SHORT)
            return;
        }
        if (phoneNumber === '' || phoneNumber === null || phoneNumber === undefined || phoneNumber?.length !== 10) {
            ToastAndroid.show("Enter a Valid phoneNumber", ToastAndroid.SHORT)
            return;
        }



        if (initialVal === undefined) {
            const body =
            {
                "alias": title,
                "flat": flat,
                "street": street,
                "addressline1": addressLine,
                "landmark": "",
                "active": true,
                "pincode": pincode,
                "city": city,
                "phoneNumber": phoneNumber,
                "type": type,
                "latitude": coords[0],
                "longitude": coords[0]
            }
            setLoading(true)
            let address = [...currentAddress, body]
            console.log("ADDRES ----------", address.length, [...currentAddress, body])
            UpdateUserAddress(userId, token, { address: address })
                .then(res => {
                    setLoading(false)
                    if (res.status === 200) {
                        ToastAndroid.show("Address Saved!", ToastAndroid.SHORT)
                        navigation.goBack()
                        navigation.goBack()
                    }

                }).catch(err => {
                    setLoading(false)
                    console.log(err)
                    ToastAndroid.show("Some Error Occured", ToastAndroid.SHORT)
                })


        } else {
            const body =
            {
                "id": initialVal.id,
                "alias": title,
                "flat": flat,
                "street": street,
                "addressline1": addressLine,
                "landmark": "",
                "active": true,
                "pincode": pincode,
                "city": city,
                "phoneNumber": phoneNumber,
                "type": type,
                "latitude": coords[0],
                "longitude": coords[0]
            }
            setLoading(true)
            let address = currentAddress.filter(item => item.id !== initialVal.id )
            console.log("ADDD=========", address)
            UpdateUserAddress(userId, token, { address: [...address,body] })
                .then(res => {
                    setLoading(false)
                    if (res.status === 200) {
                        ToastAndroid.show("Address Updated!", ToastAndroid.SHORT)
                        navigation.goBack()
                    }

                }).catch(err => {
                    setLoading(false)
                    console.log(err)
                    ToastAndroid.show("Some Error Occured", ToastAndroid.SHORT)
                })


        }

    }




    const width = Dimensions.get('screen').width;
    const data2 = [
        {
            name: 'Home',
            iconName: 'home-variant-outline'

        },
        {
            name: 'Work',
            iconName: 'home-city-outline'

        },
        {
            name: 'Others',
            iconName: 'map-marker-outline'

        },

    ]
    const [problem, setProblem] = React.useState(0);


    const setAddressType = (index) => {
        setProblem(index)
        settype(data2[index].name)
    }

    const setCityItems = (item) => {
        console.log(item)
        setcity(item.label)
    }

    const setZipItems = (item) => {
        console.log(item)
        setpincode(item.label)
    }

    const [items, setItems] = React.useState([
        { label: 'Sambalpur', value: 'Sambalpur' },
        { label: 'Bhubaneshwar', value: 'Bhubaneshwar' },
        { label: 'Jharsuguda', value: 'Jharsuguda' },
        { label: 'Cuttack', value: 'Cuttack' },
        { label: 'Burla', value: 'Burla' },
        { label: 'Rourkela', value: 'Rourkela' },
    ]);
    const [zips, setZips] = React.useState([
        { label: '758965', value: '758965' },
        { label: '758963', value: '758963' },
        { label: '758966', value: '758966' },
    ]);

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Loader loading={loading} />
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <View style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: width / 1.5, height: width / 2 }}
                        source={require('../../../assets/addr.png')} resizeMode='contain' />
                </View>
                <View style={{ padding: 20 }}>
                    <FormTextInput label="Title" placeholder="Address 1" value={title} onChangeText={(txt) => { setTitle(txt) }} />
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flex: 1, paddingRight: 10 }}>
                            <FormTextInput value={flat} onChangeText={(txt) => { setFlat(txt) }} label="Door No" placeholder="Type Here" />
                        </View>
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <FormTextInput value={street} onChangeText={(txt) => { setstreet(txt) }} label="Street" placeholder="Type street name" />
                        </View>
                    </View>
                    <FormTextInput placeholder="Full Address here" value={addressLine} onChangeText={(txt) => { setaddressLine(txt) }} />
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flex: 1, paddingRight: 10 }}>
                            <FormDropDown label="City" value={city} items={items} setItems={setCityItems} />
                        </View>
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <FormDropDown label="Zip code" value={pincode} items={zips} setItems={setZipItems} />
                        </View>
                    </View>


                    <FormTextInput label="Mobile"
                        maxLength={10}
                        keyboardType='phone-pad'
                        placeholder="Type mobile number" value={phoneNumber} onChangeText={(txt) => { setphoneNumber(txt) }} />
                    {/* <FormTextInput label="Alternative Mobile" placeholder="Type mobile number" /> */}
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>Address Type</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>

                            {
                                data2.map((item, index) => {
                                    return <BtnGrp
                                        key={index}
                                        index={index}
                                        onPress={() => { setAddressType(index) }}
                                        name={item.name}
                                        iconName={item.iconName}
                                        customButtonStyle={{ width: 'auto', borderRadius: 5000, marginRight: 10 }}
                                        active={problem === index} />
                                })
                            }
                        </View>
                    </View>
                </View>

            </ScrollView>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', elevation: 20, zIndex: 20, backgroundColor: '#F8F8F8' }}>
                <Button onPress={() => {
                    updateAddress()
                }}
                    style={{ width: '60%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Save Address</Text></Button>
            </View>
        </View>
    );
}
