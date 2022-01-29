import React from 'react';
import { View, Text, StatusBar, Image, Dimensions,TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Fa from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const _animatedStyles = (index, animatedValue, carouselProps) => {
  return;
    // const sizeRef = carouselProps.vertical ? carouselProps.itemHeight : carouselProps.itemWidth;
    // const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

    // return {
    //     zIndex: carouselProps.data.length - index,
    //     opacity: animatedValue.interpolate({
    //         inputRange: [2, 3],
    //         outputRange: [1, 0]
    //     }),
    //     transform: [{
    //         rotate: animatedValue.interpolate({
    //             inputRange: [-1, 0, 1, 2, 3],
    //             outputRange: ['0deg', '0deg', '0deg', '0deg', '0deg'],
              
    //         })
    //     }, {
    //         [translateProp]: animatedValue.interpolate({
    //             inputRange: [-1, 0, 1, 2, 3],
    //             outputRange: [
    //                 -sizeRef,
    //                 -sizeRef,
    //                 -sizeRef, // centered
    //                 -sizeRef, // centered
    //                 -sizeRef // centered
    //             ],
    //             extrapolate: 'clamp'
    //         })
    //     }]
    // };
}
const _renderImageItem = ({ item: ITEM, index }) => {
    return (
      <Image
        key={index}
        source={require('../../../assets/acImg2.png')}
        resizeMode={'cover'}
        style={{ height: Dimensions.get('screen').height / 4, width: Dimensions.get('screen').width, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} />
    );
};
  
const _renderTextItem = ({ item: ITEM, index }) => {
    return (
      <Text style={{ fontSize: 14, color: '#000000', textAlign: 'center', width: Dimensions.get('screen').width/1.5 }}>Rahul booked for AC service recently</Text>
    );
  };

function ImageCarouselComponent() {
  return (
    <Carousel
      slideInterpolatedStyle={_animatedStyles}
      useScrollView={true}
      layout={"default"}
      autoplay={true}
      loop={true}
      data={[1, 2, 3, 4, 5, 6]}
      sliderWidth={Dimensions.get('screen').width}
      itemWidth={Dimensions.get('screen').width}
      containerCustomStyle={{ height: Dimensions.get('screen').height / 4 }}
      renderItem={_renderImageItem}
    />
  );
}


function Screen1() {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 15, marginTop: 15, paddingVertical: 10, paddingHorizontal: 20 }}>
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <Image style={{ width: Dimensions.get('screen').width / 5, height: Dimensions.get('screen').width / 4, borderRadius: 10 }} resizeMode='contain' source={require('../../../assets/techGuy.png')} />
          <View style={{ paddingLeft: 15, width: Dimensions.get('screen').width / 2 }}>
            <Text style={{ fontWeight: '600', fontSize: 13, color: '#000000' }}>AC Installation</Text>
            <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070' }}>Brought new AC! Don’t know where to install it, which is the right direction to fit the AC?
              Why fear, when Homvery is nearby. Book professionals from Homvery to get the right installation of your AC.
            </Text>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#F8F8F8', marginVertical: 20 }} />
        
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <Image style={{ width: Dimensions.get('screen').width / 5, height: Dimensions.get('screen').width / 4, borderRadius: 10 }} resizeMode='contain' source={require('../../../assets/techGuy.png')} />
          <View style={{ paddingLeft: 15, width: Dimensions.get('screen').width / 2 }}>
            <Text style={{ fontWeight: '600', fontSize: 13, color: '#000000' }}>AC Installation</Text>
            <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070' }}>Brought new AC! Don’t know where to install it, which is the right direction to fit the AC?
              Why fear, when Homvery is nearby. Book professionals from Homvery to get the right installation of your AC.
            </Text>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#F8F8F8', marginVertical: 20 }} />
        
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <Image style={{ width: Dimensions.get('screen').width / 5, height: Dimensions.get('screen').width / 4, borderRadius: 10 }} resizeMode='contain' source={require('../../../assets/techGuy.png')} />
          <View style={{ paddingLeft: 15, width: Dimensions.get('screen').width / 2 }}>
            <Text style={{ fontWeight: '600', fontSize: 13, color: '#000000' }}>AC Installation</Text>
            <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070' }}>Brought new AC! Don’t know where to install it, which is the right direction to fit the AC?
              Why fear, when Homvery is nearby. Book professionals from Homvery to get the right installation of your AC.
            </Text>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#F8F8F8', marginVertical: 20 }} />
        
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <Image style={{ width: Dimensions.get('screen').width / 5, height: Dimensions.get('screen').width / 4, borderRadius: 10 }} resizeMode='contain' source={require('../../../assets/techGuy.png')} />
          <View style={{ paddingLeft: 15, width: Dimensions.get('screen').width / 2 }}>
            <Text style={{ fontWeight: '600', fontSize: 13, color: '#000000' }}>AC Installation</Text>
            <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070' }}>Brought new AC! Don’t know where to install it, which is the right direction to fit the AC?
              Why fear, when Homvery is nearby. Book professionals from Homvery to get the right installation of your AC.
            </Text>
          </View>
        </View>
        <View style={{height: 1, backgroundColor: '#F8F8F8', marginVertical: 20}}/>
        
      </ScrollView>
    </View>
  );
}

