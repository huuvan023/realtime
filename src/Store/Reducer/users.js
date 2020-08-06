import * as type from './../Constants/actionTypes';

var initialState = {}

const user = ( state = initialState, action ) => {
    switch( action.type ) {
        case type.FETCH_USER:
            /*const uniqueArray = action.listUsers.data.filter((item, index) => {
                action.userData.data.indexOf(action.userData.data) === index
            })

            console.log(uniqueArray)*/
            
            state = {
                userData: action.userData,
                listUsers: action.listUsers
            };
            return state;
            break;
        case type.CHECK_LOGIN_USER :
            state = {
                checkLogin: action.check,
                error: action.error,
                information: action.userData
            }
            return state;
            break;
        case type.REGISTER_USER:
            state = {
                status: action.status,
                message: action.message,
            }
            return state;
            break;

        case type.RESET_PASSWORD:
            state = { 
                status: action.status,
                message: action.message
            }
            return state;
            break;
        default:
            return state
            break
    }
}
export default user;