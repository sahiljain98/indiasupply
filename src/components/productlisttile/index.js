import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, TouchableHighlight } from 'react-native';
import axios from 'axios';

import Actions from '../../resources/actions';
import Color from '../../resources/color';
import DataRetriver from '../../library/dataRetriver';
import Network from '../../library/network';
import Constants from '../../resources/constants';

import NotFoundIcon from '../../resources/icons/notfound_image.png';
import HeartGreyIcon from '../../resources/icons/list_add.png';
import HeartRedIcon from '../../resources/icons/list_add_filled.png';


import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ProductListTile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: this.props.service.sessionId,
            item: this.props.item,
            reference: this.props.reference,
            isWishlisted: false,
            isAddCartVisible: true
        }
    }

    render() {
        let { item, reference, isWishlisted, isAddCartVisible } = this.state;
        return (
            <TouchableHighlight
                underlayColor="transparent"

                onPress={() => Actions.openComponentProps(reference, 'ProductDetail', { sku: item.sku, itemName: item.name })}>
                <View style={{ flex: 1, backgroundColor: 'white', elevation: 1, marginVertical: 4, borderRadius: 2 }}>
                    <View
                        style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={{ margin: 16 }}>
                            <Image
                                ref={'ProductImageListItem' + item.id}
                                source={{ uri: Network.imageUrl + DataRetriver.getDataByParameter(item.custom_attributes, 'attribute_code', Constants.PRODUCT_ITEM_ATTRIBUTE_CODE_SMALL_IMAGE) }} style={{ height: 56, width: 56, resizeMode: 'cover', borderRadius: 2 }}
                                onError={(e) => this.refs['ProductImageListItem' + item.id].setNativeProps({ src: [{ uri: 'http://www.asuntospublicos.org/upload/2017/12/26/21-table-decoration-ideas-for-a-summer-garden-party-garden-table-setting-l-fa89616578453aaf.jpg' }] })} />
                        </View>
                        <View style={{ flex: 1, marginTop: 8 }}>
                            <Text style={{ fontSize: 16, paddingHorizontal: 8, paddingVertical: 4, color: 'black' }}>
                                {item.name}
                            </Text>
                            <Text style={{ fontSize: 14, paddingHorizontal: 8, color: 'grey' }}>
                                {DataRetriver.getDataByParameter(item.custom_attributes, 'attribute_code', Constants.PRODUCT_ITEM_ATTRIBUTE_CODE_DENTAL_SIZE)}
                            </Text>
                            {DataRetriver.getDataByParameter(item.custom_attributes, 'attribute_code', Constants.PRODUCT_ITEM_ATTRIBUTE_CODE_SPECIAL_PRICE) ? <View style={{ flexDirection: 'row', paddingVertical: 4, paddingHorizontal: 8, alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'grey', textDecorationLine: 'line-through' }}>{'₹ ' + item.price}</Text>
                                <Text style={{ fontSize: 16, color: Color.AccentColor, paddingHorizontal: 8 }}>{'₹ ' + DataRetriver.getDataByParameter(item.custom_attributes, 'attribute_code', Constants.PRODUCT_ITEM_ATTRIBUTE_CODE_SPECIAL_PRICE)}</Text>
                            </View> :
                                <View style={{ flexDirection: 'row', paddingVertical: 4, paddingHorizontal: 8, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, color: Color.AccentColor }}>{'₹ ' + item.price}</Text>
                                </View>}
                        </View>
                        <TouchableOpacity onPress={() => {
                            let flag = !isWishlisted;
                            this.setState({ isWishlisted: flag })
                        }}>
                            <Image source={isWishlisted ? HeartRedIcon : HeartGreyIcon} style={{ width: 18, height: 18, marginVertical: 12, marginEnd: 12, marginStart: 4 }} />
                        </TouchableOpacity>
                    </View>
                    {isAddCartVisible ?
                        <View style={{ alignItems: 'flex-end' }}>
                            <TouchableOpacity onPress={() => this.addProductToCart(item.sku, 1)}>
                                <Text
                                    style={{ backgroundColor: Color.AccentColor, color: 'white', fontSize: 14, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 2, marginBottom: 12, marginHorizontal: 12 }}>
                                    Add to Cart
                            </Text>
                            </TouchableOpacity>
                        </View> : <View style={{ marginBottom: 4 }} />}
                </View>
            </TouchableHighlight>
        );
    }

    /**
    * api Hit
    * get product to cart
    * @param {*} sku sku
    * @param {*} qty quantity
    */
    addProductToCart = (sku, qty) => {
        let { sessionId } = this.state;
        var config = {
            headers: { 'Authorization': "bearer " + sessionId }
        };
        var userParams = {
            cartItem: {
                sku: sku,
                qty: qty,
                quote_id: "1"
            }
        }
        axios.post(`${Network.url}carts/mine/items`, userParams, config)
            .then((response) => {
                if (response.data) {
                    console.log('add to cart : ', response);
                    this.setState({ isAddCartVisible: false })
                }
            }).catch((error) => {
                Actions.showNotifier(this.state.reference, 'Error in Adding item to cart : ' + error, 1);
            });
    }

}




function mapStateToProps(state, ownProps) {
    return {
        service: state.service
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListTile);
