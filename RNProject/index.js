/**
 * @format
 */
import { AppRegistry, Platform } from 'react-native';
import App from '@/App';
import { name as appName } from './app.json';
import './src/i18n'

if (Platform.OS !== 'web') {

}
AppRegistry.registerComponent(appName, () => App);
