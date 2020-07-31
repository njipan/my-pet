import React from 'react';
import {View, Text, Image} from 'react-native';

import {Colors, Typography} from '@style';

const NewsListItem = (props) => {
  const {label = null, title = null, time = null, picture = null} = props;
  return (
    <View
      style={{
        paddingVertical: 18,
        borderTopWidth: 0.3,
        borderTopColor: Colors.LIGHT_GREY,
      }}>
      <View style={{flexDirection: 'row', height: 100}}>
        <View style={{flex: 1, marginRight: 14}}>
          <Text
            numberOfLines={1}
            style={{
              textTransform: 'uppercase',
              letterSpacing: 2,
              fontSize: 10,
              color: Colors.GREY,
              marginBottom: 10,
            }}>
            {label}
          </Text>
          <Text
            numberOfLines={3}
            style={{
              ...Typography.heading('h4'),
              fontSize: 14,
              lineHeight: 20,
              marginRight: 20,
            }}>
            {title}
          </Text>
        </View>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'yellow',
            borderRadius: 16,
          }}>
          <Image
            source={picture}
            style={{
              width: 100,
              height: 100,
              backgroundColor: Colors.BLACK10,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{fontSize: 12, color: Colors.LIGHT_GREY}}>{time}</Text>
        </View>
        <View>
          <Image />
        </View>
      </View>
    </View>
  );
};

export default NewsListItem;
