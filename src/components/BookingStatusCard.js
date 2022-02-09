
import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { getInitials, getStatus, openBrowser } from '../config/Apis/Utils';



export const BookingStatusCard = ({ assingedTo, techDetails, status, serviceType }) => {
    const width = Dimensions.get('screen').width;
    return (
        <View style={{ padding: 10, backgroundColor: '#ffffff', borderRadius: 10, marginBottom: 10, elevation: 3 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#00B0EB', fontSize: 18 }}>Technician</Text>
                {getStatus(status)}
            </View>
            <View style={{ height: 1.5, backgroundColor: '#DCEBF7', marginVertical: 10 }} />
            <View style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    {techDetails?.technician?.profilepic ? <Image source={techDetails?.technician?.profilepic ? { uri: techDetails?.technician?.profilepic?.url } : require('../assets/user.png')} resizeMode='contain' style={{ height: 50, width: 50, borderRadius: 25 }} />:
                    getInitials(assingedTo?.firstname , assingedTo?.lastname,30)}
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ color: '#000000', fontSize: 13, marginBottom: 1, fontWeight: '600', width: width / 3.5 }} numberOfLines={1}>{assingedTo?.id ? assingedTo?.firstname + " " + assingedTo?.lastname : 'N/A'}</Text>
                        <Text style={{ color: '#9d9d9d', fontSize: 10, marginBottom: 1, fontWeight: '600', width: width / 3.5 }} numberOfLines={1}>{serviceType}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{ backgroundColor: '#277B3B', paddingHorizontal: 5, borderRadius: 5, paddingVertical: 2, }}>
                                <Text style={{ color: '#ffffff', fontSize: 12 }}><MaterialCommunityIcons size={12} name="star" color={'#ffffff'} />4.3</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: 1.5, height: '100%', backgroundColor: '#DCEBF700', marginHorizontal: 10 }} />
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', alignContent: 'center', borderLeftColor: '#DCEBF7', borderLeftWidth: 2 }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <Fontisto name="injection-syringe" color={'#00B0EB'} size={25} />
                        <Text style={{ fontSize: 13, color: '#707070', fontWeight: '500', marginLeft: 10 }}>Vaccinated</Text>
                    </View>
                    <TouchableOpacity style={{ marginTop: 10, borderColor: '#00B0EB', borderWidth: 1, borderRadius: 8, padding: 5, }} onPress={() => openBrowser(techDetails?.covidcertificate?.url)}>
                        <Text style={{ color: '#00B0EB', fontSize: 14 }}>View Certificate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
