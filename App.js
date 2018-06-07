import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';

export default class App extends Component {

  constructor(props) {
    super(props);
   
    this.props.navigator.setTitle({
      title: 'About'
    });
  }
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.header}>hey</Text>  
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    marginVertical: 10,
    color: Strings.AppAccentColor,
    fontFamily: 'OpenSans',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  subheader: {
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 10,
    fontFamily: 'OpenSans',
    fontStyle: 'normal',
    textAlign: "center",
    lineHeight: 30,
  },
});
