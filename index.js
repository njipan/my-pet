/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import 'intl';
import 'intl/locale-data/jsonp/id';
import {name as appName} from './app.json';
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask(
  'ReactNativeFirebaseMessagingHeadlessTask',
  (payload) => console.log(payload),
);
