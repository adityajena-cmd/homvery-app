import React from 'react';
import { View, Text,Dimensions, TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
const width = Dimensions.get('screen').width;
import moment from "moment";
import { ScrollView } from 'react-native-gesture-handler';

const _animatedStyles = (index, animatedValue, carouselProps) => {
  return;
}

export const getDayAndDate = (date) => {
  const result = [];
  for (let i = 4; i >1; i--) {
    const day = moment(date).utcOffset("+05:30").subtract(i, 'days').format('ddd');
    const date_mom = moment(date).utcOffset("+05:30").subtract(i, 'days');
    const res_obj = {
      dateObj:date_mom,
      date: date_mom.format('DD'),
      day: day,
      active: moment(date).utcOffset("+05:30").format('DD') === date_mom.format('DD'),
      timeStamp: moment(date).subtract(i, 'days').utc().utcOffset("+05:30")
    }
    result.push(res_obj);
  }
  for (let i = 0; i < 10; i++) {
    const day = moment(date).utcOffset("+05:30").add(i, 'days').format('ddd');
    const date_mom = moment(date).utcOffset("+05:30").add(i, 'days');
    const res_obj = {
      dateObj:date_mom,
      date: date_mom.format('DD'),
      day: day,
      active: moment(date).utcOffset("+05:30").format('DD') === date_mom.format('DD'),
      timeStamp: moment(date).add(i, 'days').utc().utcOffset("+05:30")
    }
    result.push(res_obj);
  }
  return result
}



export default function CustomCalendar(props) {
  const { timestamp, setTimestamp = () => { } } = props;
  // console.log("setttttt",moment("2012-07-09T19:22:09.1440844Z").format())
  const [datesArr, setDatesArr] = React.useState(timestamp ? getDayAndDate(moment(timestamp).utcOffset("+05:30").format()) : getDayAndDate(new Date()));
  return (
    <View style={{ width: width - 40, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          datesArr.map((item, index) => {
            return <TouchableOpacity onPress={() => { 
              if(moment(new Date()) < item.dateObj){
                console.log(item.timeStamp)
                setTimestamp(item.timeStamp); 
                setDatesArr(getDayAndDate(moment(item.timeStamp).format()))
              }
              }} style={{ zIndex: 1, backgroundColor: item.active ? '#00B0EB' : '#ffffff', flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 15, width: width / 7 }}>
              <Text style={{ color: !item.active ? '#707070' : '#ffffff', fontSize: 14, fontWeight: '500' }}>{item.date}</Text>
              <Text style={{ color: !item.active ? '#707070' : '#ffffff', fontSize: 10, textTransform: 'uppercase', marginBottom: 10 }}>{item.day}</Text>
              <Image style={{ marginBottom: -4, zIndex: 2, width: 15, height: 15 }} source={require('../../../assets/triangle.png')} resizeMode='contain' />
            </TouchableOpacity>
          })
        }
      </ScrollView>
    </View>
  );
}
