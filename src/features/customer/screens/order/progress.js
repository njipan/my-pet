import React from 'react';
import {Image, Text, ScrollView, View} from 'react-native';

import {NotificationCard} from '@component/order';
import {Box, Colors, Mixins, Typography} from '@style';

const ProgressScreen = ({navigation, ...props}) => {
  const {picture, text = null, description = null} = props;
  return (
    <ScrollView style={{padding: 16, overflow: 'visible'}}>
      <View style={{backgroundColor: 'white'}}>
        <NotificationCard
          text="Animal Clinic Jakarta"
          description="Minggu, 20 April 2020 08:00 AM"
          picture={
            <Image
              source={require('@asset/icons/menu-bar/vet-service-active/normal.png')}
              style={{width: 36, height: 36}}
            />
          }
        />
      </View>
    </ScrollView>
  );
};

ProgressScreen.navigationOptions = {
  title: 'Dalam Proses',
};

export default ProgressScreen;
