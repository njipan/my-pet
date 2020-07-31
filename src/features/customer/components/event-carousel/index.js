import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import CarouselIndicator from '@component/carousel-indicator';
import Carousel from '@component/carousel';

import {Colors, Box, Typography, Mixins} from '@style';

const EventCarouselItem = ({item, index, width}) => {
  return (
    <View
      style={{
        width: width || 100,
        padding: 20,
      }}>
      <LinearGradient
        style={{width: width - 40, height: 168, borderRadius: 10, padding: 20}}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#EACDA3', '#D6AE7B']}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'column',
            flex: 1,
          }}>
          <View>
            <Text
              style={{
                fontSize: 24,
                fontFamily: Typography.FONT_FAMILY_BOLD,
                marginBottom: 6,
              }}>
              Dog Show
            </Text>
            <Text style={{fontSize: 16}}>14 - 15 Agustus 2020</Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: Typography.FONT_FAMILY_BOLD,
                marginBottom: 10,
              }}>
              Central Park Jakarta
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Typography.FONT_FAMILY_MEDIUM,
              }}>
              Link pendaftaran: bit.ly/asda/sad
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const EventCarousel = (props) => {
  const {onRightSidePress = () => {}, data = []} = props;
  const deviceWidth = useWindowDimensions().width;
  const [index, setIndex] = React.useState(0);
  const dummy = [
    {id: 1, text: 'Testing'},
    {id: 2, text: 'Testing 1'},
  ];

  const _renderItem = (value) => {
    return <EventCarouselItem width={deviceWidth} {...value} />;
  };
  return (
    <View>
      <Carousel
        carouselItem={EventCarouselItem}
        renderItem={_renderItem}
        data={dummy}
        onIndexChange={(value) => setIndex(value)}
      />
      <View style={{paddingHorizontal: 20}}>
        <CarouselIndicator
          length={dummy.length}
          activeIndex={index}
          rightSide={
            <TouchableOpacity onPress={onRightSidePress}>
              <Text
                style={{
                  ...Typography.CAROUSEL_INDICATOR_TEXT,
                }}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
};

export default EventCarousel;
