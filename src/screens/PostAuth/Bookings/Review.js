import React from 'react';
import { View, Text, ScrollView, Dimensions, TextInput, Image } from 'react-native';
import { Button } from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Modal from "react-native-modal";
import { RatingComp } from '../../../components/RatingComp';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateReview, GiveReview } from '../../../config/Apis/BookingApi';
const data2 = [
    {
        name: 'Professional experts'
    },
    {
        name: 'On - time service'
    },
    {
        name: 'Fair price'
    },
    {
        name: 'Well behaved technician'
    },
    {
        name: 'Cleaned the workplace'
    },
]

const data3 = [
    "Wearing T-shirt", "Wearing Mask", "Greated Customer", "Cleaned the workplace"
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
export default function Review({ navigation, route }) {
    const [problem, setProblem] = React.useState(0);
    const [modal, setModal] = React.useState(false);
    const [loading, setloading] = React.useState(false);
    const [tshirt, setTshirt] = React.useState(false);
    const [greetedCustomer, setgreetedCustomer] = React.useState(false);
    const [cleanedWorkSpace, setcleanedWorkSpace] = React.useState(false);
    const [rating, setRating] = React.useState(0);
    const [comments, setComments] = React.useState('');
    let service = route?.params?.data 
    let booking = route?.params?.booking 

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
                        cleaned_workplace: cleanedWorkSpace,
                        tshirt: tshirt,
                        greeted_customer: greetedCustomer,
                        comments: comments,
                        createdBy: items[1][1],
                        description: '',
                        images: [],
                        rating: rating
                    }
                    console.log(body)
                    CreateReview(body, items[0][1])
                        .then(res => {
                            if (res.status === 200) {
                                console.log(res.data.id)

                                GiveReview({review:res.data.id}, items[0][1], service?.id)
                                    .then(result => {
                                        setloading(false)
                                        if (result.status === 200) {
                                            setModal(true)
                                        }

                                    }).catch(error => {
                                        setloading(false)

                                        console.log("assing err",error)
                                    })
                            }

                        }).catch(err => {
                            console.log("create err", err)
                        })


                }
            })




    }


    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 40 }}>
                    <RatingComp serviceName={service?.serviceid?.name} onRating={(val) => { setRating(val) }} />
                    <View style={{ backgroundColor: '#ffffff', }}>
                        <Text style={{ width: '100%', textAlign: 'center', color: '#000000', fontSize: 18 }}>What was best</Text>
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
                            value={comments}
                            onChangeText={(txt) => { setComments(txt) }}
                            placeholder='Please write your problem statement here'
                            placeholderTextColor={'#ddd'}

                        />
                        <Text style={{ width: '100%', textAlign: 'center', color: '#000000', fontSize: 18, marginTop: 30, marginBottom: 20 }}>Let us know about technicain</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>

                            <BouncyCheckbox
                                size={25}
                                fillColor="#00B0EB"
                                unfillColor="#FFFFFF"
                                text={data3[0]}
                                iconStyle={{ borderColor: "#00B0EB", borderRadius: 5 }}
                                textStyle={{ textDecorationLine: "none", fontSize: 12 }}
                                style={{ marginBottom: 10, width: '50%' }}
                                onPress={(check) => { setTshirt(check) }}
                            />
                            <BouncyCheckbox

                                size={25}
                                fillColor="#00B0EB"
                                unfillColor="#FFFFFF"
                                text={data3[1]}
                                iconStyle={{ borderColor: "#00B0EB", borderRadius: 5 }}
                                textStyle={{ textDecorationLine: "none", fontSize: 12 }}
                                style={{ marginBottom: 10, width: '50%' }}
                                onPress={(check) => { }}
                            />
                            <BouncyCheckbox

                                size={25}
                                fillColor="#00B0EB"
                                unfillColor="#FFFFFF"
                                text={data3[2]}
                                iconStyle={{ borderColor: "#00B0EB", borderRadius: 5 }}
                                textStyle={{ textDecorationLine: "none", fontSize: 12 }}
                                style={{ marginBottom: 10, width: '50%' }}
                                onPress={(check) => { setgreetedCustomer(check) }}
                            />
                            <BouncyCheckbox

                                size={25}
                                fillColor="#00B0EB"
                                unfillColor="#FFFFFF"
                                text={data3[3]}
                                iconStyle={{ borderColor: "#00B0EB", borderRadius: 5 }}
                                textStyle={{ textDecorationLine: "none", fontSize: 12 }}
                                style={{ marginBottom: 10, width: '50%' }}
                                onPress={(check) => { setcleanedWorkSpace(check) }}
                            />
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
                    <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Submit your review</Text>
                </Button>
            </View>
            <Modal
                isVisible={modal}
                hasBackdrop={true}
                backdropOpacity={0.3}
                backdropColor={"#000000"}
                animationType="fadeIn"
                swipeDirection={['down', "up", "left", "right"]}
                onSwipeComplete={() => { setModal(false) }}
                onBackdropPress={() => { setModal(false) }}
                style={{ margin: 30, justifyContent: "center", }}>
                <View style={{ backgroundColor: '#ffffff', padding: 20, borderRadius: 15, display: 'flex', alignContent: 'center', alignItems: 'center', }}>
                    <Image source={require('./../../../assets/reviewed.png')} style={{ width: Dimensions.get('screen').width / 2, height: Dimensions.get('screen').width / 2 }} />
                    <Text style={{ color: '#00B0EB', textAlign: 'center', fontSize: 25, marginVertical: 10, fontWeight: '700' }}>Thank You</Text>
                    <Text style={{ color: '#000000', textAlign: 'center', width: '70%', fontWeight: '700' }}>For providing your valuable feedback</Text>
                    <Button
                        onPress={() => { setModal(false); navigation.navigate('Homepage') }}
                        color="#05194E"
                        loading={loading}
                        disabled={loading}
                        style={{ width: '100%', marginVertical: 20, fontSize: 20, borderRadius: 10, paddingVertical: 0 }}
                        mode="contained">
                        <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Done</Text>
                    </Button>
                </View>
            </Modal>
        </View>
    );
}
