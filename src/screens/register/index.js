import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import axios from 'axios';

import Actions from '../../resources/actions';
import Colors from '../../resources/color';
import Network from '../../library/network';
import AsyncStore from '../../library/asyncStore';

import TextInputLayout from '../../library/textinputlayout';

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Register extends Component {

    static navigatorStyle = { navBarHidden: true }

    constructor(props) {
        super(props);
        this.state = {
            sessionId: this.props.service.sessionId,
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            confirmPassword: null,
            confirmSecurity: false
        }
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ marginTop: 48, marginBottom: 16, alignItems: 'center' }}>
                    <Image style={{ height: 56, width: 240, resizeMode: 'contain' }} source={{ uri: 'https://175688-509096-raikfcquaxqncofqfm.stackpathdns.com/pub/media/logo/stores/1/indiaSupplyStore.png' }} />
                </View>
                <TextInputLayout style={{ marginHorizontal: 16 }}>
                    <TextInput
                        style={{ fontSize: 16, height: 40 }}
                        placeholder={'First Name'}
                        onChangeText={fname => this.setState({ firstName: fname })}
                    />
                </TextInputLayout>
                <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
                    <TextInput
                        style={{ fontSize: 16, height: 40 }}
                        placeholder={'Last Name'}
                        onChangeText={lname => this.setState({ lastName: lname })}
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
                        placeholder={'Password'}
                        secureTextEntry={true}
                        onChangeText={pass => this.setState({ password: pass })}
                    />
                </TextInputLayout>
                <TextInputLayout style={{ marginTop: 16, marginHorizontal: 16 }}>
                    <TextInput
                        style={{ fontSize: 16, height: 40 }}
                        placeholder={'Confirm Password'}
                        secureTextEntry={true}
                        onChangeText={cpass => this.checkPass(cpass)}
                    />
                </TextInputLayout>

                <TouchableOpacity
                    onPress={() => this.registerUser()}
                    style={{ justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: Colors.AccentColor, elevation: 2, borderRadius: 2, marginVertical: 36, marginHorizontal: 16 }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, marginHorizontal: 16, color: 'white' }}>Register</Text>
                </TouchableOpacity>
            </ScrollView>

        );
    }

    /**
     * confirm password
     * @param {*} cpass confirm password
     */
    checkPass = (cpass) => {
        let { password } = this.state;
        this.setState({ confirmPassword: cpass })

        if (cpass && cpass.length > password.length) {
            Actions.showNotifier(this, "Password not match!!!", 1);
        } else if (cpass && cpass.length == password.length && (cpass != password)) {
            Actions.showNotifier(this, "Password not match!!!", 1);
        }
    }


    /**
     * login user
     */
    registerUser = () => {
        if (this.validateCredentials()) {
            this.registerUserCredentials();
        } else {
            Actions.showNotifier(this, "Enter valid credentials!!!", 1);
        }
    }


    /**
     * validate credentials
     */
    validateCredentials() {
        let { firstName, lastName, email, phone, password, confirmPassword } = this.state;
        return ((firstName && firstName.length > 1) ?
            ((lastName && lastName.length > 1) ?
                ((email && email.length > 3) ?
                    ((password && password.length > 2) ?
                        ((confirmPassword && password == confirmPassword) ? true : false) :
                        false) :
                    false) :
                false) :
            false);
    }


    /**
     * register user
     */
    registerUserCredentials = () => {
        let { sessionId, firstName, lastName, email, password } = this.state;

        var config = {
            headers: { 'Authorization': "bearer " + sessionId }
        };

        console.log('config : ', config);


        var userParams = {
            customer: {
                email: email,
                firstname: firstName,
                lastname: lastName
            },
            password: password
        };
        console.log('userParams : ', userParams);


        axios.post(`${Network.url}customers`, userParams, config)
            .then((response) => {
                console.log('register user', response.data);

                if (response.data && response.data.id) {

                    Actions.showNotifier(this, "User Registered", 1);

                    //generating customer token
                    this.generateCustomerToken(email, password);

                    //put data into async store
                    try {
                        AsyncStorage.setItem(AsyncStore.Constants.CUSTOMER_ID, response.data.id + "");
                    } catch (e) {
                        console.log('error in saving user token', e);
                    }
                } else if (response.data && response.data.message) {
                    Actions.showNotifier(this, response.data.message, 1);
                }

                else Actions.showNotifier(this, "Failed to register user!!!", 1);
            }).catch((error) => {
                Actions.showNotifier(this, 'Failed ' + error, 1);
            });


    }

    /**
     * generate customer token
     * @param {*} userEmail email
     * @param {*} userPass password
     */
    generateCustomerToken = (userEmail, userPass) => {
        let { sessionId } = this.state;
        var config = {
            headers: { 'Authorization': "bearer " + sessionId }
        };
        var userParams = {
            username: userEmail,
            password: userPass
        }
        axios.post(`${Network.url}integration/customer/token`, userParams, config)
            .then((response) => {
                if (response.data) {
                    //put data into async store
                    try {

                        //start main screen
                        Actions.startMainScreen();

                        //save user token
                        AsyncStorage.setItem(AsyncStore.Constants.USER_TOKEN, response.data);

                        //put usre token id in redux
                        let { action } = this.props;
                        action.userToken(response.data)
                    } catch (e) {
                        console.log('error in saving user token', e);
                    }
                } else Actions.showNotifier(this, "Failed to login user!!!", 1);
            }).catch((error) => {
                Actions.showNotifier(this, 'Failed ' + error, 1);
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
        action: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
