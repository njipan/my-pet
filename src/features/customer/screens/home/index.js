import React, {useEffect} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import HomePet from './../../components/home-pet';
import {Screens} from '@constant';

const HomeScreen = ({navigation, ...props}) => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <HomePet
          onAddPress={() => {
            navigation.navigate(Screens.ADD_PET_CUSTOMER);
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default HomeScreen;
