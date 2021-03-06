import React, { Component } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';

import axios from 'axios';

import Actions from '../../resources/actions';
import Colors from '../../resources/color';
import AsyncStore from '../../library/asyncStore';
import Network from '../../library/network';

import TextInputLayout from '../../library/textinputlayout';

import * as userActions from '../../reducer/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Strings from '../../resources/strings';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Login extends Component {

    static navigatorStyle = { navBarHidden: true }

    constructor(props) {
        super(props);
        this.state = {
            sessionId: this.props.service.sessionId,
            userEmail: null,
            userPass: null
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: "space-around", }}>
                <View style={{ marginTop: 24, alignItems: 'center' }}>
                    <Image style={{ height: 56, width: 240, resizeMode: 'contain' }} source={{ uri: 'https://175688-509096-raikfcquaxqncofqfm.stackpathdns.com/pub/media/logo/stores/1/indiaSupplyStore.png' }} />
                </View>
                <View>
                    <TextInputLayout style={{ marginHorizontal: 16 }} checkValid={t => EMAIL_REGEX.test(t)}>
                        <TextInput
                            style={{ fontSize: 16, height: 40 }}
                            placeholder={'Email'}
                            keyboardType={'email-address'}
                            onChangeText={email => this.setState({ userEmail: email })}
                        />
                    </TextInputLayout>
                    <TextInputLayout style={{ marginHorizontal: 16, marginVertical: 8 }}>
                        <TextInput
                            style={{ fontSize: 16, height: 40 }}
                            secureTextEntry={true}
                            placeholder={'Password'}
                            onChangeText={password => this.setState({ userPass: password })}
                        />
                    </TextInputLayout>
                    <TouchableOpacity
                        onPress={() => this.loginUser()}
                        style={{ justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: Colors.AccentColor, elevation: 2, borderRadius: 2, marginTop: 24, marginHorizontal: 16 }}>
                        <Text style={{ textAlign: 'center', fontSize: 16, marginHorizontal: 16, color: 'white' }}>Login</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => Actions.openComponentProps(this, "Register", null)}
                    style={{ margin: 24, flexDirection: 'row', justifyContent: 'center', padding: 16 }}>
                    <Text style={{ fontSize: 14 }}>Not Registered?</Text>
                    <Text style={{ fontSize: 16, color: Colors.AccentColor }}>   Register Now</Text>

                </TouchableOpacity>
            </View>
        );
    }

    componentDidMount() {
        //get session
        this.getSession();
    }



    /**
     * get session id from local else hit api
     */
    getSession = async () => {
        try {
            AsyncStorage.getItem(AsyncStore.Constants.SESSION_ID)
                .then((sessionId) => {
                    console.log("session id is ", sessionId);

                    if (sessionId == null) {
                        this.getSessionByCredentials(Strings.AdminName, Strings.AdminPassword);
                    } else {

                        this.setState({ sessionId: sessionId });

                        //put session id in redux
                        let { action } = this.props;
                        action.sessionId(sessionId);
                    }
                });
        } catch (e) {
            console.log('Error in session');
        }

    }


    /**
     * api hit
     * get session
     * @param {*} username user name
     * @param {*} password password
     */
    getSessionByCredentials = async (username, password) => {
        var userParms = {
            "username": username,
            "password": password
        }
        axios.post(`${Network.url}integration/admin/token`, userParms)
            .then((response) => {
                console.log('session token', response.data);

                //put data into async store
                try {
                    AsyncStorage.setItem(AsyncStore.Constants.SESSION_ID, response.data);
                } catch (e) {
                    console.log('error in saving data', e);
                }

                //setting session id
                this.setState({ sessionId: response.data });

                //put session id in redux
                let { action } = this.props;
                action.sessionId(response.data);
            })
            .catch((error) => {
                console.log("Session Id not generated");
            });

    }




    /**
     * login user
     */
    loginUser = () => {
        let { userEmail, userPass } = this.state;
        console.log('userEmail', userEmail);
        console.log('userPass', userPass);
        if (this.validateCredentials(userEmail, userPass)) {
            this.generateCustomerToken(userEmail, userPass);
        } else {
            this.setState({ userPass: null });
            Actions.showNotifier(this, "Enter valid credentials!!!", 1);
        }
    }


    /**
     * validate credentials
     * @param {*} userEmail email 
     * @param {*} userPass password
     */
    validateCredentials(userEmail, userPass) {
        return ((userEmail && userEmail.length > 3) ? ((userPass && userPass.length > 2) ? true : false) : false)
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
                    Actions.showNotifier(this, "Logined", 1);
                    Actions.startMainScreen();
                    //put data into async store
                    try {

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
