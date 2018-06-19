import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';

import Actions from '../../resources/actions';
import AsyncStore from '../../library/asyncStore'

export default class Feedback extends Component {

  constructor(props) {
    super(props);
   
    //initialize navigator event
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Feedback</Text>
      </View>
    );
  }

  componentDidMount(){
    AsyncStorage.getItem(AsyncStore.Constants.SESSION_ID).then((value)=>{
      console.log('session id from async store is',value); 
    }).catch((E)=>{
      console.log(E);
    })
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
  },
  header: {
    fontSize: 20,
    marginVertical: 10
  }
});
