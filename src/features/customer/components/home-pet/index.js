import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Mixins, Colors} from '@style';
import {Heading, Icons} from '@component';

const HomePet = ({onAddPress = () => {}}) => {
  return (
    <View>
      <LinearGradient
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#ffffff', '#fff0c8']}>
        <Heading
          type="h4"
          text="Belum Ada Hewan Peliharaan"
          color={Colors.BLACK87}
        />

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
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    ...Mixins.padding(16),
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
