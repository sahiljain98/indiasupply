import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import Actions from '../../../../resources/actions';
import Colors from '../../../../resources/color';

import * as userActions from '../../../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ConfirmationWidget extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ height: 96, width: 96, backgroundColor: Colors.AccentColor, padding: 16, borderRadius: 360, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 48, height: 48, resizeMode: 'cover' }} source={require('../../../../resources/icons/tick.png')} />
        </View>
        <Text style={{ color: 'black', fontSize: 16, padding: 16 }}>Your order has placed succesfully</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationWidget);
