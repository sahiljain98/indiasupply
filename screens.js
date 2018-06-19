import { Navigation } from 'react-native-navigation';

import Home from './src/screens/home';
import Feedback from './src/screens/feedback';
import Account from './src/screens/account';
import Favourite from './src/screens/favourite';
import More from './src/screens/more';

import Cart from './src/screens/cart';
import Search from './src/screens/search';
import Drawer from './src/screens/drawer';

import ProductList from './src/screens/productlist';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {

    Navigation.registerComponent('Home', () => Home, store, Provider);
    Navigation.registerComponent('Feedback', () => Feedback, store, Provider);
    Navigation.registerComponent('Account', () => Account, store, Provider);
    Navigation.registerComponent('Favourite', () => Favourite, store, Provider);
    Navigation.registerComponent('More', () => More, store, Provider);

    Navigation.registerComponent('Cart', () => Cart, store, Provider);
    Navigation.registerComponent('Search', () => Search, store, Provider);
    Navigation.registerComponent('Drawer', () => Drawer, store, Provider);

    Navigation.registerComponent('ProductList', () => ProductList, store, Provider);
}