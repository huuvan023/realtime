import * as type from './../Constants/actionTypes'

var initialState = {};

const messages = ( state = initialState, action ) => {
    switch( action.type ) {
        case type.FETCH_MESSAGES :
            console.log(action)
            state = action.messages;
            return state;
            break;
        default:
            return state;
            break;
    }
}
export default messages;