import * as type from './../Constants/actionTypes'

var initialState = null

const peerUser = ( state = initialState, action) => {
    switch( action.type ) {
        case type.ONSET_CURRENTPEER:
            return action.dataUser;
            break;
        default:
            return state;
            break;
    }
}
export default peerUser;