import React from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  View,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import {Badge} from '@component';
import {Sex} from '@constant';
import {Colors, Mixins, Typography} from '@style';
import moment from 'moment';

export const InfoItem = (props) => {
  const {label = '', text = ''} = props;
  return (
    <View
      style={{
        marginTop: 4,
        paddingBottom: 8,
        borderColor: Colors.BLACK10,
        borderBottomWidth: 1,
      }}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.infoValue}>{text}</Text>
    </View>
  );
};

export const PetHistoryItem = ({title = '', text = '', image = null}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderColor: Colors.BLACK10,
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginBottom: 12,
      }}>
      <Image source={image} style={{width: 40, height: 40}} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: Typography.FONT_FAMILY_BOLD,
            fontSize: 14,
            color: Colors.BLACK,
            marginBottom: 2,
          }}>
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: Typography.FONT_FAMILY_BOLD,
            fontSize: 12,
            color: Colors.GREY,
          }}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const PetDetail = ({data, ...props}) => {
  const deviceHeight = useWindowDimensions().height;
  return (
    <View>
      <Image
        style={{
          width: '100%',
          height: deviceHeight * 0.35,
          backgroundColor: 'black',
          resizeMode: 'cover',
        }}
      />
      <View
        style={{padding: 16, backgroundColor: Colors.WHITE, marginBottom: 10}}>
        <Text
          style={{
            fontFamily: Typography.FONT_FAMILY_BOLD,
            color: Colors.BLACK,
            fontSize: Typography.FONT_SIZE_20,
            marginBottom: 8,
          }}>
          {data.name || ''}
        </Text>
        <Text style={styles.textDetail}>Ras: {data.breed || ''}</Text>
        <Text style={styles.textDetail}>Usia: 6 Bulan</Text>
        <View style={{flexDirection: 'row', marginTop: 6}}>
          <Badge icon={Sex.getIcon(data.sex)} text={Sex.translate(data.sex)} />
          <View style={{marginHorizontal: 2}} />
          <Badge
            icon={require('@asset/icons/weight.png')}
            text={data.weight || `0 Kg`}
          />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.textHeading}>Info Peliharaan</Text>
        <View>
          <InfoItem
            label="Tanggal Lahir"
            text={moment(data.date_of_birth, 'DD-MM-YYYY').format(
              'DD MMMM YYYY',
            )}
          />
          <InfoItem label="Warna Badan" text={data.body_color} />
          <InfoItem label="Warna Mata" text={data.eye_color} />
          <InfoItem label="Microschip ID" text={data.microchip_id || ''} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.textHeading}>Riwayat Kesehatan</Text>
        <View>
          <PetHistoryItem
            title="Suntik Vaksi"
            text="Minggu, 20 April 2016 - 08:00 AM"
            image={require('@asset/icons/sex/male.png')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textDetail: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_14,
    color: Colors.GREY,
  },
  textHeading: {
    ...Typography.heading('h4'),
    marginBottom: 16,
  },
  section: {
    padding: 16,
    backgroundColor: Colors.WHITE,
    marginBottom: 10,
  },
  label: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: 11,
    color: Colors.GREY,
    paddingLeft: 1,
  },
  infoValue: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: 14,
    color: Colors.BLACK,
  },
});

export default PetDetail;
