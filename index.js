/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import CustomStyleButton from './components/CustomStyleButton';

import LoginScreen from './components/LoginScreen'
import SignupScreen from './components/SignupScreen'


AppRegistry.registerComponent(appName, () => App);
