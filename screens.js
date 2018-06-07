import { Navigation } from 'react-native-navigation';
import App from './App.js';
// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
    Navigation.registerComponent('App', () => App, store, Provider);
}