import React from 'react';
import {
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import {ButtonFluid} from '@component';
import {Screens} from '@constant';
import {Colors, Mixins, Typography} from '@style';

const EventListItem = (props) => {
  const {
    picture = null,
    title = null,
    description = null,
    onPress = () => {},
  } = props;

  return (
    <View style={{marginVertical: 4}}>
      <Image
        style={{
          backgroundColor: Colors.BLACK10,
          height: 100,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{padding: 8, flex: 1}}>
          <Text
            style={{
              ...Typography.heading('h4'),
              fontSize: 16,
            }}>
            Dog Show Event - D
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.LIGHT_GREY,
            }}>
            10 - 15 Agustus 2020 - D
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
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={false} />}>
      <View style={{padding: 20}}>
        <EventListItem
          onPress={() => navigation.navigate(Screens.EVENT_DETAIL_CUSTOMER)}
        />
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
