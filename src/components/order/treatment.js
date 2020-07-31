import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {Box, Colors, Typography} from '@style';

import {toNumberFormat} from '@util/transformer';

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

const OrderTreatment = ({navigation, ...props}) => {
  const {
    onEditPress = () => {},
    onDeletePress = () => {},
    data = [],
    action = true,
    petAliases = {},
    serviceAliases = {},
    serviceTransform = {},
    petIcon = null,
    onPetIconPress = () => {},
  } = props;

  return (
    <View>
      {data.map((pet, petIdx) => (
        <View style={{marginBottom: petIdx == data.length - 1 ? 0 : 16}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                fontFamily: Typography.FONT_FAMILY_REGULAR,
                fontWeight: 'bold',
                fontSize: 16,
                color: Colors.REGULAR,
              }}>
              {pet[petAliases.name] || pet.name}
            </Text>

            {React.isValidElement(petIcon) ? (
              <TouchableOpacity onPress={() => onPetIconPress(pet)}>
                {petIcon}
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>

          {(pet[petAliases.services] || pet.services).map((service) => (
            <View style={{...styles.treatmentItemContainer, marginLeft: 4}}>
              <FieldValue
                title={service[serviceAliases.name] || service.name}
                text={`${service[serviceAliases.qty] || service.qty || 1}x`}
                bold
              />
              <Text
                style={{
                  fontFamily: Typography.FONT_FAMILY_MEDIUM,
                  fontSize: 14,
                  color: Colors.LIGHT_GREY,
                  marginTop: -4,
                }}>
                {service[serviceAliases.description] || service.description}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 4}}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontFamily: Typography.FONT_FAMILY_MEDIUM,
                      fontSize: 14,
                      color: Colors.REGULAR,
                    }}>
                    {toNumberFormat(
                      service[serviceAliases.price] || service.price,
                    )}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{marginRight: 20}}
                    onPress={() => onEditPress(pet, service)}>
                    <Text
                      style={{
                        color: action ? Colors.BLUE : Colors.LIGHT_GREY,
                      }}>
                      Ubah
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onDeletePress(pet, service)}>
                    <Text
                      style={{
                        color: action ? Colors.DANGER : Colors.LIGHT_GREY,
                      }}>
                      Hapus
                    </Text>
                  </TouchableOpacity>
                </View>
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
