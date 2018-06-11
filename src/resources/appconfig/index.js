import { Platform } from 'react-native';

import Colors from '../color';

import DrawerIcon from '../icons/menu.png';
import SearchIcon from '../icons/search.png';
import SearchBigIcon from '../icons/search_big.png';
import CartIcon from '../icons/cart.png';
import CartBigIcon from '../icons/cart_big.png';

const AppConfig = {
    //app name
    AppName: 'IndiaSupply',

    //navigation configuration
    NavbarConfig: {
        navBarTextFontSize: 20,
        navBarTitleTextCentered: true,
        navBarHeight: 48,
        navBarBackgroundColor: Colors.PrimaryColor,
        navBarButtonColor: Colors.PrimaryTextColor,
        navBarTextColor: Colors.PrimaryTextColor,
        //navBarTextFontFamily: 'notoserif',
        topBarElevationShadowEnabled: false
    },

    //bottom tab configuration
    TabbarConfig: {
        tabBarBackgroundColor: Colors.PrimaryColor,
        tabBarButtonColor: '#bababa',
        tabBarHideShadow: true,
        tabBarSelectedButtonColor: Colors.AccentColor,
        tabBarTranslucent: false,
        // tabFontSize: 10,
        // selectedTabFontSize: 12,
    },

    //toolbar buttons
    NavbarButtonConfig: {
        leftButtons: [
            {
                id: 'menu',
                icon: DrawerIcon,
                title: 'Menu'
            }
        ],
        rightButtons: [
            {
                id: 'Cart',
                icon: (Platform.OS == 'android') ? CartBigIcon : CartIcon,
                title: 'Cart'
            },
            {
                id: 'Search',
                icon: (Platform.OS == 'android') ? SearchBigIcon : SearchIcon,
                title: 'Search'
            }
        ]
    }
};

export default AppConfig;

