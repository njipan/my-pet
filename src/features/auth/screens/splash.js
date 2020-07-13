import React, {useState, useEffect} from 'react';
import {NavigationActions, StackActions} from 'react-navigation';

import {StyleSheet, Image, View, Easing, Animated} from 'react-native';
import {Colors} from './../../../styles';
import LogoImagePrimary from './../../../assets/logos/LogoPrimary_2x.png';
import LogoTextLight from './../../../assets/logos/LogoTextLight_2x.png';
import Loading from './../../../assets/icons/loading.png';
import {AuthService} from '@service';
import {Screens, Navigators, UserType} from '@constant';

const SplashScreen = ({navigation}) => {
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));

  const checkToken = async () => {
    let screen = Navigators.AUTH_NAVIGATOR;
    try {
      const token = await AuthService.getToken();
      if (!token) throw Error(null);
      await AuthService.check(token);
      const type = await AuthService.getType();
      if (type == UserType.CUSTOMER) screen = Navigators.CUSTOMER_NAVIGATOR;
      else if (type == UserType.MERCHANT)
        screen = Navigators.MERCHANT_NAVIGATOR;

      navigation.dispatch(
        StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({routeName: screen})],
        }),
      );
    } catch (err) {
      navigation.navigate(Screens.LOGIN_SCREEN);
    }
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    checkToken();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={LogoImagePrimary} style={styles.logo} />
        <Image source={LogoTextLight} style={styles.text} />
        <Animated.Image
          style={{height: 24, width: 24, transform: [{rotate: spin}]}}
          source={Loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SPLASH_SCREEN,
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'stretch',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: 120,
    height: 40,
    resizeMode: 'stretch',
    marginBottom: 40,
  },
});

export default SplashScreen;
