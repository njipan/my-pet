import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/id';

import {ButtonFluid, TextInput} from '@component';
import {Screens, Time} from '@constant';
import {Typography} from '@style';
import * as Modal from '@util/modal';
import {validate, isObjectValuesNull} from '@util/validate';
import {useSchema} from '@shared/hooks';

import {OrderBookDetailSchema} from './../../schemas';

const DetailScreen = ({navigation, ...props}) => {
  const merchant = navigation.getParam('merchant', {});
  const createData = navigation.getParam('createData', {});
  const savedState = navigation.getParam('savedState', null);
  const [showDate, setShowDate] = React.useState(false);
  const {data, messages, setMessages, setFormAndValidate} = useSchema(
    {
      date: createData.bookingDatetime
        ? moment(createData.bookingDatetime).format('DD MMMM YYYY')
        : null,
      time: createData.bookingDatetime
        ? moment(createData.bookingDatetime).format('HH:mm A')
        : null,
    },
    {},
    OrderBookDetailSchema,
  );

  const onDatePress = () => {
    setShowDate(true);
  };

  const onDateChange = (value) => {
    if (!value) {
      setFormAndValidate('date', null);
      return;
    }
    const dateString = moment(new Date(value)).format('DD MMMM YYYY');
    setFormAndValidate('date', dateString);
  };

  const onTimeChange = () => {
    Modal.select({
      items: Time.hours,
      onCallback: (value, hide) => {
        hide(null);
        if (!value) {
          setFormAndValidate('time', null);
          return;
        }
        setFormAndValidate('time', value);
      },
    });
  };

  const onNextPress = async () => {
    try {
      const errs = await validate(data, OrderBookDetailSchema);
      setMessages(errs);
      if (!isObjectValuesNull(errs)) return;

      const body = {
        createData: {
          ...createData,
          merchant_id: merchant.id,
          bookingDatetime: moment(
            `${data.date} ${data.time}`,
            'DD MMMM YYYY HH:mm A',
          ),
        },
      };
      if (savedState) {
        const {routeName, key} = savedState;
        navigation.navigate({routeName, key, params: body});
        return;
      }
      navigation.navigate(Screens.ORDER_BOOKING_CHOOSE_PET_CUSTOMER, body);
    } catch (err) {}
  };

  return (
    <View style={{flex: 1}}>
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          mode="date"
          value={new Date()}
          is24Hour={true}
          display="default"
          onChange={(e) => {
            setShowDate(false);
            onDateChange(e.nativeEvent.timestamp || null);
          }}
        />
      )}
      <View style={{padding: 20, flex: 1}}>
        <TouchableOpacity onPress={onDatePress}>
          <TextInput
            error={messages.date}
            value={(data.date || '') + ''}
            label="Tanggal"
            editable={false}
            placeholder="Tanggal"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onTimeChange}>
          <TextInput
            error={messages.time}
            value={(data.time || '') + ''}
            label="Waktu"
            editable={false}
            placeholder="Waktu"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 100,
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row-reverse',
          paddingHorizontal: 20,
          backgroundColor: 'white',
        }}>
        <ButtonFluid
          text="Lanjut"
          fullWidth={false}
          styleContainer={{paddingLeft: 20, paddingRight: 20}}
          styleRoot={{marginTop: 8}}
          onPress={onNextPress}
        />
      </View>
    </View>
  );
};

DetailScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Detail Booking',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default DetailScreen;
