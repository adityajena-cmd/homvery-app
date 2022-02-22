
import React from "react";
import { View } from "react-native";
import { Dimensions, ImageBackground, Text, TouchableOpacity } from "react-native";


export const TrickImg = ({coins,onClick}) => {
    const width = Dimensions.get('screen').width;
    return (
        <TouchableOpacity onPress={onClick}>
            <ImageBackground  style={{ width: width - 40, height: width / 3.5, marginBottom: 5 }} source={require('../assets/coinCard.png')} resizeMode="cover"  >
               <View style={{ display:'flex',flexDirection:'row',width:width,justifyContent:'center' }}>
                <Text style={{fontSize:36,fontWeight:'700',color:"#202020",textAlign:'center',marginTop:10}}>{coins && coins?.toString()}</Text>
                <Text style={{fontSize:16, width:width/2.3,fontWeight:'500',color:"#202020",textAlign:'center',marginTop:10}}>{`Coins has been been used worth of ${coins.toString()} Rs`}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}