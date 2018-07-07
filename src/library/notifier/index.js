import React, { Component } from 'react';
import { SafeAreaView , Text} from 'react-native';

import Colors from '../../resources/color';



export default class Notifier extends Component {
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: '#f9f9f9', elevation: 2, alignItems: 'center' }}>
                <Text style={{ margin: 24, fontSize: 18, color: Colors.AccentColor }}>{this.props.propsData}</Text>
            </SafeAreaView>
        );
    }
}
