import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';
import configureStore from './src/reducer/configStore';

const store = configureStore(); //get store

registerScreens(store, Provider); // this is where you register all of your app's screens

console.disableYellowBox = true; //disable warning

Navigation.startSingleScreenApp({
    screen: {
      screen: 'App'
    }
  });



