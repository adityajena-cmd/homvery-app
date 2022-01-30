import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import OTPTextInput from 'react-native-otp-textinput'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Button } from 'react-native-paper'
import { AppDesign } from '../../../styles/AppDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPVerify = ({ navigation, route }) => {
    const StyleObj = AppDesign.OtpScreen;
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
                        textInputstyle={StyleObj.s8}
                    />
                    <TouchableOpacity onPress={() => {
                        
                    }}><Text style={StyleObj.s9}>If you don't receive a OTP!<Text style={StyleObj.s10}>Resend</Text></Text></TouchableOpacity>
                    <Button onPress={() => {
                        navigation.replace('SearchCity');

                    }}
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
