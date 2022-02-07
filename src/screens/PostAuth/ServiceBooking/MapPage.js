import React from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

export default function MapPage({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView>
                <MapView
                style={{...StyleSheet.absoluteFillObject}}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                {/* <Image source={require('../../../assets/mappic.png')} resizeMode='contain' style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').width * 1.5 }} /> */}
                {/* <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ position: 'absolute', top: 10, left: 20, zIndex: 2, elevation: 2 }}>
                    <MaterialCommunityIcons name='arrow-left' size={25} color={'#000000'} />
                </TouchableOpacity>
                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    <Text style={{ color: '#000000', fontSize: 20, fontWeight: '500' }}>Select your location</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 15, }}><MaterialCommunityIcons name='map-marker' size={15} color={'#25A8DE'} /> Lorem ipsum dolor sit amet... </Text>
                        <TouchableOpacity><Text>Chnage</Text></TouchableOpacity>
                    </View>
                </View> */}
            </ScrollView>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', elevation: 20, zIndex: 20, backgroundColor: '#F8F8F8' }}>
                <Button onPress={() => {
                    navigation.navigate('AddressEditPage')
                }}
                    style={{ width: '70%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Confirm Location</Text></Button>
            </View>
        </View>
    );
}
