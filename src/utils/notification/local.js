import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token) {
    console.log('LOCAL TOKEN:', token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },

  popInitialNotification: true,
  requestPermissions: true,
});

export const LocalNotification = (option) => {
  PushNotification.localNotification({
    autoCancel: option.autoCancel,
    bigText: option.bigText,
    subText: option.subText,
    title: option.title,
    message: option.message,
    vibrate: option.vibrate,
    vibration: option.vibration,
    playSound: option.playSound,
    soundName: option.soundName,
    actions: option.actions,
  });
};
