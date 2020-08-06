import * as type from './../Constants/actionTypes'

var initialState = {}

export default listUsers = ( state = initialState, action) => {
    switch( action.type ) {
        case type.FETCH_ALL_USERS:
            return "Dasd"
            break;
        default:
            return state;
            break;
    }
}