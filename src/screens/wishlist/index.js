import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import Actions from '../../resources/actions';

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Wishlist extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Text>Wishlist</Text>
            </View>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
