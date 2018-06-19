import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';

import Actions from '../../resources/actions';
import AsyncStore from '../../library/asyncStore'

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ProductList extends Component {

    constructor(props) {
        super(props);

        this.props.navigator.setTitle({
            title: this.props.propsData
        });

        //initialize navigator event
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <Text >Feedback</Text>
            </View>
        );
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
