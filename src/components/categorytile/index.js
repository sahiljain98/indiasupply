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
      item: this.props.item,
      isChildItemExist: (this.props.item.children_data != null && this.props.item.children_data.length > 0),
      isVisibleChildList: false
    }
  }

  render() {
    let { item } = this.state;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            let flag = !this.state.isVisibleChildList;
            this.setState({ isVisibleChildList: flag })
          }}
          style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', elevation: 2, marginVertical: 2, marginHorizontal: 12, borderRadius: 2 }}>
          <Text style={{ fontSize: 16, padding: 12, color: 'black' }}>
            {item.name}
          </Text>
          {(this.state.isChildItemExist) ?
            <Image style={{ width: 16, height: 16, padding: 8, alignSelf: 'center', marginHorizontal: 12 }} source={!this.state.isVisibleChildList ? downArrow : upArrow} /> : <View />}
        </TouchableOpacity>
        {
          (this.state.isVisibleChildList && this.state.isChildItemExist) ?
            item.children_data.map((item, index) => {
              return (
                <TouchableOpacity key={'item' + index}
                  style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Color.HighlightPrimaryColor, marginVertical: 1, marginHorizontal: 12, borderRadius: 2 }}>
                  <Text style={{ fontSize: 14, padding: 12, color: 'black' }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>);
            })
            : <View />
        }
      </View>
    );
  }
}


