import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';


export default class Drawer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View name="header" style={{backgroundColor:'white',flex:1}}>
                <Text>hey</Text>
            </View>
        );
    }




}
