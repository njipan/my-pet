import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {Mixins} from '@style';

const PromoNotificationScreen = ({navigation, ...props}) => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={{...Mixins.fontMaker({weight: 'SemiBold'}), fontSize: 32}}>
          Promo NOTIFICATION
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default PromoNotificationScreen;
