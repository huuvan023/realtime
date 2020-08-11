import * as action from './../Constants/actionTypes';
import user from '../Reducer/users';


export const checkLoginUser = ( checkLogin,dataUser,error  ) => {
    return {
        type: action.CHECK_LOGIN_USER,
        check: checkLogin,
        userData: dataUser,
        error: error
    }
}

export const registerUser = (status,error) => {
    return {
        type: action.REGISTER_USER,
        message: error,
        status: status,
    }
}
export const sendResetPassword = ( status, error ) => {
    return {
        
        type: action.RESET_PASSWORD,
        status: status,
        message: error
    }
}
export const fetchUserInfor = (userData,errorgetUserInfor,listUsers,errorfetchAllFriend) => {
    return {
        userData: {
            data: userData,
            error: errorgetUserInfor
        },
        listUsers: {
            data: listUsers,
            error: errorfetchAllFriend
        },
        type: action.FETCH_USER
    }
}

export const fetchListUsers = (listUsers,errorfetchAllFriend) => {
    return {
        listUsers: {
            data: listUsers,
            error: errorfetchAllFriend
        },
        type: action.FETCH_ALL_USERS
    }
}
export const fetchPeerMessages = (conversationID,listMessages,userID,peerID) => {
    return {
        conversationID,
        userID,
        peerID,
        listMessages,
        type: action.FETCH_PEER_MESSAGES
    }
}
export const fetchAllMessage = (message) => {
    return {
        type: action.FETCH_MESSAGES,
        messages: message,
    }
}
export const updatePeerMessages = ( message,converWith,userID ) => {
    console.log(message)
    return {
        messages: {
            conversationWith: converWith,
            messages: message,
            userID: userID
        },
        type: action.UPDATE_PEER_MESSAGES
    }
}