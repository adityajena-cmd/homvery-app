import React from 'react';
import { View, Text, ScrollView, Image, Dimensions, TextInput } from 'react-native';
import { BtnGrp } from './ServiceBooking';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-paper';
DropDownPicker.setListMode("SCROLLVIEW");

export const FormTextInput = (props) => {
    const { label, placeholder, ...def } = props;
    return (
        <View style={{ marginBottom: 10, zIndex: 1 }}>
            {
                label && <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>{label}</Text>
            }
            <TextInput
                {...def}
                placeholder={placeholder}
                placeholderTextColor={'#D8D8D8'}
                style={{ borderWidth: 1, borderColor: '#00B0EB', borderRadius: 10, padding: 10 }}
            />
        </View>
    )
}

const FormDropDown = (props) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const { label } = props;
    return (
        <View style={{ marginBottom: 10, zIndex: 5 }}>
            {
                label && <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>{label}</Text>
            }
            <DropDownPicker
                style={{ borderColor: '#00B0EB', borderWidth: 1 }}
                showTickIcon={false}
                dropDownContainerStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: '#00B0EB', borderWidth: 1
                    
                }}
                containerStyle={{
                    borderColor: '#00B0EB',
                    backgroundColor: '#ffffff',
                    zIndex: 5
                }}
                placeholderStyle={{color: '#D8D8D8'}}

                selectedItemContainerStyle={{
                    backgroundColor: '#00B0EB',
                }}
                selectedItemLabelStyle={{
                    color: "#ffffff"
                }}
                open={open}
                value={value}
                items={props.items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={props.setItems}
            />
        </View>
    );
}
export default function AddressEditPage({navigation}) {
    React.useEffect(() => {
        DropDownPicker.setListMode("SCROLLVIEW");
    }, []);
    
    const width = Dimensions.get('screen').width;
    const data2 = [
        {
            name: 'Home',
            iconName: 'home-variant-outline'

        },
        {
            name: 'Work',
            iconName: 'home-city-outline'

        },
        {
            name: 'Others',
            iconName: 'map-marker-outline'

        },

    ]
    const [problem, setProblem] = React.useState(0);
    
    
    const [items, setItems] = React.useState([
        {label: 'Sambalpur', value: 'Sambalpur'},
        {label: 'Bhubaneshwar', value: 'Bhubaneshwar'},
        {label: 'Jharsuguda', value: 'Jharsuguda'},
        {label: 'Cuttack', value: 'Cuttack'},
        {label: 'Burla', value: 'Burla'},
        {label: 'Rourkela', value: 'Rourkela'},
    ]);
    const [zips, setZips] = React.useState([
        {label: '758965', value: '758965'},
        {label: '758963', value: '758963'},
        {label: '758966', value: '758966'},
    ]);

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                <View style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: width / 1.5, height: width / 2 }}
                        source={require('../../../assets/addr.png')} resizeMode='contain' />
                </View>
                <View style={{ padding: 20 }}>
                    <FormTextInput label="Title" placeholder="Address 1" />
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flex: 1, paddingRight: 10 }}>
                            <FormTextInput label="Door No" placeholder="Type Here" />
                        </View>
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <FormTextInput label="Street" placeholder="Type street name" />
                        </View>
                    </View>
                    <FormTextInput placeholder="Type street name" />
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flex: 1, paddingRight: 10 }}>
                            <FormDropDown label="City" items={items} setItems={setItems} />
                        </View>
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                            <FormDropDown label="Zip code" items={zips} setItems={setZips} />
                        </View>
                    </View>
                    
                    
                    <FormTextInput label="Mobile" placeholder="Type mobile number" />
                    {/* <FormTextInput label="Alternative Mobile" placeholder="Type mobile number" /> */}
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>Address Type</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 }}>

                            {
                                data2.map((item, index) => {
                                    return <BtnGrp
                                        key={index}
                                        index={index}
                                        setPreferedTime={setProblem}
                                        name={item.name}
                                        iconName={item.iconName}
                                        customButtonStyle={{ width: 'auto', borderRadius: 5000, marginRight: 10 }}
                                        active={problem === index} />
                                })
                            }
                        </View>
                    </View>
                </View>
                
            </ScrollView>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', elevation: 20, zIndex: 20, backgroundColor: '#F8F8F8' }}>
                    <Button onPress={() => {
                        navigation.navigate('ServiceBooking')
                    }}
                        style={{ width: '60%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                        mode="contained"
                    ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Save Address</Text></Button>
                </View>
        </View>
    );
}
