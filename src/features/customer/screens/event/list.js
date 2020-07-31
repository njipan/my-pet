import React from 'react';
import {
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import moment from 'moment';

import {EventService} from '@service';
import {encodeFromBuffer} from '@util/file';
import {ButtonFluid} from '@component';
import {Screens} from '@constant';
import {Colors, Mixins, Typography} from '@style';

const EventListItem = (props) => {
  const {
    file = null,
    title = null,
    description = null,
    onPress = () => {},
  } = props;

  const [picture, setPicture] = React.useState({});

  const parsePicture = async () => {
    try {
      const uri = await encodeFromBuffer(file.data);
      const source = {uri: `data:image/jpeg;base64,${uri}`};
      setPicture(source);
    } catch (err) {
      setPicture(null);
    }
  };

  React.useEffect(() => {
    parsePicture();
  }, []);

  return (
    <View style={{marginVertical: 4}}>
      <Image
        style={{
          backgroundColor: Colors.BLACK10,
          height: 100,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}
        source={picture}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{padding: 8, flex: 1}}>
          <Text
            style={{
              ...Typography.heading('h4'),
              fontSize: 16,
            }}>
            {title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.LIGHT_GREY,
            }}>
            {description}
          </Text>
        </View>
        <View style={{paddingRight: 10, paddingLeft: 10}}>
          <ButtonFluid
            text="Lihat"
            onPress={onPress}
            styleContainer={{
              ...Mixins.padding(4, 10),
            }}
            styleText={{
              fontSize: 14,
              fontFamily: Typography.FONT_FAMILY_BOLD,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const EventListScreen = ({navigation, ...props}) => {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getEvents = async () => {
    setLoading(true);
    setEvents(await EventService.all());
    setLoading(false);
  };

  React.useEffect(() => {
    getEvents();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={getEvents}
          colors={Colors.REFRESH_CONTROL_PRIMARY}
        />
      }>
      <View style={{padding: 20}}>
        {Array.isArray(events) &&
          events.map((event) => (
            <EventListItem
              file={event.file}
              title={event.title}
              description={moment(event.event_date)
                .locale('id')
                .format('DD MMMM YYYY')}
              onPress={() =>
                navigation.navigate(Screens.EVENT_DETAIL_CUSTOMER, {
                  paramData: event,
                })
              }
            />
          ))}
      </View>
    </ScrollView>
  );
};

EventListScreen.navigationOptions = ({navigation, ...props}) => {
  return {
    title: 'Event',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default EventListScreen;
