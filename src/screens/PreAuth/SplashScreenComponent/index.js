import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import { AppDesign } from '../../../styles/AppDesign';

const SplashScreenComponent = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('OnBoarding');
          }, 3000);
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
