import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

import Actions from '../../resources/actions';
import Color from '../../resources/color';

import upArrow from '../../resources/icons/up-arrow.png';
import downArrow from '../../resources/icons/down-arrow.png';

export default class ProductListTile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      reference: this.props.reference,
    }
  }

  render() {
    let { item, reference } = this.state;
    return (
      <View>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', elevation: 2, marginVertical: 2, marginHorizontal: 12, borderRadius: 2 }}>
          <Text style={{ fontSize: 16, padding: 12, color: 'black' }}>
            {item.name}
          </Text>
        </TouchableOpacity>
       
      </View>
    );
  }
}


