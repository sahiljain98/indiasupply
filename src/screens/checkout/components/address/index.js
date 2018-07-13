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
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <TextInputLayout style={{ marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'First Name'}
              onChangeText={name => this.setState({ firstName: name })}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'Last Name'}
              onChangeText={name => this.setState({ lastName: name })}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}
            checkValid={t => EMAIL_REGEX.test(t)}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'Email Address'}
              keyboardType={'email-address'}
              onChangeText={email => this.setState({ email: email })}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'Phone'}
              keyboardType={'phone-pad'}
              onChangeText={phone => this.setState({ phone: phone })}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'Street'}
              onChangeText={addr => this.setState({ street: addr })}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'City'}
              onChangeText={city => this.setState({ city: city })}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'State'}
              onChangeText={value => this.setState({ state: value })}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'Country'}
              onChangeText={country => this.setState({ country: country })}
            />
          </TextInputLayout>
          <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
            <TextInput
              style={{ fontSize: 16, height: 40 }}
              placeholder={'Post Code'}
              onChangeText={code => this.setState({ postcode: code })}
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
    let { userToken, firstName, lastName, email, phone, street, city, state, country, postcode } = this.state;
    return (firstName ?
      (lastName ?
        (email ?
          (phone ?
            (street ?
              (city ?
                (country ?
                  (postcode ? true : false) :
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

    let { userToken, firstName, lastName, email, phone, street, city, state, country, postcode } = this.state;

    var userParms = {
      "address": {
        "region": state,
        "country_id": country,
        "street": [
          street
        ],
        "postcode": postcode,
        "city": city,
        "firstname": firstName,
        "lastname": lastName,
        "email": email,
        "telephone": phone,
        "same_as_billing": 1
      }
    };

    var config = {
      headers: { 'Authorization': "bearer " + userToken }
    };
    axios.post(`${Network.url}carts/mine/estimate-shipping-methods`, userParms, config)
      .then((response) => {
        if (response.data) {
          console.log('shipping addr', response.data);
          this.props.updateStateWithValue(this.props.currentView)
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
