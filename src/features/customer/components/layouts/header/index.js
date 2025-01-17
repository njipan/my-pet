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
        <Text
          style={{
            color: Colors.PRIMARY,
            fontFamily: 'sans-serif-medium',
            fontWeight: '500',
            letterSpacing: 0.4,
            fontSize: 18,
          }}>
          MyPet
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingHorizontal: 4,
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(Screens.NOTIFICATION_ORDER_CUSTOMER)
          }>
          <Image
            style={{width: 20, height: 20}}
            source={require('./../../../../../assets/icons/notification.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderCustomer;
