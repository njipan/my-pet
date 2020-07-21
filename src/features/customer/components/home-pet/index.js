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
import {Mixins, Colors, Typography} from '@style';
import {Heading, Badge, Icons} from '@component';
import PetItemCard from './../pet-item-card';

export const AddPetCard = ({
  styleRoot = {},
  styleContainer = {},
  styleText = {},
  text = '',
}) => {
  return (
    <View
      style={{
        borderRadius: 12,
        backgroundColor: 'white',
        padding: 12,
        width: 120,
        height: 160,
        ...styleRoot,
      }}>
      <View
        style={{
          borderRadius: 8,
          height: '100%',
          width: '100%',
          borderStyle: 'dashed',
          borderWidth: 2,
          borderColor: Colors.LIGHT_GREY,
          justifyContent: 'center',
          alignItems: 'center',
          ...styleContainer,
        }}>
        <Text
          style={{
            color: Colors.PRIMARY,
            fontSize: 16,
            fontFamily: 'sans-serif-medium',
            marginBottom: 8,
            ...styleText,
          }}>
          {text || `Tambah`}
        </Text>
        <Image
          source={require('@asset/icons/add.png')}
          style={{width: 28, height: 28}}
        />
      </View>
    </View>
  );
};

const HomePet = ({
  onAddPress = () => {},
  onCardPress = () => {},
  onCardEditPress = () => {},
  data = [],
  ...props
}) => {
  const deviceWidth = useWindowDimensions().width;
  return (
    <View>
      <LinearGradient
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#ffffff', '#fff0c8']}>
        <View style={{marginHorizontal: 16}}>
          <Text
            style={{
              ...Typography.heading('h3'),
              fontSize: 18,
              color: Colors.BLACK87,
            }}>
            {!Array.isArray(data) || data.length < 1
              ? `Belum Ada Hewan Peliharaan`
              : `Hewan Peliharaan`}
          </Text>
        </View>
        {data && data.length > 0 ? (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingVertical: 16}}>
            <View style={{marginHorizontal: 8}} />
            {data.map((pet, idx) => {
              return (
                <TouchableHighlight
                  key={pet.id}
                  style={{marginRight: 16, width: deviceWidth * 0.85}}
                  onPress={() => onCardPress(pet.id)}
                  underlayColor="transparent">
                  <PetItemCard
                    data={{...pet, dateOfBirth: pet.date_of_birth}}
                    {...props}
                  />
                </TouchableHighlight>
              );
            })}
            <TouchableHighlight
              style={{marginRight: 16}}
              onPress={() => onAddPress()}
              underlayColor="transparent">
              <AddPetCard />
            </TouchableHighlight>
          </ScrollView>
        ) : (
          <View style={{marginHorizontal: 16, paddingBottom: 16}}>
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
