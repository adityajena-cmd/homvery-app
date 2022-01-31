import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import { AppDesign } from '../../../styles/AppDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreenComponent = ({navigation}) => {


    const checkOnBoard =async() =>{
        let onboard = await AsyncStorage.getItem('ON_BOARD')
        if(onboard === 'YES'){
            navigation.replace('Login');
        }else{
            navigation.replace('OnBoarding');
        }
    }


    useEffect(() => {
        setTimeout(() => {
            checkOnBoard()
          }, 2000);
    }, [])
    return (
        <View style={AppDesign.splashScreen.s1}>
            <View style={AppDesign.splashScreen.s2}>
                <Image source={require('../../../assets/LOGO.png')} />
            </View>
            <View style={AppDesign.splashScreen.s3}>
                <Image
                    style={AppDesign.splashScreen.s4}
                    resizeMode='contain'
                    source={require('../../../assets/ON0.png')} />
            </View>
        </View>
    )
}

export default SplashScreenComponent
