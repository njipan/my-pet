import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import {Screens} from '@constant';
import {Colors, Mixins, Typography} from '@style';
import {Icons, ButtonFluid} from '@component';
import StarIcon from '@component/icons/star-icon';
import PhoneIcon from '@component/icons/phone-icon';
import MailIcon from '@component/icons/mail-icon';

const VetServiceDetailScreen = ({navigation, ...props}) => {
  const deviceHeight = useWindowDimensions().height;

  const onBooking = () => {
    navigation.navigate(Screens.ORDER_BOOKING_DETAIL_CUSTOMER);
    // alert('Fitur ini belum tersedia.');
  };

  return (
    <View style={{flex: 1, width: '100%'}}>
      <ScrollView
        style={{backgroundColor: Colors.WHITE}}
        showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <Image
              style={{
                height: 0.32 * deviceHeight,
                backgroundColor: Colors.LIGHT_GREY,
              }}
            />
            <TouchableOpacity
              onPress={onBooking}
              style={{
                position: 'absolute',
                height: 64,
                width: 64,
                backgroundColor: 'white',
                bottom: -32,
                right: 28,
                borderRadius: 64,
                elevation: 5,
                borderBottomWidth: 1,
                borderBottomColor: 'white',
              }}>
              <View
                style={{
                  ...styles.verticalCenter,
                  alignItems: 'center',
                  flex: 1,
                  width: '100%',
                }}>
                <Image
                  source={require('@asset/icons/direction/normal.png')}
                  style={{width: 36, height: 36}}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{...styles.container, borderTopWidth: 0, paddingTop: 24}}>
            <Text style={{...Typography.heading('h3')}}>
              Animal Clinic Jakarta
            </Text>
            <View style={styles.spacerText} />
            <View style={styles.containerInfo}>
              <View style={styles.containerIconInfo}>
                <StarIcon size={20} />
              </View>
              <View style={styles.verticalCenter}>
                <Text style={{...styles.textInfo, fontWeight: 'bold'}}>
                  4.5
                </Text>
              </View>
            </View>
            <View style={styles.spacerText} />
            <View style={styles.containerInfo}>
              <View style={styles.containerIconInfo}>
                <PhoneIcon size={18} />
              </View>
              <View style={styles.verticalCenter}>
                <Text style={{...styles.textInfo, fontWeight: 'bold'}}>
                  (021) 8998212
                </Text>
              </View>
            </View>
            <View style={styles.spacerText} />
            <View style={styles.containerInfo}>
              <View style={styles.containerIconInfo}>
                <MailIcon size={20} type="normal" />
              </View>
              <View style={styles.verticalCenter}>
                <Text style={{...styles.textInfo, fontWeight: 'bold'}}>
                  animalclinic@gmail.com
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.spacerContainer} />
          <View style={{...styles.container}}>
            <Text style={{...Typography.heading('h3')}}>Lokasi</Text>
            <View style={styles.spacerText} />
            <View>
              <Text style={styles.textInfo}>Lokasi</Text>
            </View>
          </View>
          <View style={styles.spacerContainer} />
          <View style={{...styles.container}}>
            <Text style={{...Typography.heading('h3')}}>Jam Operasional</Text>
            <View style={styles.spacerText} />
            <View>
              <Text style={styles.textInfo}>Lokasi</Text>
            </View>
          </View>
          <View style={styles.spacerContainer} />
          <View style={{...styles.container, borderBottomColor: Colors.WHITE}}>
            <Text style={{...Typography.heading('h3')}}>Fasilitas</Text>
            <View style={styles.spacerText} />

            <View style={{flexDirection: 'row', marginBottom: 4}}>
              <View style={{width: 32}}>
                <Text style={styles.textInfo}>1.</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.textInfo}>Lokasi</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.containerAction}>
        <ButtonFluid
          text="Booking"
          styleRoot={{width: '100%'}}
          onPress={onBooking}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Mixins.padding(20, 16),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.LIGHT,
    backgroundColor: Colors.WHITE,
  },
  containerInfo: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  containerIconInfo: {
    marginRight: 10,
  },
  textInfo: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontWeight: '700',
    color: Colors.GREY,
    fontSize: 16,
  },
  spacerText: {...Mixins.margin(2, 0)},
  spacerContainer: {
    ...Mixins.padding(6, 0),
    backgroundColor: Colors.BLACK10,
  },
  verticalCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  containerAction: {
    height: 76,
    backgroundColor: Colors.WHITE,
    width: '100%',
    elevation: 10,
    borderTopWidth: 1,
    borderTopColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    ...Mixins.padding(10, 20),
  },
});

export default VetServiceDetailScreen;
