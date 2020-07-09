import React, {useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import HomePet from './../../components/home-pet';
import {Screens} from '@constant';
import {PetService} from '@service';

const HomeScreen = ({navigation, ...props}) => {
  const [pets, setPets] = React.useState([]);

  React.useEffect(() => {
    PetService.all()
      .then((response) => {
        setPets(response.data.data);
      })
      .catch(() => {});
  }, null);

  return (
    <ScrollView style={styles.container}>
      <View>
        <HomePet
          onAddPress={() => {
            navigation.navigate(Screens.ADD_PET_CUSTOMER);
          }}
          data={pets}
        />
        <View style={{height: 1000, backgroundColor: 'white'}}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
  },
});

export default HomeScreen;
