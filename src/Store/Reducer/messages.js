import * as type from './../Constants/actionTypes'

var initialState = [];

const messages = ( state = initialState, action ) => {
    switch( action.type ) {
        /*
        case type.FETCH_MESSAGES :
            state = action.messages;
            console.log(state)
            return state;
            break;*/
        case type.FETCH_LISTEN_MESSAGE:
            console.log("FETCH_LISTEN_MESSAGE")
            return action.messages
            break;
        default:
            return state;
            break;
    }
}
export default messages;