
import * as type from '../reducerConstants';

const initialUserState = {
    sessionId: ''
}


const service = (state = initialUserState, action) => {

    switch (action.type) {
        case type.SESSION_ID:
            return {
                ...state,
                sessionId: action.sessionId
            }
        default:
            return state;
    }

}

export default service;