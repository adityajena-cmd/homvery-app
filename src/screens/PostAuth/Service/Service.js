import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Fa from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import urlconfig from '../../../config/config.json'
import { GetInventory, GetReviews } from '../../../config/Apis/PublicApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import moment from 'moment';

const _animatedStyles = (index, animatedValue, carouselProps) => {
  return;

}
const _renderImageItem = ({ item, index }) => {
  return (
    <Image
      key={index}
      source={item.url ? { uri: urlconfig.baseURL + item?.url } : require('../../../assets/acImg2.png')}
      resizeMode={'cover'}
      style={{ height: Dimensions.get('screen').height / 4, width: Dimensions.get('screen').width, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} />
  );
};

const _renderTextItem = ({ item: ITEM, index }) => {
  return (
    <Text style={{ fontSize: 14, color: '#000000', textAlign: 'center', width: Dimensions.get('screen').width / 1.5 }}>Rahul booked for AC service recently</Text>
  );
};

function ImageCarouselComponent({ images }) {
  return (
    <Carousel
      slideInterpolatedStyle={_animatedStyles}
      useScrollView={true}
      layout={"default"}
      autoplay={true}
      loop={true}
      data={images}
      sliderWidth={Dimensions.get('screen').width}
      itemWidth={Dimensions.get('screen').width}
      containerCustomStyle={{ height: Dimensions.get('screen').height / 4 }}
      renderItem={_renderImageItem}
    />
  );
}


function Screen1({ data }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 15, marginTop: 15, paddingVertical: 10, paddingHorizontal: 20 }}>
      <ScrollView>
        {
          data.length > 0 && data.map(item =>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Image style={{ width: Dimensions.get('screen').width / 5, height: Dimensions.get('screen').width / 4, borderRadius: 10 }}
                resizeMode='contain' source={item.displayPic?.url ? { uri: urlconfig.baseURL + item.displayPic?.url } : require('../../../assets/techGuy.png')} />
              <View style={{ paddingLeft: 15, width: Dimensions.get('screen').width / 2 }}>
                <Text style={{ fontWeight: '600', fontSize: 13, color: '#000000' }}>{item.Title}</Text>
                <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070' }}>{item.description}</Text>
              </View>
            </View>

          )
        }

        {/* <View style={{ height: 1, backgroundColor: '#F8F8F8', marginVertical: 20 }} /> */}


      </ScrollView>
    </View>
  );
}

function Screen2({ priceList, inventoryList }) {
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#ffffff', borderRadius: 15, marginTop: 15 }}>
      <Text style={{ fontWeight: '600', fontSize: 18, marginTop: 10 }}>Price Listing</Text>
      {
        priceList?.length > 0 && priceList?.map(item =>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
              <Text style={{ color: '#000000', fontSize: 16 }}>{item.type && item.type}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: '#000000', fontSize: 16, textAlign: 'right' }}>{item.cost && '₹ ' + item.cost.toString()}</Text>
            </View>

          </View>
        )
      }
      <Text style={{ fontWeight: '600', fontSize: 18, marginTop: 30 }}>Spare Parts</Text>
      {
        inventoryList?.length > 0 && inventoryList?.map(item =>
          <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
            <View style={{ marginTop: 5, flexDirection: 'row' }}>
              <Text style={{ color: '#000000', fontSize: 16 }}>{item.item_name && item.item_name}</Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: '#000000', fontSize: 16, textAlign: 'right' }}>{item.price_mask && '₹ ' + item.price_mask.toString()}</Text>
            </View>

          </View>
        )
      }

    </View >
  );
}

function Screen3({ reviews }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 15, marginTop: 15, paddingVertical: 10, paddingHorizontal: 20 }}>
      <ScrollView>

        {
          reviews && reviews.length > 0 ?
            reviews.map(item => (
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../../../assets/servUser.png')} style={{ width: Dimensions.get('screen').width / 13, height: Dimensions.get('screen').width / 13 }} resizeMode='contain' />
                  <View style={{ flex: 1, paddingLeft: 20 }}>
                    <Text style={{ fontWeight: '600', fontSize: 13, color: '#000000' }}>{item?.comments ? item.comments : ''}</Text>
                    <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070' }}>{moment(new Date(item?.created_at)).format('Do MMM YYYY')}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Rating
                      type='custom'
                      ratingColor='green'
                      count={5}
                      ratingTextColor='green'
                      readonly={true}
                      startingValue={item?.rating ? item?.rating : 0}
                      imageSize={12}
                      style={{ paddingVertical: 10 }}
                    />
                  </View>
                </View>
                <Text style={{ fontWeight: '400', fontSize: 10, color: '#707070', marginVertical: 10 }}>{item?.description ? item.description : ''}</Text>
              </View>
            )) :
            <></>
        }
        <View style={{ height: 1, backgroundColor: '#F8F8F8', marginVertical: 10 }} />
      </ScrollView>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();
export default function Service({ navigation, route }) {

  const [details, setDetails] = useState([]);
  const [images, setImages] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [city, setCity] = useState('');
  const [isAuth, setAuth] = useState(false);
  let service = route?.params?.data
  const messageCarouselRef = React.useRef(null);

  const checkCity = async () => {
    try {
      let val = await AsyncStorage.getItem('CITY')
      let isLoggedIn = await AsyncStorage.getItem('IS_LOGGEDIN')
      console.log(isLoggedIn)
      setAuth(isLoggedIn === 'NO' ? false : true)
      setCity(val)
      GetInventory(service?.id, val)
        .then(res => {
          console.log("DATA========", res.data, res.status)
          if (res.status === 200) {
            setInventory(res.data)
          }
        }).catch(err => {
          console.log(err)
        })


    }
    catch (err) {
      console.log(err)
    }
  }

  const getReviews = (id) => {
    GetReviews(id)
      .then(res => {
        if (res.status === 200) {
          setRating(res.data?.avgRating)
          if (res.data.reviews.length > 0) {
            setReviews(res.data?.reviews)
          }
        }
      }).catch(err => {
        console.log('err', err)
      })
  }

  useEffect(() => {
    checkCity()
    console.log(service?.id)
    service?.service_locations.forEach(item => {
      if (item.city?.name === city) {
        setPriceList(item?.price)
      }
    })
    getReviews(service?.id)
    setDetails(service?.details)
    setImages(service?.images)


  }, []);


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
            <Text style={{ fontSize: 15, color: '#277B3B' }}>{rating.toString()}</Text>
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
            tabBarItemStyle: { width: Dimensions.get('screen').width / 3.5 },
            tabBarStyle: { backgroundColor: '#ffffff00', elevation: 0 },
            tabBarActiveTintColor: '#00B0EB',
            tabBarInactiveTintColor: '#000000',
            tabBarIndicatorStyle: { backgroundColor: '#00B0EB' }
          }}
        >
          <Tab.Screen name="Details" children={() => <Screen1 data={details} />} />
          <Tab.Screen name="Pricing" children={() => <Screen2 priceList={priceList} inventoryList={inventory} />} />
          <Tab.Screen name="Reviews" children={() => <Screen3 reviews={reviews} />} />

        </Tab.Navigator>
      </View>

      <View style={{ backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={() => {
          if(isAuth){
            navigation.replace('ServiceBooking',{data:{serviceId:service?.id,servicename:service?.name}})
          }else{
            navigation.replace('Login')
          }
          
        }}
          style={{ marginVertical: 10, width: '60%', fontSize: 20, backgroundColor: '#05194E', borderRadius: 10, paddingVertical: 0 }}
          mode="contained"
        ><Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '400' }}>Continue</Text></Button>
      </View>
    </View>
  );
}
