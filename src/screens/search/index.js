import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import AppConfig from '../../resources/appconfig';

export default class Search extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1,
        alignItems: 'center',backgroundColor:'white'}}>
        <TouchableOpacity onPress={()=>this.openComponentProps('Account',null)}>

        <Text style={styles.header}>favorate</Text>
      </TouchableOpacity>
      </View>
    );
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

}

const styles = StyleSheet.create({
  container: {
   
  },
  header: {
    fontSize: 20,
    marginVertical: 10
  }
});
