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
import moment from 'moment';

import {PromoService} from '@service';
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
  const paramData = navigation.getParam('paramData');

  const [promo, setPromo] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getPromo = async () => {
    setLoading(true);
    setPromo(await PromoService.get(paramData.id));
    setLoading(false);
  };

  React.useEffect(() => {
    getPromo();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView
          style={{backgroundColor: 'white'}}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={getPromo}
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
                resizeMode: 'stretch',
              }}
              source={promo.picture}
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

          {!loading ? (
            <View style={{padding: 20}}>
              <Text style={{...Typography.heading('h3')}}>{promo.title}</Text>
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
                  {moment(promo.end_at).locale('id').format('DD MMMM YYYY')}
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
                    {promo.code}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      Clipboard.setString(promo.code);
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
                <Text
                  style={{fontSize: 14, color: Colors.GREY, lineHeight: 22}}>
                  {promo.term_condition}
                </Text>
              </View>
            </View>
          ) : null}
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
