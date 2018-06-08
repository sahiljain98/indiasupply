import { Navigation } from 'react-native-navigation';
import App from './App.js';
import AboutUs from './src/components/aboutUs';

// register all screens of the app (including internal ones)
export function registerScreens() {
    Navigation.registerComponent('App', () => App);
    Navigation.registerComponent('AboutUs', () => AboutUs);

}