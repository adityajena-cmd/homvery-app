import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, Keyboard } from 'react-native'
import OTPTextInput from 'react-native-otp-textinput'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Button } from 'react-native-paper'
import { AppDesign } from '../../../styles/AppDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native'
import { CheckOTP, Login } from '../../../config/Apis/AuthApi'

const OTPVerify = ({ navigation, route }) => {
    const StyleObj = AppDesign.OtpScreen;


    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false);

    const [isError, setError] = useState(false)
    const saveLoginDetails = async (token, user_id, user_name = "", email = "") => {
        try {
            await AsyncStorage.setItem('API_TOKEN', token);
            await AsyncStorage.setItem('USER_EMAIL', email);
            await AsyncStorage.setItem('USER_ID', user_id.toString());
            await AsyncStorage.setItem('USER_NAME', user_name);
            await AsyncStorage.setItem('IS_LOGGEDIN', 'YES');

            navigation.replace('SearchCity')


        }
        catch (err) {
            console.log(err)
            alert(err)
        }

    }


    const validateOTP = () => {
        if (otp === '' || otp === null || otp.length != 4) {
            ToastAndroid.show('Enter a Valid OTP !', ToastAndroid.SHORT);
        } else {
            setLoading(true)
            CheckOTP(
                {
                    phonenumber: route?.params.num,
                    otp: otp
                }
            ).then(res => {
                setLoading(false)

                if (res.status === 200) {
                    saveLoginDetails(
                        res.data.jwt,
                        res.data.user.id,
                        res.data.user.username,
                        res.data.user.email,
                    );
                } else {
                    ToastAndroid.show('Enter a Valid OTP!', ToastAndroid.SHORT);
                    setError(true)
                }
                console.log(res.data, res.status)
            }).catch(err => {
                setLoading(false)
                ToastAndroid.show('Enter a Valid OTP!', ToastAndroid.SHORT);
                setError(true)

                console.log(err.response.data)
            })
        }
    }



    const getOTP = () => {
        setLoading(true)
        let value = route?.params.num
        if (value === '' || value === null || value.length != 10) {
            ToastAndroid.show('Enter a Valid Number!', ToastAndroid.SHORT);
        } else {
            Login({
                phonenumber: value
            }).then(res => {
                setLoading(false)
                console.log(res.data)
                if (res.status === 200) {
                    ToastAndroid.show('OTP Sent Again!', ToastAndroid.SHORT);
                }
            }).catch(err => {
                setLoading(false)

                ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
            })

        }
    }


    return (
        <View style={StyleObj.s1}>
            <View style={StyleObj.s2}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}><Fontisto name="arrow-left-l" color={'#8A8A8A'} size={20} /></TouchableOpacity>
                <Text style={StyleObj.s3}>OTP Verification</Text>
                <Fontisto name="arrow-left" color={'#FFFFFF00'} size={20} />
            </View>
            <View>
                <View style={StyleObj.s4}>
                    <Image source={require('../../../assets/otpImg1.png')} style={StyleObj.s5} />
                    <Text style={StyleObj.s6}>We have sent a verification code to</Text>
                    <Text style={StyleObj.s7}>{route?.params.num}</Text>
                    <OTPTextInput
                        tintColor={'#00B0EB'}
                        offTintColor={'#00B0EB'}
                        handleTextChange={text => { setOtp(text); setError(false); if (text.length === 4) Keyboard.dismiss() }}

                        textInputStyle={{ borderRadius: 10, borderWidth: 2, borderColor: '#00B0EB', marginVertical: 20, borderBottomWidth: 2 }}
                    // textInputstyle={StyleObj.s8}
                    />
                    <TouchableOpacity onPress={() => {
                        getOTP()
                    }}><Text style={StyleObj.s9}>If you don't receive a OTP!<Text style={StyleObj.s10}>Resend</Text></Text></TouchableOpacity>
                    <Button onPress={() => {
                        validateOTP()

                    }}
                        color="#05194E"
                        disabled={loading}
                        loading={loading}
                        style={StyleObj.s11}
                        mode="contained"
                    ><Text style={StyleObj.s12}>Verify</Text></Button>

                </View>
            </View>
            <View style={StyleObj.s13}>
                <Image source={require('../../../assets/otpImg2.png')} style={StyleObj.s14} />
            </View>
        </View>
    );
}

export default OTPVerify
