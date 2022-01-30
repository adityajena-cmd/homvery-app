import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { AppDesign } from '../../../styles/AppDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StyleObj = AppDesign.OnBoarding

const _animatedStyles = (index, animatedValue, carouselProps) => {
    return;

}

export default function componentName({ navigation }) {

    const [pagination, setpagination] = React.useState(0);
    const carouselRef = React.useRef(null);

    const _renderImageItem = ({ item: ITEM, index }) => {
        return (
            <Image style={StyleObj.s1} resizeMode={'contain'} source={ITEM.item} />
        );
    };

    function ImageCarouselComponent() {
        return (
            <Carousel
                ref={carouselRef}
                scrollEnabled={true}
                useScrollView={true}
                slideInterpolatedStyle={_animatedStyles}
                layout={"default"}
                autoplay={false}
                loop={true}
                data={[{ item: require('../../../assets/ON1.png') }, { item: require('../../../assets/ON2.png') }]}
                sliderWidth={Dimensions.get('screen').width}
                itemWidth={Dimensions.get('screen').width}
                itemHeight={Dimensions.get('screen').width}
                renderItem={_renderImageItem}
                onSnapToItem={(index) => {
                    setpagination(index);
                }}
                extraData={pagination}
                firstItem={pagination}
            />
        );
    }

    const skipOnBoarding = async() => {
        try {
            await AsyncStorage.setItem('ON_BOARD', 'YES');
            navigation.replace('Login')         

        }
        catch (err) {
            console.log(err)
            alert(err)
        }
    }

    return (
        <View style={StyleObj.s2}>
            <View style={StyleObj.s3}>
                <Image resizeMode='contain' style={StyleObj.s4} source={require('../../../assets/LOGO.png')} />
            </View>
            <View style={StyleObj.s5}>
                <ImageCarouselComponent />
            </View>
            <View>
                <Pagination
                    dotsLength={2}
                    activeDotIndex={pagination}
                    dotStyle={{ backgroundColor: '#00ADEE' }}
                    inactiveDotStyle={{}}
                    inactiveDotOpacity={0.5}
                    inactiveDotScale={1}
                />
                {
                    pagination !== 0 ?
                        <View style={StyleObj.s6}>
                            <Button onPress={() => {
                                skipOnBoarding();
                            }}
                                style={StyleObj.s7}
                                mode="contained"
                            ><Text style={StyleObj.s8}>Get Started</Text></Button>
                        </View>
                        :
                        <View style={StyleObj.s9}>
                            <TouchableOpacity
                                onPress={() => {
                                    skipOnBoarding();
                                    
                                }} style={StyleObj.s10}>
                                <Text style={StyleObj.s11}>Skip</Text>
                            </TouchableOpacity>
                            <Button
                                onPress={() => { setpagination(1); carouselRef.current.snapToItem(1) }}
                                style={StyleObj.s12}
                                mode="contained">
                                <Text style={StyleObj.s13}>Next</Text>
                            </Button>
                        </View>
                }


            </View>

        </View>
    );
}
