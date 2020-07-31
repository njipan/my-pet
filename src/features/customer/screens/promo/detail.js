import React from 'react';
import {
  ActivityIndicator,
  Clipboard,
  TouchableOpacity,
  Image,
  Text,
  View,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  useWindowDimensions,
} from 'react-native';
import Dash from 'react-native-dash';

import {Colors, Typography, Box} from '@style';

const PromoInfoItem = ({icon = null, label = null, text = null}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 6,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0}}>
        <View>{icon}</View>
        <View>
          <Text style={{color: Colors.GREY, fontSize: 12}}>{label}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{...Typography.heading('h4'), fontSize: 14}}>{text}</Text>
      </View>
    </View>
  );
};

const PromoDetailScreen = ({navigation, ...props}) => {
  const deviceWidth = useWindowDimensions().width;
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView
          style={{backgroundColor: 'white'}}
          refreshControl={
            <RefreshControl
              refreshing={false}
              colors={Colors.REFRESH_CONTROL_PRIMARY}
            />
          }>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: (2 / 3) * deviceWidth,
            }}>
            <Image
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: Colors.BLACK10,
              }}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 20,
                left: 10,
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
              onPress={() => navigation.goBack()}>
              <Image
                style={{
                  height: 28,
                  width: 28,
                  borderRadius: 20,
                }}
                source={require('@asset/icons/arrow-back/normal.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={{padding: 20}}>
            <Text style={{...Typography.heading('h3')}}>National Pet Day</Text>
            <Dash
              style={{width: '100%', marginBottom: 10, marginTop: 8}}
              dashColor={Colors.BLACK10}
              dashThickness={1}
              dashGap={4}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: Colors.GREY, fontSize: 14}}>
                Masa Berlaku Hingga
              </Text>
              <Text style={{...Typography.heading('h4'), fontSize: 14}}>
                20 Agustus 2020
              </Text>
            </View>
            <View style={{marginTop: 28}}>
              <Text style={{color: Colors.GREY, fontSize: 16}}>
                Gunakan kode promo dibawah ini
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 20,
                  borderColor: Colors.LIGHT_GREY,
                  borderWidth: 1,
                  borderRadius: 8,
                  marginTop: 8,
                }}>
                <Text style={{...Typography.heading('h4'), fontSize: 14}}>
                  XXX123
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setString('XXX123');
                    ToastAndroid.show('Tersalin', ToastAndroid.LONG);
                  }}>
                  <Image
                    source={require('@asset/icons/copy//normal.png')}
                    style={{
                      width: 18,
                      height: 18,
                      marginRight: 10,
                      marginTop: 4,
                      marginLeft: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginVertical: 20}}>
              <Text style={{...Typography.heading('h4'), marginBottom: 8}}>
                Syarat dan Ketentuan
              </Text>
              <Text style={{fontSize: 14, color: Colors.GREY, lineHeight: 22}}>
                {'1. lorem \n2.dsafd afdsaf'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

PromoDetailScreen.navigationOptions = ({navigation, ...props}) => {
  return {
    header: null,
  };
};

export default PromoDetailScreen;