function Screen2() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 15, marginTop: 15 }}>
      <Text>Price!</Text>
    </View>
  );
}

function Screen3() {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 15, marginTop: 15, paddingVertical: 10, paddingHorizontal: 20 }}>
      <ScrollView>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/servUser.png')} style={{ width: Dimensions.get('screen').width / 13, height: Dimensions.get('screen').width / 13 }} resizeMode='contain' />
            <View style={{flex: 1, paddingLeft: 20}}>
              <Text style={{ fontWeight: '600', fontSize: 13, color: '#000000' }}>Lorem ipsum</Text>
              <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070' }}>11 Sep 2021</Text>
            </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star-o'} size={12} color={'green'} />
          </View>
          </View>
          <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070', marginVertical: 10 }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vluptua et dolore magna aliquyam. 
          </Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#F8F8F8', marginVertical: 10 }} />
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/servUser.png')} style={{ width: Dimensions.get('screen').width / 13, height: Dimensions.get('screen').width / 13 }} resizeMode='contain' />
            <View style={{flex: 1, paddingLeft: 20}}>
              <Text style={{ fontWeight: '600', fontSize: 13, color: '#000000' }}>Lorem ipsum</Text>
              <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070' }}>11 Sep 2021</Text>
            </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star-o'} size={12} color={'green'} />
          </View>
          </View>
          <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070', marginVertical: 10 }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vluptua et dolore magna aliquyam. 
          </Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#F8F8F8', marginVertical: 10 }} />
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/servUser.png')} style={{ width: Dimensions.get('screen').width / 13, height: Dimensions.get('screen').width / 13 }} resizeMode='contain' />
            <View style={{flex: 1, paddingLeft: 20}}>
              <Text style={{ fontWeight: '600', fontSize: 13, color: '#000000' }}>Lorem ipsum</Text>
              <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070' }}>11 Sep 2021</Text>
            </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star-o'} size={12} color={'green'} />
          </View>
          </View>
          <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070', marginVertical: 10 }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vluptua et dolore magna aliquyam. 
          </Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#F8F8F8', marginVertical: 10 }} />
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/servUser.png')} style={{ width: Dimensions.get('screen').width / 13, height: Dimensions.get('screen').width / 13 }} resizeMode='contain' />
            <View style={{flex: 1, paddingLeft: 20}}>
              <Text style={{ fontWeight: '600', fontSize: 13, color: '#000000' }}>Lorem ipsum</Text>
              <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070' }}>11 Sep 2021</Text>
            </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star-o'} size={12} color={'green'} />
          </View>
          </View>
          <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070', marginVertical: 10 }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vluptua et dolore magna aliquyam. 
          </Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#F8F8F8', marginVertical: 10 }} />
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/servUser.png')} style={{ width: Dimensions.get('screen').width / 13, height: Dimensions.get('screen').width / 13 }} resizeMode='contain' />
            <View style={{flex: 1, paddingLeft: 20}}>
              <Text style={{ fontWeight: '600', fontSize: 13, color: '#000000' }}>Lorem ipsum</Text>
              <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070' }}>11 Sep 2021</Text>
            </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star-o'} size={12} color={'green'} />
          </View>
          </View>
          <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070', marginVertical: 10 }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vluptua et dolore magna aliquyam. 
          </Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#F8F8F8', marginVertical: 10 }} />
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/servUser.png')} style={{ width: Dimensions.get('screen').width / 13, height: Dimensions.get('screen').width / 13 }} resizeMode='contain' />
            <View style={{flex: 1, paddingLeft: 20}}>
              <Text style={{ fontWeight: '600', fontSize: 13, color: '#000000' }}>Lorem ipsum</Text>
              <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070' }}>11 Sep 2021</Text>
            </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star-o'} size={12} color={'green'} />
          </View>
          </View>
          <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070', marginVertical: 10 }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vluptua et dolore magna aliquyam. 
          </Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#F8F8F8', marginVertical: 10 }} />
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/servUser.png')} style={{ width: Dimensions.get('screen').width / 13, height: Dimensions.get('screen').width / 13 }} resizeMode='contain' />
            <View style={{flex: 1, paddingLeft: 20}}>
              <Text style={{ fontWeight: '600', fontSize: 13, color: '#000000' }}>Lorem ipsum</Text>
              <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070' }}>11 Sep 2021</Text>
            </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star-o'} size={12} color={'green'} />
          </View>
          </View>
          <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070', marginVertical: 10 }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vluptua et dolore magna aliquyam. 
          </Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#F8F8F8', marginVertical: 10 }} />
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../../assets/servUser.png')} style={{ width: Dimensions.get('screen').width / 13, height: Dimensions.get('screen').width / 13 }} resizeMode='contain' />
            <View style={{flex: 1, paddingLeft: 20}}>
              <Text style={{ fontWeight: '600', fontSize: 13, color: '#000000' }}>Lorem ipsum</Text>
              <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070' }}>11 Sep 2021</Text>
            </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star'} size={12} color={'green'} />
            <Fa name={'star-o'} size={12} color={'green'} />
          </View>
          </View>
          <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070', marginVertical: 10 }}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vluptua et dolore magna aliquyam. 
          </Text>
        </View>
        <View style={{ height: 1, backgroundColor: '#F8F8F8', marginVertical: 10 }} />
      </ScrollView>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();
