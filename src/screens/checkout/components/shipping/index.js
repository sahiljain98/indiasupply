import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import Actions from '../../../../resources/actions';
import Colors from '../../../../resources/color';

import * as userActions from '../../../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Strings from '../../../../resources/strings';

class ShippingWidget extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ margin: 16 }}>
          <Text style={{ fontSize: 16, color: 'black' }}>{Strings.AppName + ' Shipping'}</Text>
          <Text style={{ fontSize: 14, color: Colors.AccentColor, marginTop: 8, marginStart: 4 }}>{'₹ 100'}</Text>
        </View>
        <View style={{ margin: 16 }}>
          <Text style={{ fontSize: 16, color: 'black' }}>{'Flat Rate'}</Text>
          <Text style={{ fontSize: 14, color: Colors.AccentColor, marginTop: 8, marginStart: 4 }}>{'₹ 50'}</Text>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShippingWidget);
