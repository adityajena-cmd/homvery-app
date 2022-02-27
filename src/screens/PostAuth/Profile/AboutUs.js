import React from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { openBrowser } from '../../../config/Apis/Utils';

export default function AboutUs({navigation,route}) {
    const width = Dimensions.get('screen').width;
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    <Image source={require('../../../assets/LOGO.png')} style={{ alignSelf: 'center', width: width / 3, height: width / 4 + 10, paddingVertical: 10 }} />
                    <Text style={{ color: '#9E9E9E', textAlign: 'center', fontSize: 14, paddingHorizontal: 25 }}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor Lorem ipsum dolor sit amet, consetetur.
                    </Text>
                    <Text style={{ color: '#000000', textAlign: 'center', fontSize: 16, fontWeight: '600', marginTop: 30 }}>How does it works</Text>
                    <Image source={require('../../../assets/au.png')} style={{ alignSelf: 'center', width: width - 40, height: width / 2 - 30, paddingVertical: 10, marginTop: 20 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'flex-start' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#000000', textAlign: 'center', fontSize: 14, fontWeight: '600', marginTop: 10 }}>Pick Service</Text>
                            <Text style={{ color: '#9E9E9E', textAlign: 'center', fontSize: 12, marginTop: 5 }}>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                            </Text>

                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#000000', textAlign: 'center', fontSize: 14, fontWeight: '600', marginTop: 10 }}>Hire professional</Text>
                            <Text style={{ color: '#9E9E9E', textAlign: 'center', fontSize: 12, marginTop: 5 }}>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                            </Text>

                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#000000', textAlign: 'center', fontSize: 12, fontWeight: '600', marginTop: 10 }}>Get Service </Text>
                            <Text style={{ color: '#9E9E9E', textAlign: 'center', fontSize: 12, marginTop: 5 }}>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy 
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={()=>openBrowser(route?.params?.privacy)} style={{marginTop: 20}}>
                        <View style={{ height: 1, backgroundColor: '#EAE2E2', }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#000000', textAlign: 'center', fontSize: 15, fontWeight: '600', marginVertical: 10 }}>
                                Privacy Policy
                            </Text>
                            <MaterialCommunityIcons name="chevron-right" color={'#DADADA'} size={25}/>
                            </View>
                        <View style={{ height: 1, backgroundColor: '#EAE2E2', marginBottom: 10  }} />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}
