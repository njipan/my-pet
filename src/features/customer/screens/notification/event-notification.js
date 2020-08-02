import React from 'react';
import {ScrollView, RefreshControl, View, Text, Image} from 'react-native';
import moment from 'moment';
import {Colors, Typgraphy} from '@style';

import {EventService} from '@service';
import NotificationListItem from '@component/notification/list-item';
import {Screens} from '@constant';

const EventNotificationScreen = ({navigation, ...props}) => {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getEvents = async () => {
    setLoading(true);
    try {
      const response = await EventService.all();
      console.log(response);
      setEvents(response);
      navigation.setParams({
        count: response.length,
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    getEvents();
  }, []);

  const onPress = (event) => {
    navigation.navigate(Screens.EVENT_DETAIL_CUSTOMER, {
      paramData: event,
    });
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={Colors.REFRESH_CONTROL_PRIMARY}
          refreshing={loading}
          onRefresh={() => {
            getEvents();
          }}
        />
      }>
      <View style={{padding: 20}}>
        {events &&
          events.map((event) => (
            <NotificationListItem
              key={event.id}
              file={event.file}
              text={event.title}
              description={
                moment(event.event_date).locale('id').format('DD MMMM YYYY') +
                `\n${event.event_location_name}`
              }
              time={moment(event.created_at).locale('id').fromNow()}
              onPress={() => onPress(event)}
            />
          ))}
      </View>
    </ScrollView>
  );
};

export default EventNotificationScreen;
