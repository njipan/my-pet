import React from 'react';
import {
  Dimensions,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Mixins, Colors} from '@style';
import {Heading, Badge, Icons} from '@component';
import PetItemCard from './../pet-item-card';

const HomePet = ({onAddPress = () => {}, data = [], ...props}) => {
  const deviceWidth = useWindowDimensions().width;
  return (
    <View>
      <LinearGradient
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#ffffff', '#fff0c8']}>
        <View style={{marginHorizontal: 16}}>
          <Heading
            type="h4"
            text={
              !Array.isArray(data) || data.length < 1
                ? `Belum Ada Hewan Peliharaan`
                : `Hewan Peliharaan`
            }
            color={Colors.BLACK87}
          />
        </View>
        {Array.isArray(data) && data.length > 0 ? (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingVertical: 16}}>
            <View style={{marginHorizontal: 8}} />
            <TouchableHighlight
              style={{marginRight: 16, width: deviceWidth * 0.85}}
              onPress={() => {}}
              underlayColor="transparent">
              <PetItemCard />
            </TouchableHighlight>
            <TouchableHighlight
              style={{marginRight: 16}}
              onPress={() => {}}
              underlayColor="transparent">
              <PetItemCard />
            </TouchableHighlight>
          </ScrollView>
        ) : (
          <View style={{marginHorizontal: 16}}>
            <TouchableOpacity style={styles.addPetWrapper}>
              <View style={styles.addPetInnerWrapper}>
                <View>
                  <Icons.VetServiceIcon size="large" />
                </View>
                <View style={{flex: 1, marginLeft: 16, marginRight: 10}}>
                  <Heading
                    type="h5"
                    text="Tambah Hewan Peliharaan"
                    color={Colors.BLACK87}
                  />
                </View>
                <View>
                  <TouchableOpacity onPress={onAddPress}>
                    <Icons.AddIcon size="large" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 16,
  },
  addPetWrapper: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#fff',
    ...Mixins.padding(12, 16),
    elevation: 0,
    borderRadius: 10,
  },
  addPetInnerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomePet;
