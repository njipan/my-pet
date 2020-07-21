import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {Screens} from '@constant';
import {Colors, Mixins, Typography} from '@style';
import {Icons, Heading} from '@component';
import {VetService} from '@service';
import {Badge} from '@component';

import VetServiceCard from './../../components/vet-service-card';

const FilterItem = ({text, ...props}) => {
  return <Badge text={text} {...props} />;
};

const VetServiceListScreen = ({navigation, ...props}) => {
  const [vets, setVets] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [filter, setFilter] = React.useState({rate: false});

  const getVets = async () => {
    try {
      const vets = await VetService.getAll({});
      setVets(vets);
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = async () => {
    setRefreshing(true);
    await getVets();
    setRefreshing(false);
  };

  const onFilterRatePress = () => {
    const rate = !filter.rate;
    setFilter({rate});
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <View>
      <View style={styles.filterContainer}>
        <Image
          source={require('@asset/icons/filter.png')}
          style={{width: 24, height: 24, marginRight: 4}}
        />
        <Heading
          type="h4"
          text="Filter"
          color="#333"
          styleText={{
            fontSize: 18,
            fontFamily: Typography.FONT_FAMILY_REGULAR,
            fontWeight: 'bold',
          }}
        />
        <View style={{marginLeft: 20}}>
          <TouchableOpacity onPress={onFilterRatePress}>
            <FilterItem
              text="Tertinggi"
              renderIcon={<Icons.MiniStar />}
              styleText={{
                fontSize: 18,
                color: filter.rate ? Colors.WHITE : Colors.PRIMARY,
                fontFamily: Typography.FONT_FAMILY_REGULAR,
                fontWeight: 'bold',
                marginLeft: 4,
              }}
              styleRoot={{
                borderRadius: 6,
                ...Mixins.padding(6, 10),
                borderWidth: 1,
                borderColor: filter.rate ? Colors.WHITE : Colors.LIGHT_GREY,
                backgroundColor: filter.rate ? Colors.PRIMARY : Colors.WHITE,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.container}
        style={{width: '100%', padding: 10}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => refresh()}
            colors={Colors.REFRESH_CONTROL_PRIMARY}
          />
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
                    data: vet,
                  });
                }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

VetServiceListScreen.navigationOptions = {
  title: 'Vet Servis',
  headerTitleStyle: Typography.FONT_HEADER_TITLE,
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

export default VetServiceListScreen;
