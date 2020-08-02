import React from 'react';
import {Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';

import Navigator from './navigations';

const App = () => {
  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };

  const getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('_fcmToken');
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('_fcmToken', fcmToken);
      }
    }
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      getToken();
    } catch (error) {}
  };

  const createNotificationListeners = async () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Background State : ', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        console.log('Quit State : ', remoteMessage);
      });

    messaging().setBackgroundMessageHandler((payload) => {
      // const {messageId=null, }
      console.log(payload);
    });

    messaging().onTokenRefresh(async (token) => {
      await AsyncStorage.setItem('_fcmToken', token);
    });
  };
  React.useEffect(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('REMOTE TOKEN:', token);
      },
      onNotification: function (notification) {
        const {title = null, data = {}, message = null} = notification;
        console.log('REMOTE NOTIFICATION ==>', notification);
      },
      senderID: '127523433903',
      popInitialNotification: true,
      requestPermissions: true,
    });

    checkPermission();
    createNotificationListeners();
  }, []);

  return <Navigator />;
};

export default App;
