import { combineReducers } from 'redux'
import user from './users';
import messages from './messages';

const myReducer = combineReducers({
    user,
    messages,
});

export default myReducer;