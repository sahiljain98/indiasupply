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

/**
 * toggle drawer
 * @param {*} ref reference
 */
endToggleDrawer = (ref) => {
    ref.props.navigator.toggleDrawer({
        side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
        animated: true, // does the toggle have transition animation or does it happen immediately (optional)
        to: 'closed' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
    });
}

/**
  * show notifier
  * @param {*} ref reference
  * @param {*} text display text 
  * @param {*} transitionTime time duration
  */
showNotifier = (ref, text, transitionTime) => {
    ref.props.navigator.showInAppNotification({
        screen: "Notifier", // unique ID registered with Navigation.registerScreen
        passProps: { propsData: text }, // simple serializable object that will pass as props to the in-app notification (optional)
        autoDismissTimerSec: transitionTime // auto dismiss notification in seconds
    });
}


module.exports = {
    openComponentProps: openComponentProps,
    openModalProps: openModalProps,
    startToggleDrawer: startToggleDrawer
}