import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

import Actions from '../../resources/actions';
import Color from '../../resources/color';

import upArrow from '../../resources/icons/up-arrow.png';
import downArrow from '../../resources/icons/down-arrow.png';

export default class CategoryTile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item
    }
  }
  render() {
    let { item } = this.state;
    return (
      <TouchableOpacity 
        style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Color.HighlightPrimaryColor, marginVertical: 2, marginHorizontal: 12, borderRadius: 2 }}>
        <Text style={{ fontSize: 16, padding: 12, color: 'black' }}>
          {item.name}
        </Text>
        <Image style={{ width: 16, height: 16, padding: 8, alignSelf: 'center', marginHorizontal: 12 }} source={downArrow} />
      </TouchableOpacity>
    );
  }
}


