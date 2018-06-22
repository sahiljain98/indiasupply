import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

import Actions from '../../resources/actions';
import Network from '../../library/network';
import AppConfig from '../../resources/appconfig';
import Colors from '../../resources/color';

import NotFoundIcon from '../../resources/icons/notfound_image.png';

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
            layoutWidth: null
        }


        this.props.navigator.setTitle({
            title: " "
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
        return (
            <View style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}
                onLayout={(event) => { this.setState({ layoutWidth: event.nativeEvent.layout.width }) }}>
                {/* layout content */}
                <View style={{ flex: 1 }}>

                    {/* image header */}
                    <TouchableOpacity style={{ backgroundColor: 'white', alignItems: 'center', width: this.state.layoutWidth, height: this.state.layoutWidth * 0.5625, justifyContent: 'center' }}>
                        <Image source={NotFoundIcon} style={{ width: 36, height: 36 }} />
                    </TouchableOpacity>
                    <Text>Product Name</Text>
                </View>


                {this.getBottomButtons()}
            </View>
        );
    }


    componentDidMount() {
        this.getProductDetailById(this.state.productId)
    }



    /**
     * get bottom buttons
     */
    getBottomButtons = () => {
        return (<View style={{ flexDirection: 'row', elevation: 2 }}>
            <TouchableOpacity
                onPress={() => Actions.openComponentProps(this, 'Wishlist', null)}
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 16, backgroundColor: Colors.AccentColor, elevation: 2, borderRadius: 2, marginRight: 1, }}>
                <Text style={{ textAlign: 'center', fontSize: 16, marginHorizontal: 16, color: 'white' }}>WISHLIST</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Actions.openComponentProps(this, 'Cart', null)}
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
