import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import { AppDesign } from '../../../styles/AppDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { askAllPermision } from '../../../config/LocaitonProvider';


const SplashScreenComponent = ({ navigation }) => {


    // const checkOnBoard = async () => {
    //     let onboard = await AsyncStorage.getItem('ON_BOARD')
    //     if (onboard === 'YES') {
    //         navigation.replace('Login');

    //     } else {
    //         navigation.replace('OnBoarding');
    //     }
    // }


    useEffect(() => {
        askAllPermision()
        setTimeout(() => {
            AsyncStorage.multiGet(
                ['API_TOKEN', 'USER_ID', 'ON_BOARD', 'CITY'],
                (err, items) => {
                    if (err) {
                        console.warn(err);
                        navigation.replace('Login');
                    } else {
                        if (items[2][1] === 'YES') {
                            if (items[0][1] !== null && items[1][1] !== null && items[3][1] !== null) {
                                navigation.replace('Homepage');
                            } else if (items[0][1] !== null && items[1][1] !== null && items[3][1] === null) {
                                navigation.replace('SearchCity')
                            } else {
                                navigation.replace('Login');
                            }
                        } else {
                            navigation.replace('OnBoarding');
                        }

                    }
                }
            );
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
