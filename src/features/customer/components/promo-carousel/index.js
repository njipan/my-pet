import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';

import CarouselIndicator from '@component/carousel-indicator';
import Carousel from '@component/carousel';

import {Colors, Box, Typography, Mixins} from '@style';

const PromoCarouselItem = ({item, index, width}) => {
  return (
    <View
      style={{
        height: 200,
        width: width || 100,
        backgroundColor: 'white',
      }}></View>
  );
};

const PromoCarousel = (props) => {
  const {onRightSidePress = () => {}, data = []} = props;
  const deviceWidth = useWindowDimensions().width;
  const [index, setIndex] = React.useState(0);
  const dummy = [
    {id: 1, text: 'Testing'},
    {id: 2, text: 'Testing 1'},
  ];

  const _renderItem = (value) => {
    return <PromoCarouselItem width={deviceWidth} {...value} />;
  };
  return (
    <View>
      <Carousel
        carouselItem={PromoCarouselItem}
        renderItem={_renderItem}
        data={dummy}
        onIndexChange={(value) => setIndex(value)}
      />
      <View style={{padding: 20}}>
        <CarouselIndicator
          length={dummy.length}
          activeIndex={index}
          rightSide={
            <TouchableOpacity onPress={onRightSidePress}>
              <Text
                style={{
                  ...Typography.CAROUSEL_INDICATOR_TEXT,
                }}>
                Lihat Semua Promo
              </Text>
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
};

export default PromoCarousel;
