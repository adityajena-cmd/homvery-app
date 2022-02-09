import React from "react";
import { ActivityIndicator, View } from "react-native";


const Loader = ({ loading, color }) => {
    if (loading) {
        return (
            <View style={{ flex: 1, width: '100%', height: '100%', zIndex: 5, position: "absolute", backgroundColor: '#202020', opacity: .3, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>

        )
    } else {
        return <></>
    }

}

export default Loader