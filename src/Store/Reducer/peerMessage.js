import * as type from './../Constants/actionTypes'

var initialState = {};

const peerMessage = ( state = initialState, action ) => {
    switch( action.type ) {
        case type.FETCH_PEER_MESSAGES:
            let st = action.listMessages;
            for ( let i = 0; i < st.length ; i ++) {
                if( st[i].conversationID === action.conversationID ) {
                    console.log({
                        conversationWith : action.peerID,
                        messages: st[i].messages,
                        userID : action.userID
                    })
                    return {
                        messages: st[i].messages,
                        conversationWith : action.peerID,
                        userID : action.userID
                    };
                }
            }
            
            return {
                conversationWith : action.peerID,
                messages: [],
                userID : action.userID
            }
            break
        case type.UPDATE_PEER_MESSAGES:
            
            state = action.messages
                
            return state;
        break
        default:
            return state;
            break;
    }
}
export default peerMessage;