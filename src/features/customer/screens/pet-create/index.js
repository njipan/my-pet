import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {Screens} from '@constant';

const CreatePetScreen = ({navigation, ...props}) => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>CREATE PET</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default CreatePetScreen;
