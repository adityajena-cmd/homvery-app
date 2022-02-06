import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native'
import { Button } from 'react-native-paper'
import { AppDesign } from '../../../styles/AppDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import { Login } from '../../../config/Apis/AuthApi';


const LoginScreen = ({ navigation }) => {
    const [value, setvalue] = useState('9866257510')
    const StyleObj = AppDesign.Login;
    const [loading, setLoading] = useState(false);


    const skipLogin = async () => {
        try {
            await AsyncStorage.setItem('IS_LOGGEDIN', 'NO');
            navigation.replace("SearchCity");

        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }



    const getOTP = () => {

        if (value === '' || value === null || value.length != 10) {
            ToastAndroid.show('Enter a Valid Number!', ToastAndroid.SHORT);
        } else {
            setLoading(true)
            Login({
                phonenumber: value
            }).then(res => {
                setLoading(false)
                console.log(res.data)
                if (res.status === 200) {
                    ToastAndroid.show('OTP Sent!', ToastAndroid.SHORT);
                    navigation.replace('OTPVerify', {
                        num: value
                    })
                }
            }).catch(err => {
                setLoading(false)

                ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
            })

        }
    }



    return (
        <View style={StyleObj.s1}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <View>
                <TouchableOpacity onPress={() => { skipLogin() }} style={StyleObj.s2}>
                    <Text style={StyleObj.s3}>Skip</Text>
                </TouchableOpacity>

            </View>
            <View style={StyleObj.s4}>
                <View style={StyleObj.s5}>
                    <Image resizeMode='contain' style={StyleObj.s6} source={require('../../../assets/LOGO.png')} />
                </View>
                <View style={StyleObj.s7}>
                    <View style={StyleObj.s8}>
                        <Text style={StyleObj.s9}>+91</Text>
                    </View>
                    <View style={StyleObj.s10}>
                        <TextInput
                            style={StyleObj.s11}
                            placeholder={'Mobile Number'}
                            value={value}
                            maxLength={10}
                            keyboardType={'numeric'}
                            onChangeText={(text) => setvalue(text)}
                            placeholderTextColor={'#8A8A8A'}
                        />
                    </View>
                </View>
                <Button onPress={() => {
                    getOTP()
                }}
                    disabled={loading}
                    loading={loading}
                    color='#05194E'
                    style={StyleObj.s12}
                    mode="contained"
                ><Text style={StyleObj.s13}>Request OTP</Text></Button>
                <Text style={StyleObj.s14}>By continuing, you agree to our</Text>
                <View style={StyleObj.s15}>
                    <Text style={StyleObj.s16}>Terms of Service</Text>
                    <View style={StyleObj.s17} />
                    <Text style={StyleObj.s18}>Privacy policy</Text>
                    <View style={StyleObj.s19} />
                    <Text style={StyleObj.s20}>Content Policy</Text>
                </View>
                <Image source={require('../../../assets/loginImg.png')} style={StyleObj.s21} />
            </View>
        </View>
    );
}

export default LoginScreen
