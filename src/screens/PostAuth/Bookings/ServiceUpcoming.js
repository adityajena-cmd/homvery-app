import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { Accord, BookingStatusCard, StepperStage } from './ServiceCompleted';

export default function ServiceUpcoming() {
    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ padding: 20 }}>
                    <Accord />
                    <BookingStatusCard />
                    <StepperStage stage={3} />
                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center', elevation: 20, zIndex: 20, backgroundColor: '#F8F8F8', paddingHorizontal: 20 }}>
                <Button onPress={() => {}}
                    style={{ width: '45%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '400' }}>Reschedule</Text></Button>
                <Button onPress={() => { }}
                    style={{ width: '45%', marginVertical: 20, fontSize: 20, backgroundColor: '#F8F8F8', borderColor: '#05194E', borderWidth: 2, borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#05194E', fontSize: 15, fontWeight: '400' }}>Cancel</Text></Button>
            </View>
        </View>
    );
}
