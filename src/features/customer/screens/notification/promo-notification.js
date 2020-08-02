import React from 'react';
import {ScrollView, RefreshControl, View, Text, Image} from 'react-native';
import moment from 'moment';
import {Colors, Typgraphy} from '@style';

import {PromoService} from '@service';
import NotificationListItem from '@component/notification/list-item';
import {Screens} from '@constant';

const PromoNotificationScreen = ({navigation, ...props}) => {
  const [promos, setPromos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getPromos = async () => {
    setLoading(true);
    try {
      const response = await PromoService.all();
      console.log(response);
      setPromos(response);
      navigation.setParams({
        count: response.length,
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    getPromos();
  }, []);
  const onPress = (promo) => {
    navigation.navigate(Screens.PROMO_DETAIL_CUSTOMER, {
      paramData: promo,
    });
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={Colors.REFRESH_CONTROL_PRIMARY}
          refreshing={loading}
          onRefresh={() => {
            getPromos();
          }}
        />
      }>
      <View style={{padding: 20}}>
        {promos &&
          promos.map((promo) => (
            <NotificationListItem
              key={promo.id}
              file={promo.file}
              text={promo.title}
              description={`Berlaku sampai dengan ${moment(promo.end_at)
                .locale('id')
                .format('DD MMMM YYYY')}`}
              time={moment(promo.created_at).locale('id').fromNow()}
              onPress={() => onPress(promo)}
            />
          ))}
      </View>
    </ScrollView>
  );
};

export default PromoNotificationScreen;
