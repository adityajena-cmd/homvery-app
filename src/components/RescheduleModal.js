import React from 'react';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal';
import moment from 'moment';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomCalendar from './common/CustomCalendar/CustomCalendar';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dimensions } from 'react-native';



export function BtnGrp(props) {
    return <Button
        onPress={props.onPress}
        mode='contained'
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: props.active ? '#00B0EB' : '#ffffff', color: '#ffffff', borderRadius: 50, marginBottom: 10, borderColor: '#00B0EB', borderWidth: 1, width: Dimensions.get('screen').width / 2 - 30, alignContent: 'center', alignItems: 'center', ...props.customButtonStyle }}>
        {
            props.iconName && <MaterialCommunityIcons style={{ color: props.active ? '#ffffff' : '#00B0EB', fontSize: 15, marginRight: 20 }} name={props.iconName} />
        }
        <Text style={{ color: props.active ? '#ffffff' : '#00B0EB', fontSize: 12, }}>{props.name}</Text>
    </Button>
};

const RescheduleModal = ({ modal, setModal, onReschedule }) => {
    const [problem, setProblem] = React.useState(0);

    const [fromDate, setFromDate] = React.useState(null);
    const [comments, setComments] = React.useState('');

    const [toDate, setToDate] = React.useState(null);
    const [scheduledDate, setScheduledDate] = React.useState(new Date())

    const data2 = [
        {
            name: 'AC not cooling'
        },
        {
            name: 'General servicing'
        },
        {
            name: 'LED Blinking'
        },
       
        {
            name: 'Remote not working'
        },
    ]

    const data1 = [
        {
            name: '9.00AM - 12.00PM',
            fromTime: { h: 9, m: 0 },
            toTime: { h: 12, m: 0 },
        },
        {
            name: '12.00PM - 1.00PM',
            fromTime: { h: 12, m: 0 },
            toTime: { h: 13, m: 0 },
        },
        {
            name: '1.00PM - 3.00PM',
            fromTime: { h: 13, m: 0 },
            toTime: { h: 15, m: 0 },
        },
        {
            name: '3.00PM - 6.00PM',
            fromTime: { h: 15, m: 0 },
            toTime: { h: 18, m: 0 },
        },

    ]
    const [preferedTime, setPreferedTime] = useState(0)


    function TimeBtnGrp(props) {
        return <Button
            onPress={() => {
                props.setPreferedTime(props.index);
                setFromDate(moment(scheduledDate).set(props.fromTime));
                setToDate(moment(scheduledDate).set(props.toTime));
            }}
            mode='contained'
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: props.active ? '#00B0EB' : '#ffffff', color: '#ffffff', borderRadius: 50, marginBottom: 10, borderColor: '#00B0EB', borderWidth: 1, width: Dimensions.get('screen').width / 2 - 65, alignContent: 'center', alignItems: 'center', ...props.customButtonStyle }}>
            {
                props.iconName && <MaterialCommunityIcons style={{ color: props.active ? '#ffffff' : '#00B0EB', fontSize: 15, marginRight: 20 }} name={props.iconName} />
            }
            <Text style={{ color: props.active ? '#ffffff' : '#00B0EB', fontSize: 11, }}>{props.name}</Text>
        </Button>

    };

    const updateTime = time => {
        setPreferedTime(time)
        let current = moment(scheduledDate).format('YYYY-MM-DD')
        let startT = data1[time].fromTime?.h.toString() + ':' + data1[time].fromTime?.m.toString() + '0'
        let endT = data1[time].toTime?.h.toString() + ':' + data1[time].toTime?.m.toString() + '0'
        let fd = moment(current + ' ' + startT)
        let td = moment(current + ' ' + endT)

        setFromDate(fd.utc().utcOffset("+05:30"))
        setToDate(td.utc().utcOffset("+05:30"))
    }



    return (
        <Modal
            isVisible={modal}
            hasBackdrop={true}
            backdropOpacity={0.3}
            backdropColor={"#000000"}
            animationType="fadeIn"
            // swipeDirection={['down', "up", "left", "right"]}
            onSwipeComplete={() => {
                // setModal(false)
            }}
            onBackdropPress={() => {
                // setModal(false)
            }}
            style={{ margin: 30, justifyContent: "center", }}>
            <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 15, display: 'flex', }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#635E5E', textAlign: 'center', fontSize: 16, fontWeight: '500', marginBottom: 10 }}></Text>
                    <TouchableOpacity onPress={() => { setModal(false) }}>
                        <Ionicons name="close" size={30} color={'#000000'} />
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ width: '100%', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: 15 }}>On which date you want to reschedule?</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginTop: 15 }}>
                        <Text style={{ textAlign: 'center', color: '#000000', fontSize: 12 }}>Dec 2021</Text>
                        <Text style={{ textAlign: 'center', color: '#000000', fontSize: 12, textDecorationLine: 'underline' }}><MaterialCommunityIcons name='calendar-range' size={12} /> More Details</Text>
                    </View>


                    <CustomCalendar
                        setTimestamp={(ts) => { setScheduledDate(ts) }}
                    />
                    <View style={{ backgroundColor: '#ffffff', elevation: 5, padding: 15, zIndex: 8 }}>
                        <Text style={{ width: '100%', textAlign: 'center', color: '#000000', fontSize: 18 }}>Your Prefered Time?</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 }}>

                            {
                                data1.map((item, index) => {
                                    return <TimeBtnGrp
                                        key={index}
                                        index={index}
                                        setPreferedTime={(time) => { updateTime(time) }}
                                        name={item.name}
                                        active={preferedTime === index} />
                                })
                            }
                        </View>
                    </View>


                    <View style={{ backgroundColor: '#F5F5F550', height: 6 }} />

                    <View style={{ padding: 10 }}>
                        <Text style={{ width: '100%', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: 15 }}>Write reason for reschedule? </Text>
                        <TextInput
                            style={{ height: Dimensions.get('screen').width / 3, backgroundColor: '#ffffff', borderRadius: 10, marginTop: 10, paddingHorizontal: 15, paddingVertical: 10, borderColor: '#d8d8d8', borderWidth: 1 }}
                            multiline={true}
                            value={comments}
                            onChangeText={(text) => setComments(text)}
                            textAlignVertical='top'
                            placeholder='Please write your problem statement here'
                            placeholderTextColor={'#ddd'} />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: 20 }}>

                            {
                                data2.map((item, index) => {
                                    return <BtnGrp
                                        key={index}
                                        index={index}
                                        onPress={() => {
                                            setProblem(index)
                                            setComments(item.name)
                                        }}

                                        name={item.name}

                                        customButtonStyle={{ width: 'auto', borderRadius: 5, marginRight: 5 }}
                                        active={problem === index} />
                                })
                            }
                        </View>
                    </View>


                    <View style={{ marginVertical: 20, backgroundColor: '#F5F5F550', height: 6 }} />
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ width: '100%', textAlign: 'left', fontWeight: '600', color: '#000000', fontSize: 15 }}>Are you sure to reschedule?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginVertical: 15, }}>
                            <Button onPress={()=>{ setModal(false);onReschedule(fromDate, toDate, comments) ;}}
                                color='#00B0EB'
                              
                                style={{ borderRadius: 10, paddingVertical: .5, width: '50%' }}
                                mode="contained"
                            >
                                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Yes</Text>
                            </Button>


                            <TouchableOpacity onPress={() => { setModal(false);}} style={{ backgroundColor: '#ffffff', borderColor: '#00B0EB', borderWidth: 1, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 10, marginLeft: 10, width: '50%' }}>
                                <Text style={{ color: '#00B0EB', fontSize: 20, fontWeight: '400', textAlign: 'center' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

export default RescheduleModal