import { Navigation } from 'react-native-navigation';

import Home from './src/screens/home';
import Feedback from './src/screens/feedback';
import Account from './src/screens/account';
import Favourite from './src/screens/favourite';
import More from './src/screens/more';
import Cart from './src/screens/cart';
import Search from './src/screens/search';

import Drawer from './src/screens/drawer';


// register all screens of the app (including internal ones)
export function registerScreens() {

    Navigation.registerComponent('Home', () => Home);
    Navigation.registerComponent('Feedback', () => Feedback);
    Navigation.registerComponent('Account', () => Account);
    Navigation.registerComponent('Favourite', () => Favourite);
    Navigation.registerComponent('More', () => More);
    Navigation.registerComponent('Cart', () => Cart);
    Navigation.registerComponent('Search', () => Search);

    Navigation.registerComponent('Drawer', () => Drawer);

}