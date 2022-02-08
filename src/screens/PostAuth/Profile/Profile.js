import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { GetAllLinks, GetUserDeatils } from '../../../config/Apis/ProfileApi';
import { openBrowser } from '../../../config/Apis/Utils';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import urlConfig from '../../../config/config.json'
export const ProfileTab = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
                <Text style={{ color: '#000000', fontWeight: '600', fontSize: 18 }}>{props.title}</Text>
                <Text style={{ color: '#707070', fontWeight: '500', fontSize: 13 }}>{props.subTitle}</Text>
            </View>
            <View>
                {props.icon}
            </View>
        </TouchableOpacity>
    );
}



export default function Profile({ navigation }) {
    const [links, setLinks] = React.useState({});
    const [user, setUser] = React.useState({});
    const [token, setToken] = React.useState('');
    const [userId, setUserId] = React.useState('');

    useEffect(() => {

        AsyncStorageLib.multiGet(
            ['API_TOKEN', 'USER_ID'],
            (err, items) => {
                if (err) {
                    console.log("ERROR=============================", err);
                } else {
                    setToken(items[0][1])
                    setUserId(items[1][1])

                    GetUserDeatils(items[1][1], items[0][1])
                        .then(res => {
                            if (res.status === 200) {
                                setUser(res?.data)
                            }
                        }).catch(err => {
                            console.log('err', err)
                        })
                    GetAllLinks(items[0][1])
                        .then(res => {
                            if (res.status === 200) {
                                setLinks(res.data[0])
                            }
                        }).catch(err => {
                            console.log(error)
                        })

                }
            })

    }, [])

    const ProfileData = [
        {
            title: 'Address Book',
            subTitle: 'Edit, add or remove addresses',
            onPress: () => { navigation.navigate('AddressBook') },
            icon: <MaterialIcons name='local-offer' size={36} color={'#DADADA'} />
        },
        {
            title: 'Offers',
            subTitle: 'See available coupen codes',
            onPress: () => { navigation.navigate('CouponCode') },
            icon: <AntDesign name='exclamationcircleo' size={36} color={'#DADADA'} />
        },
        {
            title: 'About Us',
            subTitle: 'See about homvery and privacy policy',
            onPress: () => { navigation.navigate('AboutUs') },
            icon: <AntDesign name='questioncircleo' size={36} color={'#DADADA'} />
        },
        {
            title: 'FAQ',
            subTitle: 'Frequently asked questions',
            onPress: () => { openBrowser(links.termsUrl) },
            icon: <MaterialCommunityIcons name='chat-processing-outline' size={36} color={'#DADADA'} />
        },
        {
            title: 'Contact Us',
            subTitle: 'Contact Us',
            onPress: () => { navigation.navigate('ContactUs', { data: user, token: token,userId:userId }) },
            icon: <Ionicons name='md-people-outline' size={36} color={'#DADADA'} />
        },
        {
            title: 'Register as partner',
            subTitle: 'Register as partner with Homvery',
            onPress: () => { openBrowser(links.registerPartnerUrl) },
            icon: <AntDesign name='staro' size={36} color={'#DADADA'} />
        },
        {
            title: 'Rate Homvery',
            subTitle: 'Provide rating on playstore',
            onPress: () => { },
            icon: <MaterialCommunityIcons name='map-marker' size={36} color={'#DADADA'} />
        },
        {
            title: 'Share Homvery',
            subTitle: 'Share Homevery',
            onPress: () => { },
            icon: <AntDesign name='sharealt' size={36} color={'#DADADA'} />
        },
    ]

    const width = Dimensions.get('screen').width;

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View style={{ backgroundColor: '#00B0EB', padding: 20 }}>
                <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 20 }}>My Profile</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'flex-start', padding: 20, elevation: 7, backgroundColor: '#ffffff' }}>
                <View>
                    <Image style={{ height: width / 4 - 20, width: width / 4 - 20, borderRadius: width }} source={{ uri: user?.profilepic ? urlConfig.baseURL + user?.profilepic : 'https://picsum.photos/300/300?grayscale' }} />
                </View>
                <View style={{ flex: 1, paddingLeft: 20 }}>
                    <Text style={{ fontSize: 18, color: '#00B0EB', marginBottom: 1, fontWeight: '600' }}>{user?.firstname + " " + user?.lastname}</Text>
                    <Text style={{ fontSize: 14, color: '#707070', marginBottom: 5 }}>{user?.email}</Text>
                    <Text style={{ fontSize: 14, color: '#707070', marginBottom: 5 }}>{user?.phonenumber}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => { navigation.navigate('PersonalDetails',{data:user,token:token}) }}>
                        <Text style={{ fontSize: 16, color: '#41C461', marginBottom: 5 }}><MaterialCommunityIcons size={16} name='pencil' /> edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    {
                        ProfileData && links?.registerPartnerUrl && ProfileData.map((item) => {
                            return (
                                <>
                                    <ProfileTab
                                        onPress={item.onPress}
                                        title={item.title}
                                        subTitle={item.subTitle}
                                        icon={item.icon}
                                    />
                                    <View style={{ height: 1, backgroundColor: '#DADADA', marginVertical: 15 }} />
                                </>
                            )
                        })
                    }
                    <TouchableOpacity style={{ marginBottom: 20 }}>
                        <Text style={{ color: '#000000', fontWeight: '600', fontSize: 20 }}>Logout   <FontAwesome5 name='power-off' size={20} color={'#000000'} /></Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}
