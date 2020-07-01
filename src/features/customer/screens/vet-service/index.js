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
import VetServiceCard from './../../components/vet-service-card';
import {VetService} from '@service';

const VetServiceScreen = ({navigation, ...props}) => {
  const [vets, setVets] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    VetService.getAll({})
      .then((response) => {
        setVets(response.data.data);
      })
      .catch((error) => {})
      .finally(() => {
        setRefreshing(false);
      });
  }, [refreshing]);

  useEffect(() => {
    VetService.getAll({})
      .then((response) => {
        setVets(response.data.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <View>
      <View style={styles.filterContainer}>
        <Image
          source={require('@asset/icons/filter.png')}
          style={{width: 24, height: 24, marginRight: 16}}
        />
        <Heading
          type="h4"
          text="Filter"
          color="#333"
          styleText={{fontSize: 16}}
        />
        <TouchableOpacity
          onPress={() => {}}
          style={{
            borderRadius: 6,
            borderWidth: 1,
            ...Mixins.padding(8, 10, 8, 8),
            marginLeft: 20,
            borderColor: '#CACCCF',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icons.MiniStar />
            <Heading
              type="h5"
              text="Teratas"
              color="#333"
              styleText={{marginLeft: 4, letterSpacing: 0.6, fontSize: 18}}
            />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.container}
        style={{width: '100%', padding: 10}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          {vets.length > 0 &&
            vets.map((vet) => (
              <VetServiceCard
                key={vet.id}
                title={vet.full_name}
                phone={vet.phone}
                address={vet.address}
                onPress={() => {
                  navigation.navigate(Screens.VET_SERVICE_DETAIL_CUSTOMER, {
                    id: vet.id,
                    title: vet.full_name,
                  });
                }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
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

export default VetServiceScreen;
