import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';

import AppConfig from './src/resources/appconfig';
import AsyncStore from './src/library/asyncStore';
import Colors from './src/resources/color';
import Actions from './src/resources/actions';

import configureStore from './src/reducer/configStore/index.js';

const store = configureStore(); //get store

// console.disableYellowBox = true; //disable warning

callbackFunction = () => {
  try {
    AsyncStorage.getItem(AsyncStore.Constants.USER_TOKEN)
      .then((userToken) => {
        if (userToken) {
          Actions.startMainScreen();
        } else {
          Actions.startLoginScreen();
        }
      });
  } catch (e) {
    console.log(e);
  }
}

registerScreens(store, Provider,callbackFunction); // this is where you register all of your app's screens


