import React from 'react';
import {
  View,
  StatusBar,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import HomePet from './../../components/home-pet';
import {Screens} from '@constant';
import {Colors} from '@style';
import {PetService} from '@service';

const HomeScreen = ({navigation, ...props}) => {
  const [pets, setPets] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getMyPets = async () => {
    try {
      const response = await PetService.all();
      setPets(response);
    } catch (err) {
      setPets([]);
    }
  };

  const load = async () => {
    setRefreshing(true);
    await getMyPets();
    setRefreshing(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          colors={Colors.REFRESH_CONTROL_PRIMARY}
          refreshing={refreshing}
          onRefresh={load}
        />
      }>
      <View>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <HomePet
          onCardPress={(id) => {
            navigation.navigate(Screens.DETAIL_PET_CUSTOMER, {
              id,
              backTo: navigation.state,
              reload: getMyPets,
            });
          }}
          onAddPress={() => {
            navigation.navigate(Screens.ADD_PET_CUSTOMER);
          }}
          data={pets}
          navigation={navigation}
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
