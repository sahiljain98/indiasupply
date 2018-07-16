import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

import Actions from '../../../../resources/actions';
import Colors from '../../../../resources/color';
import Network from '../../../../library/network';

import * as userActions from '../../../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Strings from '../../../../resources/strings';

class ShippingWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userToken: this.props.service.userToken,
      carrier_code: this.props.carrier_code,
      method_code: this.props.method_code,
      address: this.props.address,
      totals: null,
      defaultText: 'Loading...'
    }
  }
  render() {
    let { totals } = this.state;
    return (
      totals ?
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 1 }}>
            {this.getTile("Sub-Total", totals.subtotal)}
            {this.getTile("Shipping", totals.shipping_amount)}
            {this.getTile("Grand-Total", totals.grand_total)}
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.updateStateWithValue(this.props.currentView)}
            style={{ justifyContent: 'center', paddingVertical: 12, backgroundColor: Colors.AccentColor, elevation: 2, borderRadius: 2, margin: 16 }}>
            <Text style={{ textAlign: 'center', fontSize: 16, marginHorizontal: 16, color: 'white' }}>Continue</Text>
          </TouchableOpacity>
        </View>
        :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fbfbfb' }}>
          <Text>{this.state.defaultText}</Text></View>
    );
  }

  componentDidMount() {
    this.shippingInformation();
  }


  /**
   * get tiles of shipping
   * @param {*} title title
   * @param {*} price amount
   */
  getTile = (title, price) => {
    return (<View style={{ margin: 16 }}>
      <Text style={{ fontSize: 16, color: 'black' }}>{title}</Text>
      <Text style={{ fontSize: 14, color: Colors.AccentColor, marginTop: 8, marginStart: 4 }}>{'₹ ' + price}</Text>
    </View>);

  }

  /**
* api hit
* shipping infomation
*/
  shippingInformation = async () => {

    let { userToken, carrier_code, method_code, address } = this.state;

    var userParms = {
      "addressInformation": {
        "shipping_address": {
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
        },
        "shipping_carrier_code": carrier_code,
        "shipping_method_code": method_code
      }
    };

    var config = {
      headers: { 'Authorization': "bearer " + userToken }
    };
    axios.post(`${Network.url}carts/mine/shipping-information`, userParms, config)
      .then((response) => {

        console.log('payment methods', response.data);

        if (response.data && response.data.payment_methods) {

          //update payment methods
          this.props.updatePayementMethods(response.data.payment_methods);

          this.setState({ totals: response.data.totals, defaultText: "" });

        } else {
          this.setState({ defaultText: "Failed to proceed!!!" })
        }
      }).catch((error) => {
        console.log(error);

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

export default connect(mapStateToProps, mapDispatchToProps)(ShippingWidget);
