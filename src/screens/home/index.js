import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import AppConfig from '../../resources/appconfig';

export default class Home extends Component {

  constructor(props) {
    super(props);

    //initialize navigator event
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Home</Text>
      </View>
    );
  }

  /**
  * handling navigator event
  * @param {*} event event name
  */
  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'menu') {
        this.props.navigator.toggleDrawer({
          side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
          animated: true, // does the toggle have transition animation or does it happen immediately (optional)
          to: 'open', // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
        });
      }
      else if (event.id == 'Cart') {
        this.openModalProps('Cart', null);

      }
      else if (event.id == 'Search') {
        this.openModalProps('Search', null);
      }
    }
  }
  /**
 * open component with respect to value
 * @param {*} value name of screen
 * @param {*} props props of screen
 */
  openComponentProps = (value, props) => {
    this.props.navigator.push({
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
 */
openModalProps = (value, props) => {
  this.props.navigator.showModal({
    title: value,
    screen: value,
    passProps: { propsData: props },
    navigatorStyle: AppConfig.NavbarConfig
  })
}


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    marginVertical: 10
  }
});
