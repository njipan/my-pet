import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {Mixins} from '@style';

const EventNotificationScreen = ({navigation, ...props}) => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={{...Mixins.fontMaker({weight: 'SemiBold'}), fontSize: 32}}>
          Event NOTIFICATION
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

export default EventNotificationScreen;
