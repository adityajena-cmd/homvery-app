import React from 'react';
import { View, Text, ScrollView, Dimensions, Image, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

export const FormTextInput = (props) => {
    const { label, placeholder, ...def } = props;
    return (
        <View style={{ marginBottom: 10, zIndex: 1, flex: 1 }}>
            {
                label && <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>{label}</Text>
            }
            <TextInput
                {...def}
                placeholder={placeholder}
                placeholderTextColor={'#D8D8D8'}
                style={{ borderWidth: 2, borderColor: '#00B0EB', borderRadius: 10, padding: 10, }}
            />
        </View>
    )
}

export default function PersonalDetails() {
    const width = Dimensions.get('screen').width
  return (
    
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ paddingHorizontal: 20, paddingTop: 10, }}>
                  <Image source={require('../../../assets/pd.png')} style={{ width: width * 0.5, height: width * 0.5, marginBottom: 10, alignSelf: 'center' }} />
                  <View style={{ flexDirection: 'row' }}>
                      <View style={{paddingRight: 10, flex: 1 }}>
                          <FormTextInput label="First Name" placeholder="First Name" />
                      </View>
                      <View style={{paddingLeft: 10, flex: 1}}>
                          <FormTextInput label="Last Name" placeholder="Last Name" />
                      </View>
                  </View>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: '#3e414a', marginBottom: 8 }}>What is your DOB?</Text>
                  <View style={{ flexDirection: 'row' }}>
                      <View style={{paddingRight: 10, flex: 1 }}>
                          <FormTextInput label="Day" placeholder="DD" />
                      </View>
                      <View style={{paddingRight: 10, flex: 1}}>
                          <FormTextInput label="Month" placeholder="MM" />
                      </View>
                      <View style={{ flex: 1}}>
                          <FormTextInput label="Year" placeholder="YYYY" />
                      </View>
                  </View>
                  <FormTextInput label="Mail ID" placeholder="Type Mail ID" />
                  <FormTextInput label="Phone No" placeholder="9478669875" />
                  <FormTextInput label="Secondary No" placeholder="Type Mobile Number" />
              </View>

          </ScrollView>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', elevation: 100, zIndex: 20, backgroundColor: '#F8F8F8' }}>
                <Button onPress={() => {
                    
                }}
                    style={{ width: '50%', marginVertical: 20, fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
                    mode="contained"
                ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Save</Text></Button>
            </View>
        {/* </View> */}
      </View>
  );
}
