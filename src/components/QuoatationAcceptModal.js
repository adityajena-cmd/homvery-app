import React from "react";
import { Text } from "react-native";
import { Dimensions } from "react-native";
import { Image, View } from "react-native";
import Modal from 'react-native-modal';
import { Button } from "react-native-paper";

const QuotationAcceptModal = ({ modal,onBackDrop=()=>{}, setModal,onPress }) => {
    return (
        <Modal
            isVisible={modal}
            hasBackdrop={true}
            backdropOpacity={0.3}
            backdropColor={"#000000"}
            animationType="fadeIn"
            swipeDirection={[]}
            onSwipeComplete={() => {  }}
            onBackdropPress={onBackDrop}
            style={{ margin: 30, justifyContent: "center", }}>
            <View style={{ backgroundColor: '#ffffff', padding: 20, borderRadius: 15, display: 'flex', alignContent: 'center', alignItems: 'center', }}>
                <Image source={require('../assets/quot1.png')} style={{ width: Dimensions.get('screen').width / 2, height: Dimensions.get('screen').width / 2 }} />
                <Text style={{ color: '#000000', textAlign: 'center', fontSize: 20, marginVertical: 10, fontWeight: '600' }}>Quotation has been shared</Text>
                <Text style={{ color: '#000000', textAlign: 'center', width: '70%', fontWeight: '400' }}>Please review and accept the payment details</Text>
                <Button
                    onPress={onPress}
                    style={{ width: '100%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                    mode="contained">
                    <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Done</Text>
                </Button>
            </View>
        </Modal>
    )
}


export default QuotationAcceptModal;