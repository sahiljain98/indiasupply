import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';

import Actions from '../../resources/actions';
import AsyncStore from '../../library/asyncStore';

export default class More extends Component {

  constructor(props) {
    super(props);

    //initialize navigator event
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.resetBackToLogin()}>
          <Text style={styles.header}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  resetBackToLogin = () => {
    try {
      //remove item from asyncstore
      AsyncStorage.removeItem(AsyncStore.Constants.USER_TOKEN);
      AsyncStorage.removeItem(AsyncStore.Constants.SESSION_ID);
      AsyncStorage.removeItem(AsyncStore.Constants.CUSTOMER_ID);

      //open login screen
      Actions.startLoginScreen();
    } catch (e) {
      console.log(e);
    }

  }


  /**
 * handling navigator event
 * @param {*} event event name
 */
  onNavigatorEvent = (event) => {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'menu') {
        Actions.startToggleDrawer(this);
      }
      else if (event.id == 'Cart') {
        Actions.openModalProps(this, 'Cart', null);

      }
      else if (event.id == 'Search') {
        Actions.openModalProps(this, 'Search', null);
      }
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  header: {
    fontSize: 20,
    marginVertical: 10
  }
});
