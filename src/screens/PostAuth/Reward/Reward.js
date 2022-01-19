import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import Modal from "react-native-modal";
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Reward({ navigation }) {
    const width = Dimensions.get('screen').width
    const [modal, setModal] = React.useState(false);
    const [rewardModal, setRewardModal] = React.useState(false);

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View style={{ elevation: 5, backgroundColor: '#ffffff', zIndex: 9, flexDirection: 'row', justifyContent: 'space-between', padding: 15, width: Dimensions.get('screen').width }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <MaterialCommunityIcons name="arrow-left" color={'#000000'} style={{ marginHorizontal: 10 }} size={25} /></TouchableOpacity>
                <Text style={{ fontSize: 20, color: '#000000', fontWeight: '600' }}>Rewards</Text>
                <Fontisto name="arrow-left" color={'#ffffff00'} size={20} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    <View style={{ paddingHorizontal: 10, backgroundColor: 'white', marginTop: 15 }}>
                    <View style={{ backgroundColor: '#ffffff', elevation: 5, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginBottom: 10 }}>
                        <View style={{ paddingVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 15, color: '#000000', fontWeight: '700' }}>Total coins earned</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <Image source={require('../../../assets/rewards5.png')} style={{width: width/6, height: width/6}} resizeMode='contain'/>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 30, color: '#000000', fontWeight: '700' }}>472</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: 2, height: '100%', backgroundColor: '#DCEBF7', marginHorizontal: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 15, color: '#000000', fontWeight: '700' }}>Total coins Saved</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <Image source={require('../../../assets/rewards4.png')} style={{width: width/6, height: width/6}} resizeMode='contain'/>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 30, color: '#000000', fontWeight: '700' }}>472</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 2, backgroundColor: '#DCEBF7', marginTop: 10 }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
       
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: '#635E5E', fontWeight: '600' }}>Tricks to earn more coins</Text>
                            </View>
                            <Button
                                onPress={() => { setModal(true) }}
                                style={{ width: 'auto', fontSize: 20, borderWidth: 1,borderColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                                mode="outlined">
                                <Text style={{ color: '#05194E', fontSize: 12, fontWeight: '400' }}>View Tricks</Text>
                            </Button>
                        </View>
                    </View>
                </View>
                    <Image source={require('../../../assets/rewards1.png')} style={{ width: width - 40, height: width / 3.2 }} resizeMode='contain' />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={()=>{setRewardModal(true)}}><Image source={require('../../../assets/rewards2.png')} style={{ width: width / 2-20, height: width / 3 }} resizeMode='contain' /></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setRewardModal(true)}}><Image source={require('../../../assets/rewards2.png')} style={{ width: width / 2-20, height: width / 3 }} resizeMode='contain' /></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setRewardModal(true)}}><Image source={require('../../../assets/rewards3.png')} style={{ width: width / 2-20, height: width / 3 }} resizeMode='contain' /></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setRewardModal(true)}}><Image source={require('../../../assets/rewards3.png')} style={{ width: width / 2-20, height: width / 3 }} resizeMode='contain' /></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setRewardModal(true)}}><Image source={require('../../../assets/rewards3.png')} style={{ width: width / 2-20, height: width / 3 }} resizeMode='contain' /></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setRewardModal(true)}}><Image source={require('../../../assets/rewards3.png')} style={{ width: width / 2-20, height: width / 3 }} resizeMode='contain' /></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setRewardModal(true)}}><Image source={require('../../../assets/rewards3.png')} style={{ width: width / 2-20, height: width / 3 }} resizeMode='contain' /></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setRewardModal(true)}}><Image source={require('../../../assets/rewards3.png')} style={{ width: width / 2-20, height: width / 3 }} resizeMode='contain' /></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Modal
                isVisible={rewardModal}
                hasBackdrop={true}
                backdropOpacity={0.3}
                backdropColor={"#000000"}
                animationType="fadeIn"
                swipeDirection={['down', "up", "left", "right"]}
                onSwipeComplete={() => { setRewardModal(false) }}
                onBackdropPress={() => { setRewardModal(false) }}
                style={{ margin: 30, justifyContent: "center", }}>
                    <Image source={require('../../../assets/rewards3.png')} style={{ width: width -50, height: width / 2 }} resizeMode='contain' />
                </Modal>
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
                <View style={{ backgroundColor: '#ffffff', padding: 20, borderRadius: 15, display: 'flex', }}>
                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#635E5E', textAlign: 'center', fontSize: 16, fontWeight: '500', marginVertical: 10 }}></Text>
                        <TouchableOpacity onPress={() => { setModal(false) }}>
                            <Ionicons name="close" size={30} color={'#000000'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        <Image source={require('../../../assets/rewards6.png')} style={{ width: width / 4, height: width / 4 }} resizeMode='contain' />
                        <View style={{flex: 1, marginLeft: 20}}>
                            <Text style={{ color: '#000000', textAlign: 'left', fontSize: 14, fontWeight: '600', marginTop: 10 }}>How to earn more coins</Text>
                            <Text style={{ color: '#9E9E9E', textAlign: 'left', fontSize: 12, marginTop: 5 }}>
                                Take services from Homvery more frequently and earn more coin. Go through tips and tricks section and know more about it.
                            </Text>
                        </View>

                    </View>
                    <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 20}}>
                        <View style={{flex: 1, marginLeft: 20}}>
                            <Text style={{ color: '#000000', textAlign: 'left', fontSize: 14, fontWeight: '600', marginTop: 10 }}>How to earn more coins</Text>
                            <Text style={{ color: '#9E9E9E', textAlign: 'left', fontSize: 12, marginTop: 5 }}>
                                Take services from Homvery more frequently and earn more coin. Go through tips and tricks section and know more about it.
                            </Text>
                        </View>
                        <Image source={require('../../../assets/rewards7.png')} style={{ width: width / 4, height: width / 4 }} resizeMode='contain' />
                        

                    </View>
                </View>
            </Modal>
        </View>
    );
}
