import React from 'react';
import {Colors, Mixins, Typography} from '@style';
import {View, Image, Text} from 'react-native';
import {Heading} from '@component';
const HeaderMerchant = ({navigation}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        ...Mixins.padding(16),
        backgroundColor: Colors.WHITE,
      }}>
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Image
          style={{width: 40, height: 40, marginRight: 10}}
          source={require('./../../../../../assets/logos/LogoPrimary.png')}
        />
        <Text style={Typography.FONT_HEADER_TITLE}>MyPet</Text>
      </View>
    </View>
  );
};

export default HeaderMerchant;
