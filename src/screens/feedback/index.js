import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';

export default class Feedback extends Component {

  constructor(props) {
    super(props);

    // this.props.navigator.setTitle({
    //   title: 'Feedback'
    // });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Feedback</Text>
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
    marginVertical: 10
  }
});
