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

import {Colors, Typography, Box} from '@style';

const EventInfoItem = ({icon = null, label = null, text = null}) => {
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

const EventDetailScreen = ({navigation, ...props}) => {
  const deviceWidth = useWindowDimensions().width;
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView
          style={{backgroundColor: 'white'}}
          refreshControl={<RefreshControl refreshing={false} />}>
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
                  height: 32,
                  width: 32,
                  borderRadius: 20,
                }}
                source={require('@asset/icons/arrow-back/normal.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{padding: 20}}>
            <Text style={{...Typography.heading('h3')}}>Dog Show</Text>

            <View
              style={{
                borderBottomWidth: 0.2,
                paddingBottom: 10,
                marginBottom: 10,
                borderBottomColor: Colors.BLACK10,
              }}>
              <EventInfoItem
                label="Tanggal Event"
                text="14 - 15 Agustus 2020"
                icon={
                  <Image
                    source={require('@asset/icons/calendar/normal.png')}
                    style={{width: 20, height: 20, marginRight: 10}}
                  />
                }
              />
              <EventInfoItem
                label="Lokasi"
                text="Central Park Mall Jakarta"
                icon={
                  <Image
                    source={require('@asset/icons/maps/place/normal.png')}
                    style={{width: 20, height: 20, marginRight: 10}}
                  />
                }
              />
            </View>
            <View>
              <Text
                style={{color: Colors.GREY, fontSize: 14, marginBottom: 10}}>
                Link Pendaftaran
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: Colors.BLUE,
                    fontFamily: Typography.FONT_FAMILY_BOLD,
                    fontSize: 14,
                    marginRight: 10,
                  }}>
                  bit.ly/dsaf/dsaf
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setString('bit.ly/dsfsd/dsaf');
                    ToastAndroid.show('Salin', ToastAndroid.LONG);
                  }}>
                  <Image
                    source={require('@asset/icons/copy//normal.png')}
                    style={{
                      width: 18,
                      height: 18,
                      marginRight: 10,
                      marginTop: 4,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={Box.SPACER_CONTAINER} />
          <View style={{padding: 20}}>
            <Text style={{...Typography.heading('h4'), marginBottom: 8}}>
              Cara Pendaftaran
            </Text>
            <Text style={{fontSize: 14, color: Colors.GREY, lineHeight: 22}}>
              {'1. lorem \n2.dsafd afdsaf'}
            </Text>
          </View>
          <View style={Box.SPACER_CONTAINER} />
          <View style={{padding: 20}}>
            <Text style={{...Typography.heading('h4'), marginBottom: 8}}>
              Syarat dan Ketentuan
            </Text>
            <Text style={{fontSize: 14, color: Colors.GREY, lineHeight: 22}}>
              {'1. lorem \n2.dsafd afdsaf'}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

EventDetailScreen.navigationOptions = ({navigation, ...props}) => {
  return {
    header: null,
  };
};

export default EventDetailScreen;
