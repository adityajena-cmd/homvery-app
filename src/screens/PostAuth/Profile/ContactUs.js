import React from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fa from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { Button } from 'react-native-paper';
import Modal from "react-native-modal";
export const FormTextInput = (props) => {
    const { label, placeholder, ...def } = props;
    return (
        <View style={{ zIndex: 1 }}>
            {
                label && <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>{label}</Text>
            }
            <TextInput
                {...def}
                placeholder={placeholder}
                placeholderTextColor={'#D8D8D8'}
                style={{ borderWidth: 2, borderColor: '#00B0EB', borderRadius: 10, padding: 5 }}
            />
        </View>
    )
}


export default function ContactUs({navigation}) {
    const width = Dimensions.get('screen').width
    const [modal, setModal] = React.useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    <Image source={require('../../../assets/cu.png')} style={{ alignSelf: 'center', width: width / 2, height: width / 2.3, paddingVertical: 10 }} />
                    <Text style={{ color: '#000000', textAlign: 'center', fontSize: 16, fontWeight: '600', marginVertical: 10 }}>Write us for any queries</Text>
                    <View style={{ borderRadius: 20, backgroundColor: '#ffffff', padding: 30 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'flex-start', marginBottom: 10 }}>
                                    <Fa name="user-circle-o" size={20} color={'#05194E'} />
                                    <Text style={{ color: '#9E9E9E', fontSize: 12, marginLeft: 15 }}>
                                        Anil Kumar
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'flex-start', marginBottom: 10 }}>
                                    <Fontisto name="email" size={20} color={'#05194E'} />
                                    <Text style={{ color: '#9E9E9E', fontSize: 12, marginLeft: 15 }}>
                                        anil.kumar@gmail.com
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'flex-start', marginBottom: 10 }}>
                                    <Feather name="phone-call" size={20} color={'#05194E'} />
                                    <Text style={{ color: '#9E9E9E', fontSize: 12, marginLeft: 15 }}>
                                        9864352784
                                    </Text>
                                </View>
                                
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => { setModal(true) }}>
                                    <Text style={{ fontSize: 16, color: '#41C461', marginBottom: 5 }}><MaterialCommunityIcons size={16} name='pencil' /> Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#EAE2E2', }} />
                        <Text style={{ color: '#000000', textAlign: 'center', fontSize: 16, fontWeight: '600', marginVertical: 10 }}>Query</Text>
                        <TextInput
                            style={{ height: Dimensions.get('screen').width / 4, backgroundColor: '#ffffff', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, borderColor: '#cccccc', borderRadius: 10, borderWidth: 1, fontSize: 12 }}
                            multiline={true}
                            textAlignVertical='top'
                            placeholder='Please write your query here'
                            placeholderTextColor={'#ddd'}
                        />
                        <Button onPress={() => {
                            
                        }}
                            style={{ alignSelf: 'center', width: '60%', marginTop: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                            mode="contained"
                        ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Send</Text></Button>

                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button onPress={() => { }}
                            style={{ marginVertical: 10, fontSize: 20, borderWidth: 1, borderColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                            mode="Outlined"
                        >
                            <Fa name="phone" size={20} color={'#05194E'} />

                            <Text style={{ color: '#05194E', fontSize: 20, fontWeight: '400' }}>  Call Us</Text>
                        </Button>
                        <TouchableOpacity>
                            <Text style={{ color: '#05194E', fontWeight: '600' }}>
                                <Ionicons name="mail" size={15} color={'#05194E'} />  Write us through mail
                                
                            </Text>
                        </TouchableOpacity>
                    
                    </View>
                </View>

            </ScrollView>
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
                <View style={{ backgroundColor: '#ffffff', padding: 30, borderRadius: 15, display: 'flex', }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ color: '#635E5E', textAlign: 'center', fontSize: 16, fontWeight: '500', marginVertical: 10 }}>Edit your details</Text>
                        <TouchableOpacity onPress={() => { setModal(false) }}>
                            <Ionicons name="close" size={30} color={'#000000'} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Fa name="user-circle-o" size={30} color={'#05194E'} />
                            <View style={{ width: '70%', marginLeft: 10 }}>
                                <FormTextInput placeholder={'Name'} />

                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Fontisto name="email" size={30} color={'#05194E'} />
                            <View style={{ width: '70%', marginLeft: 10 }}>
                                <FormTextInput placeholder={'Email'} />

                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Feather name="phone-call" size={30} color={'#05194E'} />
                            <View style={{ width: '70%', marginLeft: 10 }}>
                                <FormTextInput placeholder={'Phone'} />

                            </View>
                        </View>
                                
                    </View>
                    <Button onPress={() => {setModal(false)}}
                        style={{ alignSelf: 'center', width: '60%', marginTop: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                        mode="contained"
                    ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Save</Text></Button>
                </View>
            </Modal>
        </View>
    );
}
