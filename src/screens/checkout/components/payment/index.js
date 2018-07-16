import React, { Component } from 'react';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import { RadioGroup, RadioButton } from '../../../../library/radiobutton';
import axios from 'axios';

import Actions from '../../../../resources/actions';
import Colors from '../../../../resources/color';
import Network from '../../../../library/network';
import * as userActions from '../../../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PaymentWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userToken: this.props.service.userToken,
      text: '',
      paymentMethods: this.props.paymentMethods,
      address: this.props.address,
      loading: false
    }
    this.onSelect = this.onSelect.bind(this)
  }



  render() {
    return (
      (this.state.paymentMethods && this.state.paymentMethods.length > 0) ?
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {
            this.state.loading ? <View style={{
              position: 'absolute', zIndex: 1, top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center',
              opacity: 0.7, backgroundColor: 'white'
            }}>
              <ActivityIndicator
                size="large"
                color={Colors.AccentColor}
                animating={this.state.loading} />
            </View> : <View />
          }
          <RadioGroup
            style={{ margin: 8 }}
            onSelect={(index, value) => this.onSelect(index, value)}
            color={Colors.AccentColor}>
            {this.state.paymentMethods.map((item, index) => {
              return (this.getTile(item.code, item.title))
            })}

          </RadioGroup>
        </View> :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fbfbfb' }}>
          <Text>No Payment Method found!!!</Text></View>
    );
  }

  /**
   * return tile
   * @param {*} code code
   * @param {*} title title
   */
  getTile = (code, title) => {
    return (
      <RadioButton value={code} key={code}>
        <Text style={{ fontSize: 16 }}>{title}</Text>
      </RadioButton>
    );

  }

  onSelect(index, value) {
    console.log('value is : ', value);
    this.setState({ loading: true });
    this.createOrder(value);
  }

  /**
 * api hit
 * creating order
 * 
 */
  createOrder = async (paymentMethod) => {

    let { userToken, address } = this.state;

    var userParms = {

      "paymentMethod": {
        "method": paymentMethod
      },
      "billing_address": {
        "region": address.state,
        "country_id": address.country,
        "street": [
          address.street
        ],
        "postcode": address.postcode,
        "city": address.city,
        "firstname": address.firstName,
        "lastname": address.lastName,
        "email": address.email,
        "telephone": address.phone
      }
    };

    var config = {
      headers: { 'Authorization': "bearer " + userToken }
    };
    axios.post(`${Network.url}carts/mine/payment-information`, userParms, config)
      .then((response) => {

        console.log('creating order', response.data);

        if (response.data) {
          this.setState({ loading: false, defaultText: "" });
          this.props.updateOrderId(response.data);
          this.props.updateStateWithValue(this.props.currentView);
        } else {
          this.setState({ loading: false, defaultText: "Failed to proceed!!!" });
        }
      }).catch((error) => {
        console.log(error);
        this.setState({ loading: false, defaultText: "Failed to proceed!!!" });
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentWidget);
