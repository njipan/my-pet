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
import moment from 'moment';

import {encodeFromBuffer} from '@util/file';
import {EventService} from '@service';
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

  const paramData = navigation.getParam('paramData');

  const [event, setEvent] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getEvent = async () => {
    setLoading(true);
    setEvent(await EventService.get(paramData.id));
    setLoading(false);
  };

  React.useEffect(() => {
    getEvent();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView
          style={{backgroundColor: 'white'}}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              colors={Colors.REFRESH_CONTROL_PRIMARY}
              onRefresh={getEvent}
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
              source={event.picture}
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
            <View>
              <View style={{padding: 20}}>
                <Text style={{...Typography.heading('h3')}}>{event.title}</Text>
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    paddingBottom: 10,
                    marginBottom: 10,
                    borderBottomColor: Colors.BLACK10,
                  }}>
                  <EventInfoItem
                    label="Tanggal Event"
                    text={moment(event.event_date)
                      .locale('id')
                      .format('DD MMMM YYYY')}
                    icon={
                      <Image
                        source={require('@asset/icons/calendar/normal.png')}
                        style={{width: 20, height: 20, marginRight: 10}}
                      />
                    }
                  />
                  <EventInfoItem
                    label="Lokasi"
                    text={event.event_location_name}
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
                    style={{
                      color: Colors.GREY,
                      fontSize: 14,
                      marginBottom: 10,
                    }}>
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
                      {event.registration_link}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        Clipboard.setString(event.registration_link);
                        ToastAndroid.show('Tersalin', ToastAndroid.LONG);
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
                <Text
                  style={{fontSize: 14, color: Colors.GREY, lineHeight: 22}}>
                  {event.registration_step}
                </Text>
              </View>
              <View style={Box.SPACER_CONTAINER} />
              <View style={{padding: 20}}>
                <Text style={{...Typography.heading('h4'), marginBottom: 8}}>
                  Syarat dan Ketentuan
                </Text>
                <Text
                  style={{fontSize: 14, color: Colors.GREY, lineHeight: 22}}>
                  {event.term_condition}
                </Text>
              </View>
            </View>
          ) : null}
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
