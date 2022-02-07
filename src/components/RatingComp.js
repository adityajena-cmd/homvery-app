import React from 'react';
import { Image, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';

export const RatingComp = ({ onRating ,serviceName }) => {
    const width = Dimensions.get('screen').width;
    return (
        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, padding: 20, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
            <Image source={require('../assets/techGuy.png')} style={{ width: width / 4, height: width / 4 }} />
            <View style={{ marginLeft: 20 }}>
                <Text style={{ color: '#000000', fontWeight: '600', fontSize: 16 }}>{serviceName && serviceName}</Text>
                <Rating
                    style={{ paddingVertical: 10 }}
                    onFinishRating={onRating}
                    
                />
            </View>
        </View>
    )
}