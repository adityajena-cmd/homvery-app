import React from 'react';
import { View, Text, ScrollView, Dimensions, TextInput, Image, ToastAndroid } from 'react-native';
import { Button } from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Modal from "react-native-modal";
import { RatingComp } from '../../../components/RatingComp';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiveDispute, GiveReview } from '../../../config/Apis/BookingApi';
const data2 = [
    {
        name: 'Misbehaved'
    },
    {
        name: 'Delayed work'
    },
    {
        name: 'Poor Service'
    },
    {
        name: 'unprofessional'
    },
    {
        name: 'Fake Technician'
    },
]

const data3 = [
    "Wearing T-shirt", "Wearing Mask", "Having all tools", "Cleaned the workplace"
]

function BtnGrp(props) {
    return <Button
        onPress={() => props.setPreferedTime(props.index)}
        mode='contained'
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: props.active ? '#00B0EB' : '#ffffff', color: '#ffffff', borderRadius: 50, marginBottom: 10, borderColor: '#00B0EB', borderWidth: 1, width: 'auto', alignContent: 'center', alignItems: 'center', ...props.customButtonStyle }}>
        {
            props.iconName && <MaterialCommunityIcons style={{ color: props.active ? '#ffffff' : '#00B0EB', fontSize: 15, marginRight: 20 }} name={props.iconName} />
        }
        <Text style={{ color: props.active ? '#ffffff' : '#00B0EB', fontSize: 10, }}>{props.name}</Text>
    </Button>
};
export default function Dispute({ navigation, route }) {
    const [problem, setProblem] = React.useState(0);
    const [modal, setModal] = React.useState(false);
    const [loading, setloading] = React.useState(false);
    const [rating, setRating] = React.useState(0);
    const [comments, setComments] = React.useState('');
    const [description, setDescription] = React.useState('');
    let service = route?.params?.data

    const updateProblem = (index) => {
        setProblem(index)
        setComments(data2[index].name)
    }


    const submitReview = () => {
        setloading(true)
        AsyncStorage.multiGet(
            ['API_TOKEN', 'USER_ID'],
            (err, items) => {
                if (err) {
                    console.log("ERROR===================", err);
                } else {
                    const body = {
                        active: true,
                        problem: comments,
                        createdBy: items[1][1],
                        description: description,
                    }

                    GiveDispute(body, items[0][1], service?.id)
                        .then(res => {
                            setloading(false)
                            if (res.status === 200) {
                                navigation.navigate('Homepage')
                            }

                        }).catch(err => {
                            setloading(false)
                            ToastAndroid.show("Some Error Occured! try Again later ",ToastAndroid.SHORT)
                            console.log(err)
                        })

                }
            })




    }


    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                    <View style={{ backgroundColor: '#ffffff', }}>
                        <Text style={{ width: '100%', textAlign: 'center', color: '#000000', fontSize: 18 }}>What is the Problem ?</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>

                            {
                                data2.map((item, index) => {
                                    return <BtnGrp
                                        key={index}
                                        index={index}
                                        setPreferedTime={updateProblem}
                                        name={item.name}
                                        customButtonStyle={{ width: 'auto', borderRadius: 10, marginRight: 10 }}
                                        active={problem === index} />
                                })
                            }
                        </View>
                        <Text style={{ width: '100%', textAlign: 'center', color: '#000000', fontSize: 18, marginTop: 30 }}>Write your review here</Text>
                        <TextInput
                            style={{ height: Dimensions.get('screen').width / 4, backgroundColor: '#ffffff', borderRadius: 10, marginTop: 10, paddingHorizontal: 15, paddingVertical: 10, borderColor: '#cccccc', borderRadius: 10, borderWidth: 1 }}
                            multiline={true}
                            textAlignVertical='top'
                            value={description}
                            onChangeText={(txt) => { setDescription(txt) }}
                            placeholder='Please write your problem statement here'
                            placeholderTextColor={'#ddd'}

                        />
                        <Text style={{ width: '100%', textAlign: 'center', color: '#000000', fontSize: 18, marginTop: 30, marginBottom: 20 }}>Let us know about technicain</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                            {
                                data3.map((item) => {
                                    return (
                                        <BouncyCheckbox
                                            key={item}
                                            size={25}
                                            fillColor="#00B0EB"
                                            unfillColor="#FFFFFF"
                                            text={item}
                                            iconStyle={{ borderColor: "#00B0EB", borderRadius: 5 }}
                                            textStyle={{ textDecorationLine: "none", fontSize: 12 }}
                                            style={{ marginBottom: 10, width: '50%' }}
                                            onPress={() => { }}
                                        />
                                    )
                                })
                            }
                        </View>



                    </View>
                </View>
            </ScrollView>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', elevation: 100, zIndex: 20, backgroundColor: '#F8F8F8' }}>
                <Button
                    onPress={() => { submitReview() }}
                    loading={loading}
                    disabled={loading}
                    color='#05194E'
                    style={{ width: '80%', marginVertical: 20, fontSize: 20, borderRadius: 10, paddingVertical: 0 }}
                    mode="contained">
                    <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Raise your Dispute</Text>
                </Button>
            </View>

        </View>
    );
}
