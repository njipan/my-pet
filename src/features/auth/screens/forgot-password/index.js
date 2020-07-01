import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View, Text, Button} from 'react-native';
import {Colors, Mixins, Typography} from '@style';
import {Texts} from '@constant';
import {Heading} from '@component';
import ForgotPasswordForm from './../../components/form/forgot-password';

const ForgotPasswordScreen = ({navigation, ...props}) => {
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        flex: 1,
        flexDirection: 'column',
        padding: 20,
      }}>
      <View
        style={{
          ...Mixins.padding(10, 0, 20, 0),
          width: '100%',
          alignItems: 'flex-start',
        }}>
        <Heading type="h2" text={Texts.FORGOT_PASSWORD_TITLE} />
        <View style={{marginTop: 10}}>
          <Text style={Typography.FONT_REGULAR}>
            {Texts.FORGOT_PASSWORD_DESCRIPTION}
          </Text>
        </View>
      </View>
      <View
        style={{
          ...Mixins.padding(10, 0, 20, 0),
        }}>
        <ForgotPasswordForm
          onSubmit={() => {
            alert('FORGOT PASSWORD CLICKED');
          }}
          onEmailChange={(text) => alert(text)}
        />
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
