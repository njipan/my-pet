import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {Screens} from '@constant';
import {Colors, Mixins} from '@style';
import {Icons, Heading} from '@component';
import VetServiceCard from '../../components/vet-service-card';
import {VetService} from '@service';

const VetServiceDetailScreen = ({navigation, ...props}) => {
  return <Text>VET SERVICE DETAIL</Text>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  filterContainer: {
    flexDirection: 'row',
    height: 64,
    ...Mixins.padding(0, 16),
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    shadowOffset: {
      width: -1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
  },
});

export default VetServiceDetailScreen;
