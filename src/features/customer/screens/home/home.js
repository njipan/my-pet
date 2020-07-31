import React from 'react';
import {
  View,
  StatusBar,
  RefreshControl,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import HomePet from './../../components/home-pet';
import PromoCarousel from './../../components/promo-carousel';
import EventCarousel from './../../components/event-carousel';
import HomeNews from './../../components/home-news';

import {Screens} from '@constant';
import {Colors, Typography} from '@style';
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
      <View style={{backgroundColor: 'black'}}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={{backgroundColor: 'white'}}>
          <PromoCarousel
            onRightSidePress={() =>
              navigation.navigate(Screens.PROMO_LIST_CUSTOMER)
            }
          />
        </View>
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
        <View style={{backgroundColor: Colors.WHITE}}>
          <View
            style={{paddingHorizontal: 20, paddingTop: 20, marginBottom: -4}}>
            <Text style={{...Typography.heading('h3')}}>Event</Text>
            <Text
              style={{
                color: Colors.LIGHT_GREY,
                width: '80%',
                fontSize: 13,
                marginTop: 4,
              }}>
              Temukan berbagai keseruan dengan hewan peliharaan kamu.
            </Text>
          </View>
          <EventCarousel
            onRightSidePress={() =>
              navigation.navigate(Screens.EVENT_LIST_CUSTOMER)
            }
          />
        </View>
        <View style={{padding: 20, backgroundColor: 'white'}}>
          <Text style={{...Typography.heading('h3'), marginBottom: 10}}>
            Berita
          </Text>
          <HomeNews />
        </View>
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
