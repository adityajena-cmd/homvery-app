import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView, { Marker, Animated, AnimatedRegion } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid } from "react-native";
import { ToastAndroid } from 'react-native';

export default function MapPage({ navigation,route }) {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [permissionStatus, setPermissionStatus] = useState("");
    const [region, setRegion] = useState({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 1,
        longitudeDelta: 1,
    });
    const markerRef = useRef(null);


    const mapRef = useRef(null);

    const location = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }
    const gotoLocation = () => {
        return (
            mapRef.current.animateToRegion(location, 3 * 1000)
        );
    }

    const onMapPress = e => {
        var mapData = e.nativeEvent.coordinate;
        setLatitude(mapData.latitude)
        setLongitude(mapData.longitude)
        setRegion({
            latitude: mapData.latitude,
            longitude: mapData.longitude,
            latitudeDelta: 1,
            longitudeDelta: 1,
        })
        markerRef.current.showCallout();

        mapRef.current.animateToRegion({
            latitude: mapData.latitude,
            longitude: mapData.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        }, 3 * 1000);
    }
    const requestLocationPermission = async () => {
        try {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Needs Location Permission',
                    message: "Need Location"
                }
            ).then((res) => {
                console.log("Response in Fn :- ", res);
                setPermissionStatus(res);
            })
        } catch (err) {
            Alert.alert('Error', 'SomeThing Unexpected Happened')
        }
    }

    const userLocation = () => {
        return (
            Geolocation.getCurrentPosition((e) => {
                console.log("Location :- ", e);
                setLongitude(e.coords.longitude);
                setLatitude(e.coords.latitude);
            }, (err) => {
                console.log("Error in GeoService :- ", err);
            }, {
                forceLocationManager: true,
                showLocationDialog: true
            })
        )
    }
    useEffect(() => {
        requestLocationPermission().then((res) => {
            console.log("Response :- ", res);
            userLocation();
        }).catch((err) => {
            console.log("Error :- ", err);
        })
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>

            <MapView
                ref={mapRef}
                style={{
                    flex: 1,
                    mapStyle: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }
                }}
                onPress={onMapPress}
                initialRegion={region}

                onMapLoaded={() => {
                    gotoLocation();
                }}
                onRegionChange={(region) => setRegion(region)}
            >
                <Marker coordinate={{
                    latitude: latitude,
                    longitude: longitude
                }}
                    ref={markerRef}
                    title="Your Location"
                    description={longitude && latitude ? latitude.toString() + " / " + longitude.toString() : "Your Locaiton"}
                />
            </MapView>
            <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ backgroundColor: "#fff", position: 'absolute', top: 10, left: 20, zIndex: 2, elevation: 2 }}>
                <MaterialCommunityIcons name='arrow-left' size={25} color={'#000000'} />
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                <Text style={{ color: '#000000', fontSize: 20, fontWeight: '500' }}>Select your location</Text>
                <View style={{ backgroundColor: "#fff", flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ color: '#000000', fontSize: 15, }}><MaterialCommunityIcons name='map-marker' size={15} color={'#25A8DE'} />{longitude && latitude ? latitude.toString() + " / " + longitude.toString() : "Get Locaiton"}</Text>
                    <TouchableOpacity><Text>Change</Text></TouchableOpacity>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', elevation: 20, zIndex: 20, backgroundColor: '#F8F8F8' }}>
                <Button onPress={() => {
                    if (latitude) {
                        navigation.navigate('AddressEditPage', { coords: [latitude, longitude] ,address:route?.params?.data})
                    } else {
                        ToastAndroid.show("Select your locaiton in map", ToastAndroid.SHORT)
                    }

                }}
                    style={{ width: '70%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Confirm Location</Text></Button>
            </View>
        </View>
    );
}
