import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {Box, Colors, Typography} from '@style';

export const FieldValue = (props) => {
  const {title = null, text = null, bold = false, fontSize = 14} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
      }}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontFamily: bold
              ? Typography.FONT_FAMILY_REGULAR
              : Typography.FONT_FAMILY_MEDIUM,
            fontWeight: bold ? 'bold' : 'normal',
            fontSize,
          }}>
          {title}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: bold
            ? Typography.FONT_FAMILY_REGULAR
            : Typography.FONT_FAMILY_MEDIUM,
          fontWeight: bold ? 'bold' : 'normal',
          fontSize,
        }}>
        {text}
      </Text>
    </View>
  );
};

const TitleWithAction = (props) => {
  const {
    styleText = {},
    fontSize = 18,
    title = null,
    actionIcon = null,
    onPress = () => {},
  } = props;

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{justifyContent: 'center', flex: 1}}>
        <Text
          style={{
            ...Box.LABEL_TITLE,
            color: Colors.REGULAR,
            fontSize,
            ...styleText,
          }}>
          {title}
        </Text>
      </View>
      {actionIcon ? (
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity onPress={onPress}>{actionIcon}</TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const OrderTreatment = ({navigation, ...props}) => {
  const {
    onEditPress = () => {},
    onDeletePress = () => {},
    data = [],
    action = true,
  } = props;

  return (
    <View>
      {[0, 0].map((pet, petIdx) => (
        <View style={{marginBottom: petIdx == [0, 0].length - 1 ? 0 : 16}}>
          <Text
            style={{
              textDecorationLine: 'underline',
              fontFamily: Typography.FONT_FAMILY_REGULAR,
              fontWeight: 'bold',
              fontSize: 16,
              color: Colors.REGULAR,
            }}>
            Peliharaan Dummy {petIdx + 1}
          </Text>

          {[0, 0].map((treatment) => (
            <View style={{...styles.treatmentItemContainer}}>
              <FieldValue title="Suntik Rabies" text="1x" bold />
              <Text
                style={{
                  fontFamily: Typography.FONT_FAMILY_MEDIUM,
                  fontSize: 14,
                  color: Colors.LIGHT_GREY,
                  marginTop: -4,
                }}>
                Note : Dummy Anjing dan Kucing
              </Text>
              <View style={{flexDirection: 'row', marginTop: 4}}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontFamily: Typography.FONT_FAMILY_MEDIUM,
                      fontSize: 14,
                      color: Colors.REGULAR,
                    }}>
                    Rp 400.000 - Dummy
                  </Text>
                </View>
                {action ? (
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{marginRight: 20}}
                      onPress={() => onEditPress(pet, treatment)}>
                      <Text style={{color: Colors.BLUE}}>Ubah</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => onDeletePress(pet, treatment)}>
                      <Text style={{color: Colors.DANGER}}>Hapus</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  treatmentItemContainer: {
    marginTop: 6,
    paddingBottom: 8,
    borderBottomWidth: 0.6,
    borderBottomColor: Colors.BLACK10,
  },
});

export default OrderTreatment;