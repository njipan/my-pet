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
import {PetService, EventService, NewsService, PromoService} from '@service';

const HomeScreen = ({navigation, ...props}) => {
  const [pets, setPets] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [promos, setPromos] = React.useState([]);
  const [news, setNews] = React.useState([]);
  const [events, setEvents] = React.useState([]);

  const getMyPets = async () => {
    try {
      const response = await PetService.all();
      setPets(response);
    } catch (err) {
      setPets([]);
    }
  };

  const getPromos = async () => {
    setPromos(await PromoService.all());
  };

  const getNews = async () => {
    setNews(await NewsService.all());
  };

  const getEvents = async () => {
    setEvents(await EventService.all());
  };

  const load = async () => {
    setRefreshing(true);
    await getMyPets();
    await getPromos();
    await getNews();
    await getEvents();
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
            data={promos}
            onRightSidePress={() =>
              navigation.navigate(Screens.PROMO_LIST_CUSTOMER)
            }
          />
        </View>
        <HomePet
          onCardPress={(id, pet) => {
            navigation.navigate(Screens.DETAIL_PET_CUSTOMER, {
              id,
              backTo: navigation.state,
              data: pet,
              reload: getMyPets,
            });
          }}
          onCardEditPress={(pet, picture) => {
            navigation.navigate(Screens.EDIT_PET_CUSTOMER, {
              data: pet,
              picture,
              reload: getMyPets,
              savedState: navigation.state,
            });
          }}
          onAddPress={() => {
            navigation.navigate(Screens.ADD_PET_CUSTOMER, {
              reload: getMyPets,
            });
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
          {events && events.length > 0 ? (
            <EventCarousel
              data={events.slice(0, 5)}
              onRightSidePress={() =>
                navigation.navigate(Screens.EVENT_LIST_CUSTOMER)
              }
            />
          ) : (
            <View
              style={{
                height: 240,
              }}
            />
          )}
        </View>
        {Array.isArray(news) && news.length > 0 && (
          <View style={{padding: 20, backgroundColor: 'white'}}>
            <Text style={{...Typography.heading('h3'), marginBottom: 10}}>
              Berita
            </Text>
            <HomeNews
              data={(news || []).slice(0, 4)}
              onViewAll={() =>
                navigation.navigate(Screens.NEWS_LATEST_CUSTOMER, {
                  paramData: news,
                })
              }
              onNewsPress={(news) => {
                navigation.navigate(Screens.NEWS_DETAIL_CUSTOMER, {
                  paramData: news,
                });
              }}
            />
          </View>
        )}
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
