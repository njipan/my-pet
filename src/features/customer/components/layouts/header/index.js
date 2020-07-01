import React from 'react';
import {Colors, Mixins, Typography} from '@style';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Heading} from '@component';
import {Screens} from '@constant';
const HeaderCustomer = ({navigation}) => {
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
      <View
        style={{
          width: 28,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(Screens.HOME_NOTIFICATION)}>
          <Image
            style={{width: 28, height: 28}}
            source={require('./../../../../../assets/icons/notification.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderCustomer;
