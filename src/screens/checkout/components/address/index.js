import React, { Component } from 'react';
import { Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

import Actions from '../../../../resources/actions';
import Network from '../../../../library/network';
import Colors from '../../../../resources/color';

import TextInputLayout from '../../../../library/textinputlayout';

import * as userActions from '../../../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class AddressWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userToken: this.props.service.userToken,
      address: {
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        street: null,
        city: null,
        state: null,
        country: null,
        postcode: null
      }
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <TextInputLayout style={{ marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'First Name'}
              onChangeText={name => {
                let address = this.state.address;
                address.firstName = name;

                // update state
                this.setState({
                  address,
                });
              }}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'Last Name'}
              onChangeText={name => {
                let address = this.state.address;
                address.lastName = name;

                // update state
                this.setState({
                  address,
                });
              }}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}
            checkValid={t => EMAIL_REGEX.test(t)}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'Email Address'}
              keyboardType={'email-address'}
              onChangeText={email => {
                let address = this.state.address;
                address.email = email;

                // update state
                this.setState({
                  address,
                });
              }}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'Phone'}
              keyboardType={'phone-pad'}
              onChangeText={phone => {
                let address = this.state.address;
                address.phone = phone;

                // update state
                this.setState({
                  address,
                });
              }}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'Street'}
              onChangeText={addr => {
                let address = this.state.address;
                address.street = addr;

                // update state
                this.setState({
                  address,
                });
              }}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'City'}
              onChangeText={city => {
                let address = this.state.address;
                address.city = city;

                // update state
                this.setState({
                  address,
                });
              }}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'State'}
              onChangeText={value => {
                let address = this.state.address;
                address.state = value;

                // update state
                this.setState({
                  address,
                });
              }}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'Country ID (example: IN,US)'}
              onChangeText={country => {
                let address = this.state.address;
                address.country = country;

                // update state
                this.setState({
                  address,
                });
              }}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'Post Code'}
              onChangeText={code => {
                let address = this.state.address;
                address.postcode = code;

                // update state
                this.setState({
                  address,
                });
              }}
            />
          </TextInputLayout>

        </ScrollView>
        <TouchableOpacity
          onPress={() => this.getCarrierCode()}
          style={{ justifyContent: 'center', paddingVertical: 12, backgroundColor: Colors.AccentColor, elevation: 2, borderRadius: 2, margin: 16 }}>
          <Text style={{ textAlign: 'center', fontSize: 16, marginHorizontal: 16, color: 'white' }}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }


  /**
   * get carrier code
   */
  getCarrierCode = () => {
    if (this.validateShippingAddress()) {
      this.estimateShippingAddress();
    } else Actions.showNotifier(this.props.reference, "Complete all fields!!!", 1);
  }

  /**
   * validate shipping address
   */
  validateShippingAddress = () => {
    let { userToken, address } = this.state;
    return (address.firstName ?
      (address.lastName ?
        (address.email ?
          (address.phone ?
            (address.street ?
              (address.city ?
                (address.country ?
                  (address.postcode ? true : false) :
                  false) :
                false) :
              false) :
            false) :
          false) :
        false) :
      false);
  }

  /**
 * api hit
 * estimate shipping address
 */
  estimateShippingAddress = async () => {

    let { userToken, address } = this.state;

    var userParms = {
      "address": {
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
        "telephone": address.phone,
        "same_as_billing": 1
      }
    };

    var config = {
      headers: { 'Authorization': "bearer " + userToken }
    };
    axios.post(`${Network.url}carts/mine/estimate-shipping-methods`, userParms, config)
      .then((response) => {
        console.log('shipping addr', response.data);

        if (response.data && response.data.length > 0) {
          //update shipping value
          this.props.updateShippingMode(response.data[0].carrier_code, response.data[0].method_code, address);
          //update state to shipping
          this.props.updateStateWithValue(this.props.currentView);
        } else Actions.showNotifier(this.props.reference, "Fail to continue!!!", 1);
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressWidget);
