import React, { Component } from 'react';
import { Text, View, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import Actions from '../../../../resources/actions';

import TextInputLayout from '../../../../library/textinputlayout';

import * as userActions from '../../../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class AddressWidget extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <TextInputLayout style={{ marginHorizontal: 16 }}>
          <TextInput
            style={{ fontSize: 16, height: 40 }}
            placeholder={'First Name'}
          />
        </TextInputLayout>
        <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
          <TextInput
            style={{ fontSize: 16, height: 40 }}
            placeholder={'Last Name'}
          />
        </TextInputLayout>
        <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}
          checkValid={t => EMAIL_REGEX.test(t)}>
          <TextInput
            style={{ fontSize: 16, height: 40 }}
            placeholder={'Email Address'}
            keyboardType={'email-address'}
          />
        </TextInputLayout>
        <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
          <TextInput
            style={{ fontSize: 16, height: 40 }}
            placeholder={'Phone'}
            keyboardType={'phone-pad'}
          />
        </TextInputLayout>
        <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
          <TextInput
            style={{ fontSize: 16, height: 40 }}
            placeholder={'Address'}
          />
        </TextInputLayout>
        <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
          <TextInput
            style={{ fontSize: 16, height: 40 }}
            placeholder={'City'}
          />
        </TextInputLayout>
        <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
          <TextInput
            style={{ fontSize: 16, height: 40 }}
            placeholder={'State'}
          />
        </TextInputLayout>
        <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
          <TextInput
            style={{ fontSize: 16, height: 40 }}
            placeholder={'Country'}
          />
        </TextInputLayout>

      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressWidget);
