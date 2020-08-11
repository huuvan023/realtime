import { combineReducers } from 'redux'
import user from './users';
import messages from './messages';
import peerMessage from './peerMessage';

const myReducer = combineReducers({
    user,
    messages,
    peerMessage,
});

export default myReducer;