export default function Service({ navigation }) {

  const messageCarouselRef = React.useRef(null);
  
  function MessageCarouselComponent() {
  return (
    <Carousel
      ref={messageCarouselRef}
      useScrollView={true}
      layout={"default"}
      autoplay={true}
      loop={true}
      data={[1, 2, 3, 4, 5, 6]}
      sliderWidth={Dimensions.get('screen').width}
      itemWidth={Dimensions.get('screen').width}
      renderItem={_renderTextItem}
    />
  );
  }
  
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#25A8DE'} barStyle={'light-content'} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 9, position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', padding: 15, width: Dimensions.get('screen').width }}>
          <TouchableOpacity onPress={() => { navigation.goBack() }}><Fontisto name="arrow-left-l" color={'#ffffff'} size={20} /></TouchableOpacity>
          <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: '600' }}>Service Details</Text>
          <Fontisto name="arrow-left" color={'#ffffff00'} size={20} />
        </View>
        <View style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <ImageCarouselComponent />
        </View>
        <View style={{ position: 'absolute', top: Dimensions.get('screen').height / 6, width: Dimensions.get('screen').width, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#ffffff', borderRadius: 100, padding: 5 }}><Icon name="history" size={15} color={'#000000'} /></View>
            <Text style={{ color: '#ffffff', fontSize: 13, paddingLeft: 10 }}>30 min waiting time</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#ffffff', borderRadius: 100, padding: 5 }}><Icon name="credit-card-outline" size={15} color={'#000000'} /></View>
            <Text style={{ color: '#ffffff', fontSize: 13, paddingLeft: 10 }}>Minimal visiting charge</Text>
          </View>
        </View>
      </View>
      <View style={{ elevation: 0, marginHorizontal: 30, marginTop: Dimensions.get('screen').height / 1000 }}>
        <View style={{ backgroundColor: '#25A8DE', paddingHorizontal: 15, paddingVertical: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, color: '#ffffff' }}>Air Conditioner Service</Text>
          <View style={{ borderRadius: 10, padding: 5, backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
            <Icon name="star" size={20} color={'#277B3B'} />
            <Text style={{ fontSize: 15, color: '#277B3B' }}>  4.3</Text>
          </View>
        </View>
        <View style={{ backgroundColor: '#ffffff', paddingHorizontal: 15, paddingVertical: 10, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => { messageCarouselRef.current.snapToPrev() }}><Icon name="arrow-left" size={20} color={'#D8D8D8'} /></TouchableOpacity>
          <MessageCarouselComponent />
          <TouchableOpacity onPress={() => { messageCarouselRef.current.snapToNext() }}><Icon name="arrow-right" size={20} color={'#D8D8D8'} /></TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 2, paddingVertical: 10, paddingHorizontal: 30 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            tabBarItemStyle: { width: Dimensions.get('screen').width/3.5 },
            tabBarStyle: { backgroundColor: '#ffffff00', elevation: 0 },
            tabBarActiveTintColor: '#00B0EB',
            tabBarInactiveTintColor: '#000000',
            tabBarIndicatorStyle: {backgroundColor: '#00B0EB'}
          }}
        >
          <Tab.Screen name="Details" component={Screen1} />
          <Tab.Screen name="Pricing" component={Screen2} />
          <Tab.Screen name="Reviews" component={Screen3} />

        </Tab.Navigator>
      </View>
          
      <View style={{ backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={() => {
          navigation.replace('ServiceBooking')
        }}
          style={{ marginVertical: 10, width: '60%', fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
          mode="contained"
        ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Continue</Text></Button>
      </View>
    </View>
  );
}
