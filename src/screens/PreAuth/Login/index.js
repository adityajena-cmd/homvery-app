import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native'
import { Button } from 'react-native-paper'
import { AppDesign } from '../../../styles/AppDesign'

const LoginScreen = ({navigation}) => {
    const [value, setvalue] = useState('')
    const StyleObj = AppDesign.Login;
    return (
        <View style={StyleObj.s1}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <View>
                <TouchableOpacity onPress={() => { alert('SKIPPED') }} style={StyleObj.s2}>
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
                    navigation.replace('OTPVerify', {
                        num: value
                    })
                }}
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
