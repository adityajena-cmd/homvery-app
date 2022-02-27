import React, { useState } from 'react';
import { useEffect } from 'react';
import urlConfig from '../../../config/config.json'
import { View, Text, Image, Dimensions, TextInput, ScrollView, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { GetCities } from '../../../config/Apis/PublicApi.js';
import { AppDesign } from '../../../styles/AppDesign.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const StyleObj = AppDesign.SearchCity
function CityComp({ name, img, onPress }) {
    return (
        <TouchableOpacity style={StyleObj.s1} onPress={() => { onPress(name) }}>
            <Image source={img ? { uri: urlConfig.baseURL + img } : require('../../../assets/thumbnail-sqr.png')} style={StyleObj.s2} />
            <Text style={StyleObj.s3}>{name}</Text>
        </TouchableOpacity>
    )
}
export default function SearchCity({ navigation, route }) {
    const [cities, setCities] = useState([]);
    const [searchText, setSearchText] = useState('');

    const onCityCLick = async (txt) => {
        console.log("new--------------====",route?.params?.goBack)
        console.log(txt)
        try {
            await AsyncStorage.setItem('CITY', txt);
            if (route?.params?.goBack) {
                navigation.goBack()
            } else {
                navigation.replace("Homepage");

            }

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        GetCities(searchText)
            .then(res => {
                if (res.status === 200) {
                    setCities(res.data)
                }

            }).catch(err => {
                console.log(err);
            })

    }, [searchText]);



    return (

        <View style={StyleObj.s4}>

            <Text style={StyleObj.s5}>Select your city</Text>
            <View style={StyleObj.s6}>
                <FlatList
                    nestedScrollEnabled={true}
                    data={cities}
                    numColumns={3}
                    renderItem={({ item }) => <CityComp name={item.name} img={item?.displayPic?.url} onPress={(name) => onCityCLick(name)} />}
                />
            </View>
            <Text style={StyleObj.s7}>Search more city</Text>
            <View style={StyleObj.s8}>
                <Icon size={20} name="search1" color='#00b0eb' />
                <TextInput
                    style={StyleObj.s9}
                    placeholder={'Search City'}
                    maxLength={50}
                    value={searchText}
                    onChangeText={(text) => { setSearchText(text) }}
                    placeholderTextColor={'#8A8A8A'}

                />
                <TouchableOpacity onPress={() => {
                    ToastAndroid.showWithGravity(
                        "Please Select a City to Proceed",
                        ToastAndroid.SHORT,
                        ToastAndroid.TOP
                    );
                }}>
                    <Icon size={20} name="right" color='#00b0eb' />
                </TouchableOpacity>
            </View>
            <Image source={require('../../../assets/home12.png')} style={[StyleObj.s10, { flex: 1, justifyContent: 'flex-end' }]} />
        </View>
    );
}
