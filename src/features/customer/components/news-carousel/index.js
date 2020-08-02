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
import {moment} from '@util/moment';

import CarouselIndicator from '@component/carousel-indicator';
import Carousel from '@component/carousel';

import {Colors, Box, Typography, Mixins} from '@style';

const NewsCarouselItem = ({item, index, width}) => {
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
        height: width * (2 / 3),
        backgroundColor: Colors.WHITE,
      }}>
      <Image
        source={picture}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 12,
          resizeMode: 'stretch',
          backgroundColor: picture ? Colors.WHITE : Colors.BLACK10,
        }}
      />
      <View style={{position: 'absolute', bottom: 28, padding: 32}}>
        <Text
          numberOfLines={1}
          style={{
            ...Typography.heading('h4'),
            fontFamily: Typography.FONT_FAMILY_MEDIUM,
            fontWeight: '200',
            fontSize: 14,
            color: 'white',
          }}>
          Pet News • {moment(item.created_at).locale('id').fromNow()}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            ...Typography.heading('h4'),
            fontSize: 17,
            color: 'white',
            lineHeight: 24,
          }}>
          {item.title}
        </Text>
      </View>
    </View>
  );
};

const NewsCarousel = (props) => {
  const {data = []} = props;
  const deviceWidth = useWindowDimensions().width;
  const [index, setIndex] = React.useState(0);

  const _renderItem = (value) => {
    return <NewsCarouselItem width={deviceWidth} {...value} />;
  };
  return (
    <View style={{backgroundColor: 'red'}}>
      <Carousel
        carouselItem={NewsCarouselItem}
        renderItem={_renderItem}
        data={data}
        onIndexChange={(value) => setIndex(value)}
      />
      <View style={{paddingHorizontal: 32, position: 'absolute', bottom: 32}}>
        <CarouselIndicator
          length={data.length}
          activeIndex={index}
          color="white"
        />
      </View>
    </View>
  );
};

export default NewsCarousel;
