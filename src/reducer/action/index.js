
import * as type from '../reducerConstants';

export const sessionId = (sessionId) => {
    return {
        type: type.SESSION_ID,
        sessionId
    }
}

export const userToken = (userToken) => {
    return {
        type: type.USER_TOKEN,
        userToken
    }
}
