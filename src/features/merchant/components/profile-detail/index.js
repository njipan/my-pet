import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/id';
import {Label, AddCard, TreatmentCard} from '@component';
import {Box, Colors, Mixins, Typography} from '@style';

const PencilIcon = () => {
  return (
    <Image
      source={require('@asset/icons/pencil/black/normal.png')}
      style={{width: 28, height: 28}}
    />
  );
};

const ProfileDetail = (props) => {
  const {data = {}, onEditPress = () => {}, onAddPress = () => {}} = props;

  return (
    <View>
      <View style={{...styles.profileContainer}}>
        <Image
          style={{
            width: 72,
            height: 72,
            borderRadius: 12,
          }}
          source={data.picture}
        />
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 16}}>
          <Text style={{...Typography.heading('h3')}} numberOfLines={2}>
            {data.fullName}
          </Text>
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_REGULAR,
              color: Colors.BLACK80,
            }}>
            Merchant
          </Text>
        </View>
      </View>
      <View style={{...Box.SPACER_CONTAINER}} />
      <View style={{...styles.infoContainer}}>
        <Text style={{...Box.CONTAINER_TITLE, marginBottom: 6}}>
          Merchant Info
        </Text>
        <View>
          <Label title="Email" text={data.email} />
          <Label title="Nomor Telepon" text={data.phone} />
          <Label title="Alamat Klinik" text={data.address} />
          <Label
            title="Jam Operasional"
            text={data.operationalHour}
            styleText={{textTransform: 'uppercase'}}
          />
          <Label
            title="Fasilitas"
            text={data.facility}
            styleText={{lineHeight: 20}}
          />
        </View>
      </View>
      <View style={{...styles.infoContainer}}>
        <Text style={{...Box.CONTAINER_TITLE, marginBottom: 6, marginTop: -16}}>
          Jenis Perawatan
        </Text>
        <View style={{paddingTop: 10}}>
          {data.services &&
            data.services.length > 0 &&
            data.services.map((service) => (
              <TreatmentCard
                {...{
                  name: service.name,
                  description: service.description,
                  price: `Rp ${new Intl.NumberFormat(['ban', 'id']).format(
                    service.price || 0,
                  )}`,
                }}
                icon={
                  <TouchableOpacity onPress={() => onEditPress(service)}>
                    <PencilIcon />
                  </TouchableOpacity>
                }
              />
            ))}
          <AddCard onPress={onAddPress} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    ...Mixins.padding(16),
    flexDirection: 'row',
  },
  infoContainer: {
    ...Mixins.padding(16),
  },
});

export default ProfileDetail;
