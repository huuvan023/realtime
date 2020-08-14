import { combineReducers } from 'redux'
import user from './users';
import messages from './messages';
import peerMessage from './peerMessage';
import peerUser from './peerUser';

const myReducer = combineReducers({
    user,
    messages,
    peerUser,
    peerMessage,
});

export default myReducer;