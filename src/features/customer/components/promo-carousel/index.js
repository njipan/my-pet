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

import {encodeFromBuffer} from '@util/file';

import {Colors, Box, Typography, Mixins} from '@style';

const PromoCarouselItem = ({item, index, width}) => {
  const [picture, setPicture] = React.useState({});

  const parsePicture = async () => {
    try {
      const uri = await encodeFromBuffer(item.file.data);
      const source = {uri: `data:image/jpeg;base64,${uri}`};

      setPicture(source);
    } catch (err) {
      setPicture(null);
    }
  };

  React.useEffect(() => {
    parsePicture();
  }, []);

  return (
    <View
      style={{
        height: (2 / 3) * width,
        width: width || 100,
        backgroundColor: 'white',
      }}>
      <Image
        source={picture}
        style={{width: '100%', height: '100%', resizeMode: 'contain'}}
      />
    </View>
  );
};

const PromoCarousel = (props) => {
  const {onRightSidePress = () => {}, data = []} = props;
  const deviceWidth = useWindowDimensions().width;
  const [index, setIndex] = React.useState(0);

  const _renderItem = (value) => {
    return <PromoCarouselItem width={deviceWidth} {...value} />;
  };
  return (
    <View>
      <Carousel
        carouselItem={PromoCarouselItem}
        renderItem={_renderItem}
        data={data}
        onIndexChange={(value) => setIndex(value)}
      />
      <View style={{padding: 20}}>
        <CarouselIndicator
          length={data.length}
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
