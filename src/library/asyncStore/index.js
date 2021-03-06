import { AsyncStorage } from 'react-native';

//all constants define here


const Constants = {
    SESSION_ID: 'sessionId',
    USER_TOKEN: 'user_token',
    CUSTOMER_ID: 'customer_id'
};

/**
 * put data into local storage
 */
var put = async (key, value) => {
    try {
        if (value instanceof Object)
            return await AsyncStorage.setItem(key, JSON.stringify(value));
        else {
            return await AsyncStorage.setItem(key, value);
        }
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    put: put,
    Constants: Constants
}