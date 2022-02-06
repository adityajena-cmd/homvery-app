import React, { useState } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';

import { useEffect } from 'react';


export const StepperStage = ({ active }) => {
    const [stage, setStage] = useState(active);
    useEffect(() => {

        setStage(active)

    }, [active])
    const width = Dimensions.get('screen').width;
    return (
        <View style={{ backgroundColor: '#ffffff', borderRadius: 10, elevation: 3, padding: 10, paddingTop: 30 }}>
            <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1, borderStyle: 'dashed', width: '80%', alignSelf: 'center', marginBottom: -10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center' }}>
                <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 }, ![1, 2, 3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../../assets/steperTick.png')} />
                    <Image resizeMode='cover' style={[{ width: width / 15, height: width / 6, marginBottom: 20 }, ![1, 2, 3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../../assets/steper1.png')} />
                    <Text style={{ fontWeight: '700', color: '#000000', width: width / 6, fontSize: 10, textAlign: 'center' }}>Technician Started</Text>
                </View>

                <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 }, ![2, 3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../../assets/steperTick.png')} />
                    <Image resizeMode='cover' style={[{ width: width / 8 + 20, height: width / 6, marginBottom: 20 }, ![2, 3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../../assets/steper2.png')} />
                    <Text style={{ fontWeight: '700', color: '#000000', width: width / 6, fontSize: 10, textAlign: 'center' }}>Technician Arrived</Text>
                </View>

                <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 }, ![3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../../assets/steperTick.png')} />
                    <Image resizeMode='cover' style={[{ width: width / 8 + 10, height: width / 6, marginBottom: 20 }, ![3, 4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../../assets/steper3.png')} />
                    <Text style={{ fontWeight: '700', color: '#000000', width: width / 6, fontSize: 10, textAlign: 'center' }}>Quotation Started</Text>
                </View>

                <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 }, ![4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../../assets/steperTick.png')} />
                    <Image resizeMode='cover' style={[{ width: width / 6, height: width / 6, marginBottom: 20 }, ![4, 5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../../assets/steper4.png')} />
                    <Text style={{ fontWeight: '700', color: '#000000', width: width / 6, fontSize: 10, textAlign: 'center' }}>Payment Done</Text>
                </View>

                <View style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Image style={[{ width: width / 15, height: width / 15, marginBottom: 20 }, ![5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../../assets/steperTick.png')} />
                    <Image resizeMode='cover' style={[{ width: width / 20, height: width / 6, marginBottom: 20 }, ![5].includes(stage) && { tintColor: '#E9E9E9' }]} source={require('../../assets/steper5.png')} />
                    <Text style={{ fontWeight: '700', color: '#000000', width: width / 6, fontSize: 10, textAlign: 'center' }}>Job Completed</Text>
                </View>
            </View>
        </View>
    )
}
