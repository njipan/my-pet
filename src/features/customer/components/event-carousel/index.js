import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {encodeFromBuffer} from '@util/file';

import CarouselIndicator from '@component/carousel-indicator';
import Carousel from '@component/carousel';

import {Colors, Box, Typography, Mixins} from '@style';

const EventCarouselItem = ({item, index, width}) => {
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
        width: width || 100,
        padding: 20,
        height: 200,
        backgroundColor: Colors.WHITE,
      }}>
      <Image
        source={picture}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 16,
          backgroundColor: Colors.BLACK10,
        }}
      />
    </View>
  );
};

const EventCarousel = (props) => {
  const {onRightSidePress = () => {}, data = []} = props;
  const deviceWidth = useWindowDimensions().width;
  const [index, setIndex] = React.useState(0);

  const _renderItem = (value) => {
    return <EventCarouselItem width={deviceWidth} {...value} />;
  };
  return (
    <View>
      <Carousel
        carouselItem={EventCarouselItem}
        renderItem={_renderItem}
        data={data}
        onIndexChange={(value) => setIndex(value)}
      />
      <View style={{paddingHorizontal: 20}}>
        <CarouselIndicator
          length={data.length}
          activeIndex={index}
          rightSide={
            <TouchableOpacity onPress={onRightSidePress}>
              <Text
                style={{
                  ...Typography.CAROUSEL_INDICATOR_TEXT,
                  paddingRight: 4,
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
