import React from 'react';
import {View, Image, Text, useWindowDimensions} from 'react-native';

import {Colors, Typography} from '@style';
import {encodeFromBuffer} from '@util/file';

const NewsListGridItem = ({width, data, ...props}) => {
  const [picture, setPicture] = React.useState({});

  const parsePicture = async () => {
    try {
      const uri = await encodeFromBuffer(data.file.data);
      const source = {uri: `data:image/jpeg;base64,${uri}`};

      setPicture(source);
    } catch (err) {
      console.log(err);
      setPicture(null);
    }
  };

  React.useEffect(() => {
    parsePicture();
  }, []);
  return (
    <View style={{marginBottom: 24}}>
      <View
        style={{
          width: width / 2 - 30,
          height: width / 2 - 30,
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: Colors.BLACK10,
            borderRadius: 8,
          }}
          source={picture}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 5,
          marginTop: 10,
          width: width / 2 - 30,
        }}>
        <Text style={{...Typography.heading('h4'), fontSize: 15}}>
          {data.title}
        </Text>
      </View>
    </View>
  );
};

export default NewsListGridItem;
