import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, TouchableHighlight } from 'react-native';

import Actions from '../../resources/actions';
import Color from '../../resources/color';
import DataRetriver from '../../library/dataRetriver';
import Network from '../../library/network';
import Constants from '../../resources/constants';

import NotFoundIcon from '../../resources/icons/notfound_image.png';
import HeartGreyIcon from '../../resources/icons/list_add.png';
import HeartRedIcon from '../../resources/icons/list_add_filled.png';

export default class ProductListTile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            reference: this.props.reference,
            isWishlisted: false
        }
    }

    render() {
        let { item, reference, isWishlisted } = this.state;
        return (
            <TouchableHighlight
                underlayColor="transparent"

                onPress={() => Actions.openComponentProps(reference, 'ProductDetail', { sku: item.sku })}>
                <View style={{ flex: 1, backgroundColor: 'white', elevation: 1, marginVertical: 4, borderRadius: 2 }}>
                    <View
                        style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={{ margin: 16 }}>
                            <Image source={{ uri: Network.imageUrl + DataRetriver.getDataByParameter(item.custom_attributes, 'attribute_code', Constants.PRODUCT_ITEM_ATTRIBUTE_CODE_SMALL_IMAGE) }} style={{ height: 56, width: 56, resizeMode: 'cover', borderRadius: 2 }} />
                        </View>
                        <View style={{ flex: 1, marginTop: 8 }}>
                            <Text style={{ fontSize: 16, paddingHorizontal: 8, paddingVertical: 4, color: 'black' }}>
                                {item.name}
                            </Text>
                            <Text style={{ fontSize: 14, paddingHorizontal: 8, color: 'grey' }}>
                                {DataRetriver.getDataByParameter(item.custom_attributes, 'attribute_code', Constants.PRODUCT_ITEM_ATTRIBUTE_CODE_DENTAL_SIZE)}
                            </Text>
                            <View style={{ flexDirection: 'row', paddingVertical: 4, paddingHorizontal: 8, alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'grey', textDecorationLine: 'line-through' }}>{'₹ ' + item.price}</Text>
                                <Text style={{ fontSize: 16, color: Color.AccentColor, paddingHorizontal: 8 }}>{'₹ ' + DataRetriver.getDataByParameter(item.custom_attributes, 'attribute_code', Constants.PRODUCT_ITEM_ATTRIBUTE_CODE_SPECIAL_PRICE)}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => {
                            let flag = !isWishlisted;
                            this.setState({ isWishlisted: flag })
                        }}>
                            <Image source={isWishlisted ? HeartRedIcon : HeartGreyIcon} style={{ width: 18, height: 18, marginVertical: 12, marginEnd: 12, marginStart: 4 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity>
                            <Text
                                style={{ backgroundColor: Color.AccentColor, color: 'white', fontSize: 14, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 2, marginBottom: 12, marginHorizontal: 12 }}>
                                Add to Cart
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}



