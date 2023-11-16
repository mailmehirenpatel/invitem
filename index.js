/**
 * @format
 */
// 3rd Party Imports
import 'react-native-reanimated';
import {AppRegistry} from 'react-native';

// Local Imports
import App from './src/App';
import {name as appName} from './app.json';

// Call App.js File
AppRegistry.registerComponent(appName, () => App);
