import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';

import axios from 'axios';

import Actions from '../../resources/actions';
import AsyncStore from '../../library/asyncStore';
import AppConfig from '../../resources/appconfig';
import Colors from '../../resources/color';
import Network from '../../library/network';

import ProductListTile from '../../components/productlisttile';

import SortIcon from '../../resources/icons/sort.png';
import FilterIcon from '../../resources/icons/filter.png';

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionId: this.props.service.sessionId,
            categoryId: this.props.propsData.id,
            defaultText: 'Loading...',
            productList: []
        }

        this.props.navigator.setTitle({
            title: this.props.propsData.name
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
            <View style={{ flex: 1, backgroundColor: Colors.PrimaryColor }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => Actions.openComponentProps(this, 'Sort', null)}
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 16, backgroundColor: 'white', elevation: 2, borderRadius: 2, marginHorizontal: 1 }}>
                        <Image source={SortIcon} style={{ height: 24, width: 24 }} />
                        <Text style={{ textAlign: 'center', fontSize: 16, marginHorizontal: 16, color: Colors.PrimaryTextColor }}>Sort</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => Actions.openComponentProps(this, 'Filter', null)}
                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 16, backgroundColor: 'white', elevation: 2, borderRadius: 2, marginHorizontal: 1, }}>
                        <Image source={FilterIcon} style={{ height: 24, width: 24 }} />
                        <Text style={{ textAlign: 'center', fontSize: 16, marginHorizontal: 16, color: Colors.PrimaryTextColor }}>Filter</Text>
                    </TouchableOpacity>
                </View>
                {(this.state.productList && this.state.productList.length > 0) ?
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.productList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <ProductListTile item={item} reference={this} />}
                    /> :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>{this.state.defaultText}</Text>
                    </View>}
            </View>
        );
    }


    componentDidMount() {
        this.getProductListById(this.state.categoryId);
    }


    /**
    * api Hit
    * get product list by category id
    * @param {*} categoryId categoryId
    */
    getProductListById = (categoryId) => {
        let { sessionId } = this.state;
        let page_size = 5;
        var config = {
            headers: { 'Authorization': "bearer " + sessionId }
        };
        axios.get(`${Network.url}products?searchCriteria[page_size]=${page_size}&searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${categoryId}`, config)
            .then((response) => {
                if (response.data.items && response.data.items.length > 0) {
                    console.log('response', response);

                    this.setState({ productList: response.data.items });
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
