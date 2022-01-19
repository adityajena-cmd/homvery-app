import React from 'react';
import { View, Text, Image, Dimensions, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { AppDesign } from '../../../styles/AppDesign.js'
const StyleObj  = AppDesign.SearchCity
function CityComp({name}) {
    return (
        <View style={StyleObj.s1}>
            <Image source={require('../../../assets/thumbnail-sqr.png')} style={StyleObj.s2} />
            <Text style={StyleObj.s3}>{name}</Text>
        </View>
    )
}
const data = ['BBSR', 'Cuttack', 'Puri', 'Rourkela', 'Sambalpur', 'Burla', 'Jharsuguda', 'Berhampur', 'Gopalpur'];
export default function Home({navigation}) {
    return (
        <ScrollView nestedScrollEnabled={true}>
            <View style={StyleObj.s4}>
            
                <Text style={StyleObj.s5}>Select your city</Text>
                <View style={StyleObj.s6}>
                    <FlatList
                        nestedScrollEnabled={true}
                        data={data}
                        numColumns={3}
                        renderItem={({ item }) => <CityComp name={item} />}
                    />
                </View>
                <Text style={StyleObj.s7}>Search more city</Text>
                <View style={StyleObj.s8}>
                    <Icon size={20} name="search1" color='#00b0eb' />
                    <TextInput
                        style={StyleObj.s9}
                        placeholder={'Search City'}
                        maxLength={50}
                        placeholderTextColor={'#8A8A8A'}
                            
                    />
                    <TouchableOpacity onPress={() => { navigation.navigate('Homepage') }}>
                        <Icon size={20} name="right" color='#00b0eb' />
                    </TouchableOpacity>
                </View>
                <Image source={require('../../../assets/home12.png')} style={StyleObj.s10} />
            </View>
        </ScrollView>
    );
}
