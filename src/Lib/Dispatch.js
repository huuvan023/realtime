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
                        .onSnapshot( Snapshot => {
                            Snapshot.docChanges().forEach( item =>{ 
                                userMessage.push(item.doc.data())

                            })
                            listMessage.push({
                                conversationWith: listUsers[i].dataUser,
                                messages: userMessage,
                                conversationID: createGroupchatID(listUsers[i].dataUser.id,dataUser.userData.data.id)
                            })
                            userMessage = [];
                      
                            
                        })
                   }
                })
   
            }
            dispatch( action.fetchAllMessage(listMessage) );
    }
}
export const fetchPeerMessage = ( userID,item,listMessages ) => {
    
    //console.log("fetch user message")
    return async (dispatch) => {  
       let converID = createGroupchatID(item.dataUser.id,userID)
       dispatch( action.fetchPeerMessages(converID,listMessages,userID,item.dataUser.id) )
    }
}

export const sendMessage = ( infor,content,type ) => {
    return async (dispatch) => {
         
        var listMessage = [];
        var userMessage = [];
        var currentUserID = infor.userID;
        var currentPeerUser = infor.conversationWith;
        if( type === 1 ) {
            
            if( content.trim() === "" ) {
                return 
            }
            var groupChatID = null;
            if( currentUserID && currentPeerUser ) {
                groupChatID = Math.abs(hashString(currentUserID) - hashString(currentPeerUser) ).toString();
            }
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let timestamp = date+' '+time;

            const itemMessage = {
                idFrom: currentUserID,
                idTo: currentPeerUser,
                timestamp: timestamp,
                content: content.trim(),
                type: type
            }
            await firebase.firestore()
            .collection("Message")
            .doc(groupChatID)
            .set({
                lastModified: timestamp
            })
            .then(() => {  })
            .catch( error => alert(error) )


            await firebase.firestore()
                .collection("Message")
                .doc(groupChatID)
                .collection(groupChatID)
                .doc(timestamp)
                .set(itemMessage)
                .then( async result => {
                     
                    await firebase.firestore()
                        .collection("Message")
                        .doc(groupChatID)
                        .collection(groupChatID)
                        .onSnapshot(async (Snapshot) => {
                            console.log("vo dc snapshot")
                            await Snapshot.docChanges().forEach( item =>{ 
                                userMessage.push(item.doc.data())
            
                            })
                            console.log(userMessage)
                            console.log("dispatch ne")
                            
                        })
                    
                })
                


         
             
         

            
            
            
        }
        /*
        else {
            
            let ref = firebase.storage().ref();
            let file = content;
            let metadata = {
                contentTYpe: file.type,
            }
            const task = ref.child(file.name).put(file,metadata);
            task.then( snapshot => snapshot.ref.getDownloadURL() )
            .then( async url => {
                if( this.currentUserID && this.state.currentPeerUser ) {
                    this.groupChatID = Math.abs(this.hashString(this.currentUserID) - this.hashString(this.state.currentPeerUser.id) ).toString();
                }
                let today = new Date();
                let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                let timestamp = date+' '+time;
                const itemMessage = {
                    idFrom: this.currentUserID,
                    idTo: this.state.currentPeerUser.id,
                    timestamp: timestamp,
                    content: url,
                    type: type,
                    seen: false,
                }
                    await firebase.firestore()
                    .collection("Message")
                    .doc(this.groupChatID)
                    .collection(this.groupChatID)
                    .doc(timestamp)
                    .set(itemMessage)
                    .then(() => {
                    });

                    let listMSGArr = [];
                    await firebase.firestore()
                    .collection("Message")
                    .doc(this.groupChatID)
                    .collection(this.groupChatID)
                    .onSnapshot((Snapshot) => {
                        Snapshot.docChanges().forEach((changed) => {
                                listMSGArr.push(changed.doc.data());
                        })
                        this.setState({
                            listMessage: listMSGArr
                        });
                    })
            })
        }*/
        
  
    }
}