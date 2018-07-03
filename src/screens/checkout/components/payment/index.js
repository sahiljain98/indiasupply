import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import { RadioGroup, RadioButton } from '../../../../library/radiobutton';

import Actions from '../../../../resources/actions';
import Colors from '../../../../resources/color';

import * as userActions from '../../../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PaymentWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.onSelect = this.onSelect.bind(this)
  }

  onSelect(index, value) {
    this.setState({
      text: `Selected index: ${index} , value: ${value}`
    })
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <RadioGroup
          style={{ margin: 8 }}
          onSelect={(index, value) => this.onSelect(index, value)}
          color={Colors.AccentColor}
        >
          <RadioButton value={'item1'} >
            <Text style={{ fontSize: 16 }}>COD</Text>
          </RadioButton>

          <RadioButton value={'item2'}>
            <Text style={{ fontSize: 16 }}>Online Payment</Text>
          </RadioButton>

        </RadioGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentWidget);
