import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PetForm from './../../components/pet-form';

const CreateScreen = ({navigation, ...props}) => {
  return (
    <View style={styles.container}>
      <PetForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreateScreen;
