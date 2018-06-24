import React, { Component } from 'react';
import { View, Image, SafeAreaView, ScrollView, Text, FlatList, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';

import axios from 'axios';

import Actions from '../../resources/actions';
import Color from '../../resources/color';
import Network from '../../library/network';
import AsyncStore from '../../library/asyncStore';
import AppConfig from '../../resources/appconfig';

import DrawerTile from '../../components/drawertile';

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



class Drawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            subCategoryList: [],
            isFetching: false,
            selectedTile: null,
        }
    }

    render() {
        let { selectedTile } = this.state;
        return (
            <SafeAreaView name="header" style={{ backgroundColor: Color.PrimaryColor, flex: 1 }}>
                <View style={{ backgroundColor: AppConfig.NavbarConfig.navBarBackgroundColor, height: AppConfig.NavbarConfig.navBarHeight, justifyContent: 'center' }}>
                    <Text style={{ color: AppConfig.NavbarConfig.navBarTextColor, fontSize: AppConfig.NavbarConfig.navBarTextFontSize, textAlign: 'center' }}>Categories</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.categoryList}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                onPress={() => {
                                    (item.children_data && item.children_data.length > 0) ?
                                        this.setState({ subCategoryList: item.children_data, selectedTile: item.name }) :
                                        Actions.openModalProps(this, "ProductList", { name: item.name, id: item.id })
                                }}
                                style={{ backgroundColor: (selectedTile && selectedTile == item.name) ? Color.PrimaryColor : 'white', paddingHorizontal: 16, paddingVertical: 12 }}>
                                <Text style={{ fontSize: 16, color: Color.PrimaryTextColor }} key={index} >{item.name}</Text>
                            </TouchableOpacity>
                        }
                    />
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.subCategoryList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => <DrawerTile reference={this} key={index} item={item} />}
                    />
                </View>

            </SafeAreaView>
        );
    }


    componentDidMount() {
        this.getSession();
    }

    /**
  * refresh feed
  */
    onRefresh = () => {
        this.setState({ isFetching: true, categoryList: [] });
        // console.log("timeline", this.state.selectedAuthorFilteredFeed, this.state.selectedPublisherFilteredFeed, this.state.selectedlocationFilteredFeed, this.state.selectedCategoryFilteredFeed)
        this.getSession();
    }

    /**
 * get session id from local else hit api
 */
    getSession = async () => {
        try {
            AsyncStorage.getItem(AsyncStore.Constants.SESSION_ID)
                .then((sessionId) => {
                    console.log("session id is ", sessionId);

                    if (sessionId == null) {
                        this.getSessionByCredentials('priti', 'admin123');
                    } else {
                        //hit api
                        this.getCategoryList(sessionId);

                        //put session id in redux
                        let { action } = this.props;
                        action.sessionId(sessionId)
                    }
                });
        } catch (e) {
            console.log('Error in session');
        }

    }


    /**
     * api hit
     * get session
     * @param {*} username user name
     * @param {*} password password
     */
    getSessionByCredentials = async (username, password) => {
        var userParms = {
            "username": username,
            "password": password
        }
        axios.post(`${Network.url}integration/admin/token`, userParms)
            .then((response) => {
                console.log('session token', response.data);

                //put data into async store
                try {
                    AsyncStorage.setItem(AsyncStore.Constants.SESSION_ID, response.data);
                } catch (e) {
                    console.log('error in saving data', e);
                }
                //hit api
                this.getCategoryList(response.data);

                //put session id in redux
                let { action } = this.props;
                action.sessionId(response.data);
            })
            .catch((error) => {
                console.log('Session Id not generated');
                ;
            });

    }

    /**
      * api Hit
      * get category list
      * @param {*} sessionId token id
      */
    getCategoryList = (sessionId) => {

        //set default state
        this.setState({ isFetching: true, })

        var config = {
            headers: { 'Authorization': "bearer " + sessionId }
        };
        axios.get(`${Network.url}categories/`, config)
            .then((response) => {
                if (response.data.children_data && response.data.children_data.length > 0) {
                    console.log('category list data', response.data.children_data);

                    this.setState({ categoryList: response.data.children_data, isFetching: false });
                } else this.setState({ isFetching: false });
            }).catch((error) => {
                Actions.showNotifier(this, 'categories error : ' + error, 1);
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
        action: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);

