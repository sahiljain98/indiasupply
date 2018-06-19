import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';

import AppConfig from './src/resources/appconfig';
import Colors from './src/resources/color';

import HomeIcon from './src/resources/icons/home.png';
import FeedbackIcon from './src/resources/icons/feedback.png';
import AccountIcon from './src/resources/icons/account.png';
import FavouriteIcon from './src/resources/icons/favorite.png';
import MoreIcon from './src/resources/icons/more.png';


import configureStore from './src/reducer/configStore/index.js';

const store = configureStore(); //get store

registerScreens(store, Provider); // this is where you register all of your app's screens

// console.disableYellowBox = true; //disable warning

Navigation.startTabBasedApp({
  tabs: [
    {
      // label:'Home',
      title: AppConfig.AppName,
      screen: 'Home',
      icon: HomeIcon,
      navigatorStyle: AppConfig.NavbarConfig,
      navigatorButtons: AppConfig.NavbarButtonConfig

    },
    {
      title: AppConfig.AppName,
      screen: 'Feedback', // unique ID registered with Navigation.registerScreen
      icon: FeedbackIcon, // local image asset for the tab icon unselected state (optional on iOS)
      navigatorStyle: AppConfig.NavbarConfig,
      navigatorButtons: AppConfig.NavbarButtonConfig

    },
    {
      // label:'Home',
      title: AppConfig.AppName,
      screen: 'Account',
      icon: AccountIcon,
      navigatorStyle: AppConfig.NavbarConfig,
      navigatorButtons: AppConfig.NavbarButtonConfig

    },
    {
      // label:'Home',
      title: AppConfig.AppName,
      screen: 'Favourite',
      icon: FavouriteIcon,
      navigatorStyle: AppConfig.NavbarConfig,
      navigatorButtons: AppConfig.NavbarButtonConfig

    },
    {
      // label:'Home',
      title: AppConfig.AppName,
      screen: 'More',
      icon: MoreIcon,
      navigatorStyle: AppConfig.NavbarConfig,
      navigatorButtons: AppConfig.NavbarButtonConfig

    }

  ],

  appStyle: AppConfig.TabbarConfig, //for andoid
  tabsStyle: AppConfig.TabbarConfig, //for ios

  drawer: { // optional, add this if you want a side menu drawer in your app
    left: { // optional, define if you want a drawer from the left
      screen: 'Drawer', // unique ID registered with Navigation.registerScreen
      passProps: {}, // simple serializable object that will pass as props to all top screens (optional),
      fixedWidth: 500, // a fixed width you want your left drawer to have (optional)
    }
  }
});