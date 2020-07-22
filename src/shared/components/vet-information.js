import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {Screens} from '@constant';
import {Colors, Mixins, Typography} from '@style';
import {Icons, ButtonFluid} from '@component';
import StarIcon from '@component/icons/star-icon';
import PhoneIcon from '@component/icons/phone-icon';
import MailIcon from '@component/icons/mail-icon';

const VetInformation = ({navigation, ...props}) => {
  const deviceHeight = useWindowDimensions().height;
  const {
    picture = null,
    name = null,
    rate = null,
    phone = null,
    email = null,
    address = null,
    operationalHour = null,
    facility = null,
    onAction = () => {},
  } = props;

  return (
    <View>
      <View>
        <Image
          style={{
            height: 0.32 * deviceHeight,
            backgroundColor: Colors.LIGHT_GREY,
          }}
          source={picture}
        />
        <TouchableOpacity
          onPress={onAction}
          style={{
            position: 'absolute',
            height: 56,
            width: 56,
            backgroundColor: 'white',
            bottom: -28,
            right: 28,
            borderRadius: 56,
            elevation: 5,
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
              style={{width: 28, height: 28}}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{...styles.container, borderTopWidth: 0, paddingTop: 24}}>
        <Text style={{...Typography.heading('h3')}}>{name}</Text>
        <View style={styles.spacerText} />
        <View style={styles.containerInfo}>
          <View style={styles.containerIconInfo}>
            <StarIcon size={20} />
          </View>
          <View style={styles.verticalCenter}>
            <Text style={{...styles.textInfo, fontWeight: 'bold'}}>{rate}</Text>
          </View>
        </View>
        <View style={styles.spacerText} />
        <View style={styles.containerInfo}>
          <View style={styles.containerIconInfo}>
            <PhoneIcon size={18} />
          </View>
          <View style={styles.verticalCenter}>
            <Text style={{...styles.textInfo, fontWeight: 'bold'}}>
              {phone}
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
              {email}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.spacerContainer} />
      <View style={{...styles.container}}>
        <Text style={{...Typography.heading('h3')}}>Lokasi</Text>
        <View style={styles.spacerText} />
        <View>
          <Text style={styles.textInfo}>{address}</Text>
        </View>
      </View>
      <View style={styles.spacerContainer} />
      <View style={{...styles.container}}>
        <Text style={{...Typography.heading('h3')}}>Jam Operasional</Text>
        <View style={styles.spacerText} />
        <View>
          <Text style={styles.textInfo}>{operationalHour}</Text>
        </View>
      </View>
      <View style={styles.spacerContainer} />
      <View style={{...styles.container, borderBottomColor: Colors.WHITE}}>
        <Text style={{...Typography.heading('h3')}}>Fasilitas</Text>
        <View style={styles.spacerText} />

        <View style={{flexDirection: 'row', marginBottom: 4}}>
          <View style={{flex: 1}}>
            {/* <Text style={styles.textInfo}>{facility}</Text> */}
            <Text
              style={{
                ...styles.textInfo,
                lineHeight: 24,
                fontFamily: Typography.FONT_FAMILY_MEDIUM,
                fontWeight: '400',
              }}>
              {facility}
            </Text>
          </View>
        </View>
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
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontWeight: '400',
    color: Colors.GREY,
    fontSize: 14,
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

export default VetInformation;
