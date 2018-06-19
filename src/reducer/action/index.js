
import * as type from '../reducerConstants';

export const sessionId = (sessionId) => {
    return {
        type: type.SESSION_ID,
        sessionId
    }
}

