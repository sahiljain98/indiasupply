import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import AppConfig from '../../resources/appconfig';

import Actions from '../../resources/actions';

export default class Search extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1,
        alignItems: 'center',backgroundColor:'white'}}>
        <TouchableOpacity onPress={()=>Actions.openComponentProps(this,'Account',null)}>

        <Text style={styles.header}>favorate</Text>
      </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
   
  },
  header: {
    fontSize: 20,
    marginVertical: 10
  }
});
