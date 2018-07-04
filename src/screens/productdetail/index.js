import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

import Actions from '../../resources/actions';
import Network from '../../library/network';
import AppConfig from '../../resources/appconfig';
import Colors from '../../resources/color';
import Constants from '../../resources/constants';
import DataRetriver from '../../library/dataRetriver';

import NotFoundIcon from '../../resources/icons/notfound_image.png';

import upArrow from '../../resources/icons/up-arrow.png';
import downArrow from '../../resources/icons/down-arrow.png';

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sessionId: this.props.service.sessionId,
            productId: this.props.propsData.sku,
            defaultText: 'Loading...',
            item: null,
            layoutWidth: null,
            count: 1,
            isDetailsVisible: false,
            isMoreInformation: false,
            isReview: false
        }


        this.props.navigator.setTitle({
            title: ""
        });

        this.props.navigator.setButtons({
            rightButtons: [
                {
                    id: 'Cart',
                    icon: AppConfig.CartIcon,
                    title: 'Cart'
                },
                {
                    id: 'Search',
                    icon: AppConfig.SearchIcon,
                    title: 'Search'
                }
            ]
        });



        //initialize navigator event
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    render() {
        let { item, defaultText } = this.state;
        return (
            item ?
                <View style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}
                    onLayout={(event) => { this.setState({ layoutWidth: event.nativeEvent.layout.width }) }}>

                    {/* layout content */}
                    <ScrollView style={{ flex: 1 }}>

                        {/* image header */}
                        <TouchableOpacity
                            onPress={() => {
                                let list = [];
                                list.push(Network.imageUrl + DataRetriver.getDataByParameter(item.custom_attributes, 'attribute_code', Constants.PRODUCT_ITEM_ATTRIBUTE_CODE_IMAGE))
                                Actions.openComponentProps(this, 'ProductPreviewer', list)
                            }}
                            style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                ref={'ImageDetailPic'}
                                source={{ uri: Network.imageUrl + DataRetriver.getDataByParameter(item.custom_attributes, 'attribute_code', Constants.PRODUCT_ITEM_ATTRIBUTE_CODE_IMAGE) }}
                                style={{ width: '100%', height: this.state.layoutWidth * 0.5625, resizeMode: 'cover' }}
                                onError={(e) => this.refs['ImageDetailPic'].setNativeProps({ src: [{ uri: 'http://www.asuntospublicos.org/upload/2017/12/26/21-table-decoration-ideas-for-a-summer-garden-party-garden-table-setting-l-fa89616578453aaf.jpg' }] })} />
                        </TouchableOpacity>
                        {/* product name */}
                        <Text style={{ fontSize: 18, color: 'black', padding: 16, fontWeight: 'bold' }}>{item.name}</Text>

                        {this.getCountView()}

                        <Text style={{ fontSize: 16, color: 'black', paddingHorizontal: 16, paddingVertical: 8 }}>{DataRetriver.getDataByParameter(item.custom_attributes, 'attribute_code', Constants.PRODUCT_ITEM_ATTRIBUTE_CODE_SHORT_DESCRIPTION)}</Text>

                        <Text style={{ fontSize: 16, color: 'black', paddingHorizontal: 16, paddingVertical: 8 }}>{DataRetriver.getDataByParameter(item.custom_attributes, 'attribute_code', Constants.PRODUCT_ITEM_ATTRIBUTE_CODE_DENTAL_SIZE)}</Text>

                        {DataRetriver.getDataByParameter(item.custom_attributes, 'attribute_code', Constants.PRODUCT_ITEM_ATTRIBUTE_CODE_SPECIAL_PRICE) == null ?
                            <View style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, color: 'black', paddingHorizontal: 16 }}>Price</Text>
                                <Text style={{ fontSize: 16, color: Colors.AccentColor }}>{'₹ ' + item.price}</Text>
                            </View> : <View style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, color: 'black', paddingHorizontal: 16 }}>Price</Text>
                                <Text style={{ fontSize: 16, color: 'grey', textDecorationLine: 'line-through' }}>{'₹ ' + item.price}</Text>
                                <Text style={{ fontSize: 18, color: Colors.AccentColor, paddingHorizontal: 16 }}>{'₹ ' + DataRetriver.getDataByParameter(item.custom_attributes, 'attribute_code', Constants.PRODUCT_ITEM_ATTRIBUTE_CODE_SPECIAL_PRICE)}</Text>
                            </View>}

                        <Text style={{ fontSize: 16, color: 'grey', paddingHorizontal: 16, paddingVertical: 8 }}>{'Buy two for ' + item.price * 2}</Text>

                        <Text style={{ fontSize: 16, color: 'grey', paddingHorizontal: 16, paddingVertical: 8 }}>{'Buy five for ' + item.price * 5}</Text>

                        {/* show details */}
                        {this.getDetailView(item)}

                    </ScrollView>

                    {/* for bottom buttons */}
                    {this.getBottomButtons(item)}
                </View>
                : <View
                    onLayout={(event) => { this.setState({ layoutWidth: event.nativeEvent.layout.width }) }}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.PrimaryColor }}>
                    <Text>{defaultText}</Text>
                </View>
        );
    }


    componentDidMount() {
        this.getProductDetailById(this.state.productId)
    }



    /**
     * get details view
     */
    getReviewView = () => {
        return (<View style={{ marginHorizontal: 16, marginVertical: 8 }}>
            <TouchableOpacity
                onPress={() => {
                    let flag = !this.state.isReview;
                    this.setState({ isReview: flag })
                }}
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.HighlightSecondaryColor }}>
                <Text style={{ flex: 1, fontSize: 16, padding: 16, color: 'black' }}>
                    Review
                </Text>
                <Image
                    style={{ width: 16, height: 16, padding: 8, alignSelf: 'center', marginHorizontal: 12 }}
                    source={this.state.isReview ? upArrow : downArrow} />
            </TouchableOpacity>
            {this.state.isReview ? <Text style={{ flex: 1, fontSize: 16, padding: 8, color: 'black', backgroundColor: '#f5f5f5' }}>dskjflkdsf </Text>
                : <View />}
        </View>);
    }

    /**
     * get details view
     */
    getMoreInformationView = () => {
        return (<View style={{ marginHorizontal: 16, marginVertical: 8 }}>
            <TouchableOpacity
                onPress={() => {
                    let flag = !this.state.isMoreInformation;
                    this.setState({ isMoreInformation: flag })
                }}
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.HighlightSecondaryColor }}>
                <Text style={{ flex: 1, fontSize: 16, padding: 16, color: 'black' }}>
                    More Information
                </Text>
                <Image
                    style={{ width: 16, height: 16, padding: 8, alignSelf: 'center', marginHorizontal: 12 }}
                    source={this.state.isMoreInformation ? upArrow : downArrow} />
            </TouchableOpacity>
            {this.state.isMoreInformation ? <Text style={{ flex: 1, fontSize: 16, padding: 8, color: 'black', backgroundColor: '#f5f5f5' }}>dskjflkdsf </Text>
                : <View />}
        </View>);
    }

    /**
     * get details view
     * @param {*} item data item
     */
    getDetailView = (item) => {
        return (<View style={{ marginHorizontal: 16, marginVertical: 8 }}>
            <TouchableOpacity
                onPress={() => {
                    let flag = !this.state.isDetailsVisible;
                    this.setState({ isDetailsVisible: flag })
                }}
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.HighlightSecondaryColor }}>
                <Text style={{ flex: 1, fontSize: 16, padding: 16, color: 'black' }}>
                    Details
                </Text>
                <Image
                    style={{ width: 16, height: 16, padding: 8, alignSelf: 'center', marginHorizontal: 12 }}
                    source={this.state.isDetailsVisible ? upArrow : downArrow} />
            </TouchableOpacity>
            {this.state.isDetailsVisible ? <Text style={{
                flex: 1, fontSize: 16, paddingVertical: 8, paddingHorizontal: 16, color: 'black', backgroundColor: '#f5f5f5'
            }}>{DataRetriver.getDataByParameter(item.custom_attributes, 'attribute_code', Constants.PRODUCT_ITEM_ATTRIBUTE_CODE_DESCRIPTION)}</Text>
                : <View />}
        </View>);
    }

    /**
     * get count view
     */
    getCountView = () => {
        let { count } = this.state;
        return (<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, paddingHorizontal: 16, color: 'black' }}>Bspc</Text>
            <View style={{ flexDirection: 'row', marginEnd: 16 }}>
                <TouchableOpacity onPress={() => {
                    let val = this.state.count + 1;
                    this.setState({ count: val })
                }}>
                    <Text style={{ paddingHorizontal: 12, paddingVertical: 8, borderColor: 'grey', borderWidth: 1 }}>+</Text>
                </TouchableOpacity>
                <Text style={{ paddingHorizontal: 12, paddingVertical: 8, borderColor: 'grey', borderWidth: 1 }}>{count}</Text>
                <TouchableOpacity
                    onPress={() => {
                        if (this.state.count > 0) {
                            let val = this.state.count - 1;
                            this.setState({ count: val });
                        }
                    }}>
                    <Text style={{ paddingHorizontal: 12, paddingVertical: 8, borderColor: 'grey', borderWidth: 1 }}>-</Text>
                </TouchableOpacity>
            </View>
        </View>);
    }
    /**
     * get bottom buttons
     * @param {*} item item
     */
    getBottomButtons = (item) => {
        return (<View style={{ flexDirection: 'row', elevation: 2 }}>
            <TouchableOpacity
                onPress={() => Actions.openComponentProps(this, 'Wishlist', null)}
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 16, backgroundColor: Colors.AccentColor, elevation: 2, borderRadius: 2, marginRight: 1, }}>
                <Text style={{ textAlign: 'center', fontSize: 16, marginHorizontal: 16, color: 'white' }}>WISHLIST</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.addProductToCart(item.sku, this.state.count)}
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 16, backgroundColor: Colors.AccentColor, elevation: 2, borderRadius: 2, marginLeft: 1 }}>
                <Text style={{ textAlign: 'center', fontSize: 16, marginHorizontal: 16, color: 'white' }}>ADD TO CART</Text>
            </TouchableOpacity>
        </View>);
    }

    /**
   * api Hit
   * get product detail by product id
   * @param {*} productId productId
   */
    getProductDetailById = (productId) => {
        let { sessionId } = this.state;
        var config = {
            headers: { 'Authorization': "bearer " + sessionId }
        };
        axios.get(`${Network.url}products/${productId}`, config)
            .then((response) => {
                if (response.data) {
                    console.log('response', response);
                    this.setState({ item: response.data });
                }
                else this.setState({ defaultText: "No Data Found!!!" })
            }).catch((error) => {
                Actions.showNotifier(this, 'categories error : ' + error, 1);
            });
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
                    Actions.openComponentProps(this, 'Cart', null);
                }
            }).catch((error) => {
                Actions.showNotifier(this, 'Error in Adding item to cart : ' + error, 1);
            });
    }



    /**
    * handling navigator event
    * @param {*} event event name
    */
    onNavigatorEvent = (event) => {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'menu') {
                Actions.startToggleDrawer(this);
            }
            else if (event.id == 'Cart') {
                Actions.openModalProps(this, 'Cart', null);
            }
            else if (event.id == 'Search') {
                Actions.openModalProps(this, 'Search', null);
            }
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
