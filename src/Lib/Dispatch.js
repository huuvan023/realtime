import * as action from './../Store/Actions/index';
import LoginString from './LoginString';
import firebase from './../Services/Firebase';

export const fetchUser = (user) => {
    return async (dispatch) => {
        let currentUserID = null;
        let userData = null;
        let errorgetUserInfor = "";
        let errorfetchAllFriend = "";
        let listUsers = [];
        if( localStorage.getItem(LoginString.firebaseDocumentID) ) {
            currentUserID = localStorage.getItem(LoginString.firebaseDocumentID);
        }
        if ( sessionStorage.getItem(LoginString.firebaseDocumentID) ) {
            currentUserID = sessionStorage.getItem(LoginString.firebaseDocumentID)
        }
        //fetch User Information
        await firebase.firestore().collection('users').doc(currentUserID).get()
        .then((doc) => {
            if( doc.exists ) {
               userData = doc.data();
            }
            else {
                errorgetUserInfor = "No user found!";
            }
        })
        .catch( error => {
            errorgetUserInfor = error
        })
        //fetch all User Message
        await firebase.firestore().collection("users").get()
        .then( result => {
            if( result.docs.length > 0 ) {
                let listUser = [];
                listUser = [...result.docs];
                listUser.map((item,index) => {
                    if( userData.id !== item.data().id ) {
                        listUsers.push({
                            key: index,
                            dataUser: item.data(),
                            documentKey: item.id
                        })
                    }
                })
            }
            else {
                errorfetchAllFriend = "No friend now!";
            }
        })
        .catch(error => {
            errorfetchAllFriend = error;
        })
        dispatch( action.fetchUserInfor(userData,errorgetUserInfor,listUsers,errorfetchAllFriend) )
    }
}
export const checkUserLogins = (email,password,remember) => {
    return async (dispatch) => {
            var dataUser = "";
            var error = "";
            var checkLogin = false;
        try{
            await firebase.auth().signInWithEmailAndPassword(email.toString(), password.toString())
            .then( async (result) => {
                let user = result.user;
                if( user ) {
                    await firebase.firestore().collection("users")
                    .where("id", "==", user.uid).get()
                    .then((querySnapShot) => {
                        querySnapShot.forEach((doc) => {
                            let currentData = doc.data();
                            if( remember === true ) {
                                localStorage.setItem(LoginString.firebaseDocumentID, doc.id);
                                localStorage.setItem(LoginString.ID, currentData.id);
                                localStorage.setItem(LoginString.name, currentData.name);
                                localStorage.setItem(LoginString.email, currentData.email);
                            }
                            else {
                                sessionStorage.setItem(LoginString.firebaseDocumentID, doc.id);
                                sessionStorage.setItem(LoginString.ID, currentData.id);
                                sessionStorage.setItem(LoginString.name, currentData.name);
                                sessionStorage.setItem(LoginString.email, currentData.email);
                            }
                            dataUser = currentData;
                            checkLogin = true;
                        })
                    })
                    .catch( e => {
                        error = e
                    })
                }
                else {
                    error = "Incorrect username or password. Please check your field again";
                }
            })
            .catch((error) => {
                error = error;
            })
            if( checkLogin === true ) {
                error = "";
            }
            else {
                error = "Incorrect username or password"
            }
        }
        catch( e ) {
            error = e
        }
        dispatch( action.checkLoginUser(checkLogin,dataUser,error) );
    }
}

export const submitRegister = (email,password,name) => {
    return async (dispatch) => {
        var status = false;
        var errorMessage = ""
        try {
            await firebase.auth().createUserWithEmailAndPassword(email.toString(),password.toString())
            .then( async result => {
                await firebase.firestore().collection("users")
                .add({
                    name : name,
                    id: result.user.uid,
                    email,
                    password,
                })
                .then((docRef) => {
                    status = true;
                })
                .catch((error) => {
                    status = false;
                    errorMessage = error.message;
                })
            })
            .catch(error=>{
               status = false;
               errorMessage = error.message;
            });
        }
        catch(error) {
           status = false;
           errorMessage = error;
        };

        dispatch( action.registerUser(status,errorMessage) )
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {
        var status = false;
        var error = "Invalid email";
        try {
            var auth = firebase.auth();
            var emailAddress = email ;
            await auth.sendPasswordResetEmail(emailAddress)
            .then( () => {
                status = true;
            })
            .catch( (err) => {
                
                status = false;
                error = err.message
            });
        }
        catch(error) {
            status = false;
            error = error;
        }
        dispatch( action.sendResetPassword(status,error) );
    }
}
function hashString (string) {
    let hash = 0;
    for ( let i = 0; i< string.length ; i++ ) {
        hash += Math.pow(string.charCodeAt(i) * 31, string.length - i );
        hash = hash & hash;
    }
    return hash;
}
function createGroupchatID ( string1, string2 ) {
    if( (Math.abs(hashString(string1) - hashString(string2) )).toString() === "1154699748" ) {
        return "2108509";
    }
   return (Math.abs(hashString(string1) - hashString(string2) )).toString();
}
function convertToString(value){
    return value.toString()
}
export const fetchAllUserTab = (listUsers,dataUser) => {
    return async (dispatch) => {
        var listMessage = [];
        var userMessage = [];

           for( let i = 0; i< listUsers.length ; i ++ ){
                await firebase.firestore()
                .collection("Message")
                .doc(createGroupchatID(listUsers[i].dataUser.id,dataUser.userData.data.id))
                .get()
                .then( async result => {
                    if (result.exists === true) {  
                        return true;
                    }
                    else {
                        return false
                    }
                })
                .then( async exists => {
                    if( exists === true ) {
                        await firebase.firestore()
                        .collection("Message")
                        .doc(createGroupchatID(listUsers[i].dataUser.id,dataUser.userData.data.id))
                        .collection(createGroupchatID(listUsers[i].dataUser.id,dataUser.userData.data.id))
                        .get()
                        .then( async result => {
                            await result.forEach( item => {
                                userMessage.push(item.data())
                            })
                        })
                        .then( () =>{
                            listMessage.push({
                                conversationWith: listUsers[i].dataUser,
                                messages: userMessage,
                            })
                            userMessage = [];
                        })
                   }
                })
   
            }
            dispatch( action.fetchAllMessage(listMessage) );
    }
}
export const fetchPeerMessage = ( host,peer ) => {
    return async (dispatch) => {
        await firebase.firestore()
        .collection("Message")
        .doc( createGroupchatID(host,peer) )
        .collection( createGroupchatID(host,peer) )
        .onSnapshot( snapShot => {
            let messages = [];
            snapShot.docChanges().forEach( async item => {
                messages.push(item.doc.data())
            })
            dispatch( action.fetchAllMessage(messages) )
        })
    }
}