import AppConfig from '../appconfig';

/**
* open component with respect to value
* @param {*} value name of screen
* @param {*} props props of screen
* @param {*} ref reference
*/
openComponentProps = (ref, value, props) => {
    ref.props.navigator.push({
        title: value,
        screen: value,
        passProps: { propsData: props },
        navigatorStyle: AppConfig.NavbarConfig
    })
}

/**
* open component with respect to value
* @param {*} value name of screen
* @param {*} props props of screen
* @param {*} ref reference
*/
openModalProps = (ref, value, props) => {
    ref.props.navigator.showModal({
        title: value,
        screen: value,
        passProps: { propsData: props },
        navigatorStyle: AppConfig.NavbarConfig
    })
}

/**
 * toggle drawer
 * @param {*} ref reference
 */
startToggleDrawer = (ref) => {
    ref.props.navigator.toggleDrawer({
        side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
        animated: true, // does the toggle have transition animation or does it happen immediately (optional)
        to: 'open', // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
    });
}


module.exports = {
    openComponentProps: openComponentProps,
    openModalProps: openModalProps,
    startToggleDrawer: startToggleDrawer
}