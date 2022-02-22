import React from 'react';
import { useState, useEffect } from 'react';

import { View, Text, ScrollView, Dimensions, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { Button } from 'react-native-paper';
import { UpdateUser, UpdateUserDeatils, UploadProfile } from '../../../config/Apis/ProfileApi';
import { getDate } from '../../../config/Apis/Utils';
import { launchCamera } from 'react-native-image-picker';
import { requestCameraPermisiion } from '../../../config/LocaitonProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Alert } from 'react-native';
import axios from 'axios';
export const FormTextInput = (props) => {
    const { label, placeholder, ...def } = props;
    return (
        <View style={{ marginBottom: 10, zIndex: 1, flex: 1 }}>
            {
                label && <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>{label}</Text>
            }
            <TextInput
                {...def}
                placeholder={placeholder}
                placeholderTextColor={'#D8D8D8'}
                style={{ borderWidth: 2, borderColor: '#00B0EB', borderRadius: 10, padding: 10, }}
            />
        </View>
    )
}

export default function PersonalDetails({ navigation, route }) {

    
    useEffect(() => {
        requestCameraPermisiion()

    }, []);

    const width = Dimensions.get('screen').width
    let token = route?.params?.token
    let user = route?.params?.data
    let userId = route?.params?.userId

    const [loading, setLoading] = React.useState(false)
    const [firstname, setFirstName] = React.useState(user?.firstname ? user?.firstname : '')
    const [lastname, setLastname] = React.useState(user?.lastname ? user?.lastname : '')
    const [email, setEmail] = React.useState(user?.email ? user?.email : '')
    const [phoneNumber, setphoneNumber] = React.useState(user?.phonenumber ? user?.phonenumber : '')
    const [alternatephonenumber, setalternatephonenumber] = React.useState(user?.alternatephonenumber ? user?.alternatephonenumber : '')
    const [day, setday] = React.useState(user?.dob ? getDate(user?.dob)[2] : '')
    const [month, setmonth] = React.useState(user?.dob ? getDate(user?.dob)[1] : '')
    const [year, setyear] = React.useState(user?.dob ? getDate(user?.dob)[0] : '')
    const [profilesource, setProfileSource] = useState('')

    const UploadImage = (doc) => {
        console.log(doc)
        let formData = new FormData()
        formData.append('files', doc)
        UploadProfile(token, formData)
            .then(res => {
                if (res.status === 200) {
                    console.log("response", res.data[0].id)
                    let userForm = new FormData()
                    userForm.append('profilepic', res.data[0].id)
                    UpdateUser(userId, token, userForm,true)
                        .then(res => {
                            console.log(res.status)
                            ToastAndroid.show('Image Uploaded!', ToastAndroid.SHORT);

                        }).catch(err => {
                            console.log("Update", err.response.data)
                        })
                }
            }).catch(err => {
                console.log("Upload", err.response.data)

            })
    }
    const askForUpload = (doc) => {
        return Alert.alert(
            "Upload Image?",
            "Are you sure you want to Update Profile Pic?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {
                        UploadImage(doc)

                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    }

    const options = {
        mediaType: 'photo',
        cameraType: 'front',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },

    }

    const addImage = () => {
        console.log('YH')
        launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const { error, uri, originalRotation } = response
                console.log("ROTATTEEE------", originalRotation)
                const source = { uri: response.uri };
                setProfileSource(source)
                console.log('response', JSON.stringify(response));
                const doc = {
                    name: response.assets[0].fileName,
                    type: response.assets[0].type,
                    uri: Platform.OS === 'android' ? response.assets[0].uri : response.assets[0].uri.replace('file://', ''),
                };
                setProfileSource({ uri: doc.uri })
                askForUpload(doc)
            }
        });
    }





    const updateUser = () => {
        if (day?.length == 0 || day == null || day == undefined || day === 'NA') {
            ToastAndroid.show('Enter a Valid Date!', ToastAndroid.SHORT);
            return;
        }
        if (month?.length == 0 || month == null || month == undefined || month === 'NA') {
            ToastAndroid.show('Enter a Valid Date!', ToastAndroid.SHORT);
            return;
        }
        if (year?.length == 0 || year == null || year == undefined || year === 'NA') {
            ToastAndroid.show('Enter a Valid Date!', ToastAndroid.SHORT);
            return;
        }
        if (email?.length == 0 || email == null || email == undefined || email === 'NA') {
            ToastAndroid.show('Enter a Valid Email!', ToastAndroid.SHORT);
            return;
        }
        // if (phoneNumber?.length == 0 || phoneNumber == null || phoneNumber == undefined || phoneNumber === 'NA') {
        //     ToastAndroid.show('Enter a Valid Phone Number!', ToastAndroid.SHORT);
        //     return;
        // }
        if (alternatephonenumber?.length == 0 || alternatephonenumber == null || alternatephonenumber == undefined || alternatephonenumber === 'NA' || !/^[789]\d{9}$/.test(alternatephonenumber)) {
            ToastAndroid.show('Enter a Valid Phone Number!', ToastAndroid.SHORT);
            return;
        }

        const body = {
            "email": email,
            "dob": year + "-" + month + "-" + day,
            "firstname": firstname,
            "lastname": lastname,
            "alternatephonenumber": alternatephonenumber,

        }
        console.log(body, userId, token)
        UpdateUser(userId, token, body, false).then(res => {
            if (res.status === 200) {
                navigation.goBack()
                ToastAndroid.show("Profile Updated Succesfully!", ToastAndroid.SHORT);

            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (

        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 20, paddingTop: 10, }}>
                    <Image source={profilesource ? profilesource : user?.profilepic?.url ? { uri: user?.profilepic?.url } : require('../../../assets/pd.png')}
                        style={{ width: 160, height: 160, borderRadius: 80, marginBottom: 10, alignSelf: 'center' }} />
                    <TouchableOpacity style={{ marginTop: 20 }} onPress={() => {
                        requestCameraPermisiion();
                        addImage()
                    }}>
                        <Text style={{ color: '#41C461', fontWeight: '500', marginBottom: 20, fontSize: 15, marginTop: -20, textAlign: 'center' }}><MaterialCommunityIcons size={16} name='pencil' /> Edit</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingRight: 10, flex: 1 }}>
                            <FormTextInput value={firstname} label="First Name" editable={false} placeholder="First Name" />
                        </View>
                        <View style={{ paddingLeft: 10, flex: 1 }}>
                            <FormTextInput value={lastname} label="Last Name" editable={false} placeholder="Last Name" />
                        </View>
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>What is your DOB?</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingRight: 10, flex: 1 }}>
                            <FormTextInput label="Day" placeholder="DD" onChangeText={(text) => { setday(text) }} value={day} maxLength={2} keyboardType="numeric" />
                        </View>
                        <View style={{ paddingRight: 10, flex: 1 }}>
                            <FormTextInput label="Month" placeholder="MM" onChangeText={(text) => { setmonth(text) }} value={month} maxLength={2} keyboardType="numeric" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <FormTextInput label="Year" placeholder="YYYY" onChangeText={(text) => { setyear(text) }} value={year} maxLength={4} keyboardType="numeric" />
                        </View>
                    </View>
                    <FormTextInput label="Mail ID" placeholder="Type Mail ID" onChangeText={(text) => { setEmail(text) }} value={email} />
                    {/* <FormTextInput label="Phone No" placeholder="9478669875" editable={false} onChangeText={(text) => { setphoneNumber(text) }} value={phoneNumber} maxLength={10} keyboardType={'phone-pad'} /> */}
                    <FormTextInput label="Secondary No" placeholder="Type Mobile Number" onChangeText={(text) => { setalternatephonenumber(text) }} value={alternatephonenumber} maxLength={10} keyboardType={'phone-pad'} />
                </View>

            </ScrollView>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', elevation: 100, zIndex: 20, backgroundColor: '#F8F8F8' }}>
                <Button onPress={() => {
                    updateUser()
                }}
                    loading={loading}
                    disabled={loading}
                    color='#05194E'
                    style={{ width: '50%', marginVertical: 20, fontSize: 20, borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Save</Text></Button>
            </View>
            {/* </View> */}
        </View>
    );
}
