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
      reference: this.props.reference,
      isChildItemExist: (this.props.item.children_data != null && this.props.item.children_data.length > 0),
      isVisibleChildList: false
    }
  }

  render() {
    let { item, isChildItemExist, isVisibleChildList, reference } = this.state;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            let flag = !isVisibleChildList;

            !isChildItemExist ? Actions.openModalProps(reference, "ProductList", item.name) :
              this.setState({ isVisibleChildList: flag })
          }}
          style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', elevation: 2, marginVertical: 2, marginHorizontal: 12, borderRadius: 2 }}>
          <Text style={{ fontSize: 16, padding: 12, color: 'black' }}>
            {item.name}
          </Text>
          {(isChildItemExist) ?
            <Image style={{ width: 16, height: 16, padding: 8, alignSelf: 'center', marginHorizontal: 12 }} source={!isVisibleChildList ? downArrow : upArrow} /> : <View />}
        </TouchableOpacity>
        {
          (isVisibleChildList && isChildItemExist) ?
            item.children_data.map((item, index) => {
              return (
                <TouchableOpacity key={'item' + index}
                onPress={()=>Actions.openModalProps(reference, "ProductList", item.name) }
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


