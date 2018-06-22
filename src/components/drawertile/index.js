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
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => {
                        let flag = !isVisibleChildList;

                        !isChildItemExist ? Actions.openModalProps(reference, "ProductList", { name: item.name, id: item.id }) :
                            this.setState({ isVisibleChildList: flag })
                    }}
                    style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Color.PrimaryColor }}>
                    <Text style={{ flex: 1, fontSize: 14, padding: 14, color: 'black' }}>
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
                                    onPress={() => Actions.openModalProps(reference, "ProductList", { name: item.name, id: item.id })}
                                    style={{ flexDirection: 'row', backgroundColor: '#fbfbfb', justifyContent: 'space-between', marginVertical: 1, marginHorizontal: 4, borderRadius: 2 }}>
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


