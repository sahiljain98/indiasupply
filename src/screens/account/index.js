import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';

export default class Account extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>account</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'red'
  },
  header: {
    fontSize: 20,
    marginVertical: 10
  }
});
