import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import Actions from '../../resources/actions';
import Colors from '../../resources/color';

import TextInputLayout from '../../library/textinputlayout';

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Register extends Component {

    static navigatorStyle = { navBarHidden: true }

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ marginTop: 48,marginBottom:16, alignItems: 'center' }}>
                    <Image style={{ height: 56, width: 240, resizeMode: 'contain' }} source={{ uri: 'https://175688-509096-raikfcquaxqncofqfm.stackpathdns.com/pub/media/logo/stores/1/indiaSupplyStore.png' }} />
                </View>
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
                        placeholder={'Password'}
                    />
                </TextInputLayout>
                <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
                    <TextInput
                        style={{ fontSize: 16, height: 40 }}
                        placeholder={'Confirm Password'}
                    />
                </TextInputLayout>

                <TouchableOpacity
                    style={{ justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: Colors.AccentColor, elevation: 2, borderRadius: 2, marginVertical: 36, marginHorizontal: 16 }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, marginHorizontal: 16, color: 'white' }}>Register</Text>
                </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
