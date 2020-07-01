import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View, Easing, Animated} from 'react-native';
import {Colors} from './../../../styles';
import LogoImagePrimary from './../../../assets/logos/LogoPrimary_2x.png';
import LogoTextLight from './../../../assets/logos/LogoTextLight_2x.png';
import Loading from './../../../assets/icons/loading.png';

const SplashScreen = ({navigation}) => {
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
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
