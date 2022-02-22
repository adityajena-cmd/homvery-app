import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { GetAllLinks, GetUserDeatils } from '../../../config/Apis/ProfileApi';
import { getInitials, openBrowser } from '../../../config/Apis/Utils';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import urlConfig from '../../../config/config.json'
import Loader from '../../../components/Loader'
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-paper';
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
    const [loading, setloading] = React.useState(false);
    const [isLogin, setLogin] = React.useState(false);



    const logout = () => {
        return Alert.alert(
            "Log Out?",
            "Are you sure you want to Logout?",
            [
                // The "Yes" button
                {
                    text: "Yes",
                    onPress: () => {

                        AsyncStorageLib.clear()
                            .then(() => {
                                skipOnBoarding()
                                navigation.dispatch(resetAction)
                            })
                            .catch(err => console.log("CLEAR", err));
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "No",
                },
            ]
        );
    }

    const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
    });


    const skipOnBoarding = async () => {
        try {
            await AsyncStorageLib.setItem('ON_BOARD', 'YES');

        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
        setloading(true)
        AsyncStorageLib.multiGet(
            ['API_TOKEN', 'USER_ID', 'IS_LOGGEDIN'],
            (err, items) => {
                if (err) {
                    console.log("ERROR=============================", err);
                } else {
                    setToken(items[0][1])
                    setUserId(items[1][1])
                    if (items[2][1] === 'YES') {
                        setLogin(true)
                    }


                    GetUserDeatils(items[1][1], items[0][1])
                        .then(res => {
                            setloading(false)
                            if (res.status === 200) {
                                setUser(res?.data)
                            }
                        }).catch(err => {
                            setloading(false)

                            console.log('err', err)
                        })
                    GetAllLinks(items[0][1])
                        .then(res => {
                            setloading(false)

                            if (res.status === 200) {
                                setLinks(res.data[0])
                            }
                        }).catch(err => {
                            setloading(false)

                            console.log(err)
                        })

                }
            })

    } , []))

    const ProfileData = [
        {
            title: 'Address Book',
            subTitle: 'Edit, add or remove addresses',
            isLog: false,
            onPress: () => { navigation.navigate('AddressBook') },
            icon: <MaterialIcons name='local-offer' size={36} color={'#DADADA'} />
        },
        {
            title: 'Offers',
            isLog: false,
            subTitle: 'See available coupen codes',
            onPress: () => { navigation.navigate('CouponCode') },
            icon: <AntDesign name='exclamationcircleo' size={36} color={'#DADADA'} />
        },
        {
            title: 'About Us',
            isLog: true,
            subTitle: 'See about homvery and privacy policy',
            onPress: () => { navigation.navigate('AboutUs') },
            icon: <AntDesign name='questioncircleo' size={36} color={'#DADADA'} />
        },
        {
            title: 'FAQ',
            isLog: true,
            subTitle: 'Frequently asked questions',
            onPress: () => { openBrowser(links.termsUrl) },
            icon: <MaterialCommunityIcons name='chat-processing-outline' size={36} color={'#DADADA'} />
        },
        {
            title: 'Contact Us',
            isLog: true,
            subTitle: 'Contact Us',
            onPress: () => { navigation.navigate('ContactUs', { data: user, token: token, userId: userId }) },
            icon: <Ionicons name='md-people-outline' size={36} color={'#DADADA'} />
        },
        {
            title: 'Register as partner',
            isLog: true,
            subTitle: 'Register as partner with Homvery',
            onPress: () => { openBrowser(links.registerPartnerUrl) },
            icon: <AntDesign name='staro' size={36} color={'#DADADA'} />
        },
        {
            title: 'Rate Homvery',
            isLog: true,
            subTitle: 'Provide rating on playstore',
            onPress: () => { },
            icon: <MaterialCommunityIcons name='map-marker' size={36} color={'#DADADA'} />
        },
        {
            title: 'Share Homvery',
            subTitle: 'Share Homevery',
            isLog: true,
            onPress: () => { },
            icon: <AntDesign name='sharealt' size={36} color={'#DADADA'} />
        },
    ]

    const width = Dimensions.get('screen').width;

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <Loader loading={loading} />

            <View style={{ backgroundColor: '#00B0EB', padding: 20 }}>
                <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 20 }}>My Profile</Text>
            </View>
            {isLogin ? <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'flex-start', padding: 20, elevation: 7, backgroundColor: '#ffffff' }}>
                <View>
                    <Image style={{ height: width / 4 - 20, width: width / 4 - 20, borderRadius: width }}
                        source={user?.profilepic && {
                            uri: user?.profilepic?.formats?.small?.url ? user?.profilepic?.formats?.small?.url : getInitials(user?.firstname, user?.lastname, 120)
                        }} />
                </View>
                <View style={{ flex: 1, paddingLeft: 20 }}>
                    <Text style={{ fontSize: 18, color: '#00B0EB', marginBottom: 1, fontWeight: '600' }}>{user?.firstname + " " + user?.lastname}</Text>
                    <Text style={{ fontSize: 14, color: '#707070', marginBottom: 5 }}>{user?.email}</Text>
                    <Text style={{ fontSize: 14, color: '#707070', marginBottom: 5 }}>{user?.phonenumber}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => { navigation.navigate('PersonalDetails', { data: user, token: token,userId:userId }) }}>
                        <Text style={{ fontSize: 16, color: '#41C461', marginBottom: 5 }}><MaterialCommunityIcons size={16} name='pencil' /> edit</Text>
                    </TouchableOpacity>
                </View>
            </View> :
                <View style={{ width: '100%', padding: 15 }}>
                    <Text style={{ fontSize: 25, fontWeight: '600', color: '#00B0EB' }}>Welcome</Text>
                    <Text style={{ fontSize: 15, color: '##707070' }}>Login to view your complete profile</Text>
                    <Button
                        onPress={() => { navigation.dispatch(resetAction) }}
                        style={{ alignSelf: 'center', height: 40, width: '100%', marginVertical: 20, fontSize: 20, borderRadius: 10, paddingVertical: 0 }}
                        mode="contained"
                        color='#05194E'
                    ><AntDesign name={"logout"} size={20} /><Text style={{ textAlign: 'justify' }}>    Login</Text></Button>
                </View>}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    {
                        ProfileData.map((item) => {
                            if (isLogin) {
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
                            } else {
                                if (item.isLog) {
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
                                }

                            }

                        })

                    }
                    {isLogin && <TouchableOpacity style={{ marginBottom: 20 }} onPress={logout}>
                        <Text style={{ color: '#000000', fontWeight: '600', fontSize: 20 }}>Logout   <FontAwesome5 name='power-off' size={20} color={'#000000'} /></Text>
                    </TouchableOpacity>}
                </View>

            </ScrollView>
        </View>
    );
}
