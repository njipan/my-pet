import React from 'react';
import {Text, View} from 'react-native';

import Label from './../label';
import {Colors, Typography} from '@style';

const OrderInfo = (props) => {
  const {name = null, booking = null, date = null} = props;
  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            fontFamily: Typography.FONT_FAMILY_REGULAR,
            fontSize: 24,
            fontWeight: 'bold',
            color: Colors.REGULAR,
          }}>
          {name}
        </Text>
        <Text
          style={{
            fontFamily: Typography.FONT_FAMILY_REGULAR,
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 4,
            color: Colors.LIGHT_GREY,
          }}>
          Booking ID : {booking}
        </Text>
      </View>
      <Label
        styleText={{textTransform: 'none'}}
        title="Tanggal/Waktu"
        text={date}
      />
    </View>
  );
};

export default OrderInfo;
