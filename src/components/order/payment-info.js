import React from 'react';
import {Text, View} from 'react-native';

import Dash from 'react-native-dash';
import {FieldValue} from './treatment';
import {Box, Colors} from '@style';

const PaymentInfo = (props) => {
  const {
    method = null,
    data = [],
    total = null,
    done = true,
    serviceAliases = {},
  } = props;
  console.log(data);
  return (
    <View>
      <View>
        <Text style={{...Box.LABEL_TITLE, fontSize: 14, marginBottom: 10}}>
          Metode Pembayaran
        </Text>
        <Text style={{...Box.LABEL_VALUE, marginBottom: 20}}>{method}</Text>
      </View>
      <View>
        <Text style={{...Box.LABEL_TITLE, fontSize: 14, marginBottom: 10}}>
          Detail Pembayaran
        </Text>
        {Array.isArray(data) &&
          data.map((service) => (
            <FieldValue
              title={service[serviceAliases.name] || service.name}
              text={service[serviceAliases.price] || service.price}
            />
          ))}
      </View>
      <Dash
        style={{width: '100%', marginBottom: 10, marginTop: 10}}
        dashColor={Colors.BLACK10}
        dashThickness={1}
        dashGap={4}
      />
      <FieldValue title="Total" text={total} bold={true} />
      {done ? (
        <View>
          <Dash
            style={{width: '100%', marginBottom: 10, marginTop: 10}}
            dashColor={Colors.BLACK10}
            dashThickness={1}
            dashGap={4}
          />
          <FieldValue title="Pembayaran" text={method} bold={true} />
        </View>
      ) : null}
    </View>
  );
};

export default PaymentInfo;
