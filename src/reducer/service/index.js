
import * as type from '../reducerConstants';

const initialUserState = {
    sessionId: '',
    userToken: ''
}


const service = (state = initialUserState, action) => {

    switch (action.type) {
        case type.SESSION_ID:
            return {
                ...state,
                sessionId: action.sessionId
            }
        case type.USER_TOKEN:
            return {
                ...state,
                userToken: action.userToken
            }
        default:
            return state;
    }

}

export default service;