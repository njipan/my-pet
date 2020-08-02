import React from 'react';
import {TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';

import {Box, Colors, Mixins, Typography} from '@style';
import {encodeFromBuffer} from '@util/file';

const NotificationListItem = (props) => {
  const {
    file = null,
    text = null,
    description = null,
    onPress = null,
    time = null,
  } = props;
  const [picture, setPicture] = React.useState(null);

  const parsePicture = async () => {
    try {
      const uri = await encodeFromBuffer(file.data);
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
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          shadowColor: '#000',
          backgroundColor: 'white',
          ...Mixins.padding(14, 8),
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: Colors.BLACK10,
          borderBottomWidth: 0.8,
        }}>
        <View style={{justifyContent: 'center'}}>
          <Image
            style={{
              width: 52,
              height: 52,
              backgroundColor: picture ? Colors.WHITE : Colors.BLACK10,
              borderRadius: 10,
            }}
            source={picture}
          />
        </View>
        <View style={{justifyContent: 'center', flex: 1, marginLeft: 10}}>
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_REGULAR,
              fontWeight: 'bold',
              fontSize: 14,
              marginBottom: 2,
            }}>
            {text}
          </Text>
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_MEDIUM,
              fontSize: 12,
              color: Colors.LIGHT_GREY,
            }}>
            {description}
          </Text>

          <Text
            style={{
              marginTop: 8,
              fontFamily: Typography.FONT_FAMILY_MEDIUM,
              fontSize: 11,
              color: Colors.LIGHT_GREY,
            }}>
            {time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 10,
  },
});

export default NotificationListItem;
