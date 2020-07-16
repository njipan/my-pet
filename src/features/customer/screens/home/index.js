import React, {useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import HomePet from './../../components/home-pet';
import {Screens} from '@constant';
import {PetService} from '@service';

const HomeScreen = ({navigation, ...props}) => {
  const [pets, setPets] = React.useState([]);

  const getMyPets = async () => {
    try {
      const response = await PetService.all();
      setPets(response);
    } catch (err) {
      setPets([]);
    }
  };

  const load = async () => {
    await getMyPets();
  };

  React.useEffect(() => {
    load();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <HomePet
          onCardPress={() =>
            navigation.navigate(Screens.DETAIL_PET_CUSTOMER, {id: 4})
          }
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
