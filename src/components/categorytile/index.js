import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, FlatList } from 'react-native';

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
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            let flag = !isVisibleChildList;

            !isChildItemExist ? Actions.openModalProps(reference, "ProductList", { name: item.name, id: item.id }) :
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

            <FlatList
              style={{ flex: 1, minHeight: 120 }}
              data={item.children_data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => <View style={{ marginHorizontal: 8, marginVertical: 1 }}><CategoryTile reference={this.props.reference} key={"tile" + index} item={item} /></View>}
            />

            : <View />
        }
      </View>
    );
  }
}


