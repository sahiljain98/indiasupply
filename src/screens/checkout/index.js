import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import Actions from '../../resources/actions';
import Colors from '../../resources/color';
import CheckoutConstants from './utils/constants';

import AddressWidget from './components/address';
import ConfirmationWidget from './components/confirmation';
import PaymentWidget from './components/payment';
import ShippingWidget from './components/shipping';

import LocationIcon from '../../resources/icons/location.png';
import DeliveryIcon from '../../resources/icons/delivery.png';
import PaymentIcon from '../../resources/icons/payment.png';
import ConfirmationIcon from '../../resources/icons/confirmation.png';

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Checkout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentView: CheckoutConstants.ADDRESS,
      carrier_code: null,
      method_code: null,
      address: null,
      payment_methods: [],
      orderId: null
    };
  }

  render() {
    let { currentView } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {this.getHeader()}
        <View style={{ flex: 1 }}>
          {this.getContentView(currentView)}
        </View>
      </View>
    );
  }

  /**
   * get Header
   */
  getHeader = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16, marginHorizontal: 8 }}>
        {this.getTile(LocationIcon, "Address", CheckoutConstants.ADDRESS)}

        {this.getTile(DeliveryIcon, "Shipping", CheckoutConstants.SHIPPING)}

        {this.getTile(PaymentIcon, "Payment", CheckoutConstants.PAYMENT)}

        {this.getTile(ConfirmationIcon, "Confirm", CheckoutConstants.CONFIRMATION)}
      </View>);
  }

  /**
  * get header tile
  * @param {*} icon icon name
  * @param {*} name name
  * @param {*} state state name
  */
  getTile = (icon, name, state) => {
    let { currentView } = this.state;
    return (
      <View style={{ alignSelf: 'center' }}>
        <View
          style={{ alignItems: 'center' }}
        // onPress={() => { this.setState({ currentView: state }) }}
        >
          <View style={{ height: 48, width: 48, borderRadius: 360, justifyContent: 'center', backgroundColor: (currentView === state) ? Colors.AccentColor : 'grey' }}>
            <Image style={{ height: 24, width: 24, alignSelf: 'center', resizeMode: 'cover' }} source={icon} />
          </View>
          <Text style={{ fontSize: 16, padding: 6, textAlign: 'center', color: (currentView === state) ? Colors.AccentColor : 'grey' }}>{name}</Text>
        </View>
      </View>);
  }

  /**
 * getting view according to value
 * @param {*} value active state
 */
  getContentView = (value) => {
    switch (value) {
      case CheckoutConstants.ADDRESS:
        return (<AddressWidget
          reference={this}
          updateStateWithValue={this.updateStateWithValue.bind(this)}
          currentView={this.state.currentView}
          updateShippingMode={this.updateShippingMode.bind(this)} />);
      case CheckoutConstants.SHIPPING:
        return (<ShippingWidget
          reference={this}
          address={this.state.address}
          carrier_code={this.state.carrier_code}
          method_code={this.state.method_code}
          currentView={this.state.currentView}
          updateStateWithValue={this.updateStateWithValue.bind(this)}
          updatePayementMethods={this.updatePayementMethods.bind(this)} />);
      case CheckoutConstants.PAYMENT:
        return (<PaymentWidget
          reference={this}
          address={this.state.address}
          paymentMethods={this.state.payment_methods}
          currentView={this.state.currentView}
          updateStateWithValue={this.updateStateWithValue.bind(this)}
          updateOrderId={this.updateOrderId.bind(this)} />);
      case CheckoutConstants.CONFIRMATION:
        return (<ConfirmationWidget orderId={this.state.orderId} />);
      default:
        return (<AddressWidget />);
    }
  }

  /**
   * update state with given value and update state
   * @param {*}value visible state
   */
  updateStateWithValue = (value) => {
    let updatedValue = this.updateNext(value);
    this.setState({ currentView: updatedValue })
  }

  /**
   * return to next state
   * @param {*} value active visible state
   */
  updateNext = (value) => {
    switch (value) {
      case CheckoutConstants.ADDRESS:
        return CheckoutConstants.SHIPPING;
      case CheckoutConstants.SHIPPING:
        return CheckoutConstants.PAYMENT;
      case CheckoutConstants.PAYMENT:
        return CheckoutConstants.CONFIRMATION;
      default:
        return CheckoutConstants.ADDRESS;
    }
  }

  /**
   * update shipping mode
   * @param {*} cCode carrier code
   * @param {*} mCode method code
   * @param {*} addr address
   */
  updateShippingMode = (cCode, mCode, addr) => {
    this.setState({ carrier_code: cCode, method_code: mCode, address: addr });
  }


  /**
   * update payment methods
   * @param {*} methods payment methods
   */
  updatePayementMethods = (methods) => {
    this.setState({ payment_methods: methods })
  }

  /**
 * update order id
 * @param {*} id order id
 */
  updateOrderId = (id) => {
    this.setState({ orderId: id })
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
