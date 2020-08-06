import React from 'react';
import Nav from './../Component/Dashboard/Nav';
import Main from './../Component/Dashboard/Main';
import MainResponsive from './../Component/Dashboard/MainResponsive';
import ResponsiveNav from './../Component/Dashboard/ResponsiveNav';
import firebase from './../Services/Firebase';
import LoginString from './../Lib/LoginString';
import { connect } from 'react-redux';
import { fetchUser } from '../Lib/Dispatch';
import { loadingDashboard } from './../Component/Dashboard/LoadingDashboard';
import { fetchAllUserTab } from './../Lib/Dispatch';

class IndexPage extends React.Component {
    constructor(props) {
        super(props); 
        this.state={
            listUsers: [],
            dataUser: null,




            status:"message",
            toggleMiniMenu: false,
            loading: true,
            openDialogLogout: false,
            currentPeerUser: null,
            displayContactSwitchedNotification:[],
            listUserWillDisplay:[],
            
            viewUsers: null,
            keyWordFilter: "",
            isShowSticker: true,
            inpuValue:"",
            listMessage : [],
            image: {
                file: null,
                imagePreviewUrl: null,
            },
        }
        this.currentUserName = localStorage.getItem(LoginString.name);
        this.currentUserID = localStorage.getItem(LoginString.ID);
        this.currentUserDocumentID = localStorage.getItem(LoginString.firebaseDocumentID);
        this.currentUserMessage = [];
        this.searchUsers = [];
        this.groupChatID = null;
        this.currentPeerUserMessage = [];
        this.removeListener = null;
        
    }
    async componentDidUpdate() {
        if( this.state.currentPeerUser ) {
            await firebase.firestore()
            .collection("users")
            .doc(this.state.currentPeerUser.docID)
            .get()
            .then((docRef) => {
                this.currentPeerUserMessage = docRef.data().message;
            });
        }
    }
    async componentDidMount() {
         
        if( window.innerWidth >= 0 && window.innerWidth <= 450 ){
            this.setState({
                toggleMiniMenu: true,
            });
        }
        window.addEventListener("resize",this.toggleMiniMenu);
        await this.props.onFetchUser(this.props.dataUser);
       
        await this.setState({
            listUsers: this.props.dataUser.listUsers.data,
            dataUser: this.props.dataUser.userData,
            loading: false,
        })
        //console.log(this.state.listUsers)
        await this.props.onFetchAllUserTab( this.state.listUsers, this.props.dataUser );
        //this.getListUser();
    }
  
    /*getListUser = async () => {
        
        const result = await firebase.firestore().collection('users').get();
        if( result.docs.length > 0 ) {
            let listUser = [];
            listUser = [...result.docs];
            listUser.forEach((item,index)   => {
                this.searchUsers.push({
                    key: index,
                    documentKey: item.id,
                    id: item.data().id,
                    name: item.data().name,
                    message: item.data().message,
                    URL: item.data().URL,
                })
            })
            
            this.onRenderListUser();
            this.setState({
                loading: false,
            })
        }
    }
    onRenderListUser = () => {
        if( this.searchUsers.length > 0 ) {
            let viewUsers = [];
            this.searchUsers.map((item) => {
                if( item.id !== this.currentUserID ) {
                    viewUsers.push({
                        id: item.id,
                        name: item.name
                    })
                }
            })
            this.setState({
                viewUsers: viewUsers
            })
            
        }
    }*/
    
    
    toggleMiniMenu = () => {
        if( window.innerWidth >= 0 && window.innerWidth <= 450 ){
            this.setState({
                toggleMiniMenu: true,
            });
        }
        else {
            this.setState({
                toggleMiniMenu: false,
            });
        }
    }

    onsetCurrentPeer = async (item) => {
        if( this.state.currentPeerUser === null || this.state.currentPeerUser !== item ) {
            let docID = null;
            await firebase.firestore().collection("users")
            .where("id", "==", item.id).get()
            .then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    docID = doc.id;
                });
            })
            .catch((error) => {
                window.alert( error);
            })
            if( docID !== null ) {
                item["docID"] = docID;
                this.setState({
                    currentPeerUser : item,
                });
            }
            if( this.currentUserID && this.state.currentPeerUser ) {
                this.groupChatID = Math.abs(this.hashString(this.currentUserID) - this.hashString(this.state.currentPeerUser.id) ).toString();
            }

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
        }
    }
    onFilterUser = (value) => {
        this.setState({
            keyWordFilter : value,
        });
    }
    onSendMessage = async ( content,type ) => {
        //type 0 text, 1 images, 2 sticker
        if( type !== 1 ) {
            if( content.trim() === "" ) {
                return 
            }
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
                content: content.trim(),
                type: type
            }
            await firebase.firestore()
            .collection("Message")
            .doc(this.groupChatID)
            .set({
                lastModified: timestamp
            })
            .then(() => {  })
            .catch( error => alert(error) )

            await firebase.firestore()
            .collection("Message")
            .doc(this.groupChatID)
            .collection(this.groupChatID)
            .doc(timestamp)
            .set(itemMessage)
            .then(() => {
                this.setState({
                    inpuValue:"",
                });
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
        }
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
        }
        
  
    }
    onKeyboardPress = (event) => {
       
            //this.onSendMessage(this.state.inpuValue, 0);
        
    }
    onChangeInputValue = (value) => {
        this.setState({
            inpuValue: value
        })
    }
    onSendSticker = (a,b) => {
        this.onSendMessage(a.src,b);
    }
    onSendMessageClick = () => {
        this.onSendMessage(this.state.inpuValue, 0);
    }
    onRenderListMessage = () => {
        return ( <div>das</div> )
    }
    onLogOut = () => {
        firebase.auth().signOut();
        this.props.history.push("/");
        localStorage.clear();     
    }
    onGetListHistoryMSG = () => {
        this.listMessage.length = 0;
        if( this.currentUserID && this.state.currentPeerUser ) {
            this.groupChatID = Math.abs(this.hashString(this.currentUserID) - this.hashString(this.state.currentPeerUser.id) )
        }
        //get history and new listener were added
        this.removeListener = firebase.firestore()
        .collection("Message")
        .doc(this.groupChatID)
        .collection(this.groupChatID)
        .onSnapshot((Snapshot) => {
            Snapshot.docChanges().forEach((changed) => {
                if( changed.type === "added" ) {
                    this.listMessage.push(changed.doc.data());
                }
            })
        })
        .catch((err) =>  { window.alert(err) })
    }
    onUploadImage = (e) => {
        this.onSendMessage(e,1);
    }
    hashString = (string) => {
        let hash = 0;
        for ( let i = 0; i< string.length ; i++ ) {
            hash += Math.pow(string.charCodeAt(i) * 31, string.length - i );
            hash = hash & hash;
        }
        return hash;
    }
    onSayHi = () => {
        this.onSendMessage("sayHi.gif",2)
    }
    render(){ 
         
        //filter username
        var viewUsers = this.state.listUsers;
        if( viewUsers.length > 0 ) {
            if( this.state.keyWordFilter !== "" ) {
                viewUsers = viewUsers.filter((item) => {
                    let name = item.dataUser.name.toString().toLowerCase();
                    return name.indexOf(this.state.keyWordFilter.toLowerCase()) >= 0;
                });
            }
        }

        var height = window.innerHeight;
        return this.state.loading === true ? 
        ( loadingDashboard() )
        :
        ( <div style={{ "height": height*(99.9/100) }} className="container-wrap">
                <nav  className="navMenu">
                    <Nav history = { this.props.history } status = { this.state.status } onChangDPLStatus = { this.onChangDPLStatus } />
                    <ResponsiveNav/>
                </nav>
                { !this.state.toggleMiniMenu ?
                <Main onsetCurrentPeer = { this.onsetCurrentPeer } 
                currentPeerUser = { this.state.currentPeerUser }
                onFilterUser = { this.onFilterUser } 
                currentUserName = { this.currentUserName }
                viewUsers = { viewUsers } 
                height = { height }
                dataUser = { this.state.dataUser !== null ? this.state.dataUser : "" }
                status = { this.state.status }
                onUploadImage = { this.onUploadImage }
                currentUserID = { this.currentUserID }
                onSayHi = { this.onSayHi }
                onSendMessage = { this.onSendMessageClick }
                listMessage = { this.state.listMessage }
                status = { this.state.status }
                inpuValue = { this.state.inpuValue}
                onRenderListMessage = { this.onRenderListMessage }
                onChangeInputValue = { this.onChangeInputValue }
                history = { this.props.history } 
                onSendSticker = { this.onSendSticker }
                stringMess = { this.state.stringMess } /> : <MainResponsive/> }
            </div>
        );
    }
    onChangDPLStatus = (status) => {
        this.setState({
            status: status,
        });
    }
    onTest = () => {
        this.groupChatID = Math.abs(this.hashString(this.currentUserID) - this.hashString(this.state.currentPeerUser.id) ).toString();
        firebase.firestore()
        .collection("Message")
        .doc(this.groupChatID)
        .collection(this.groupChatID)
        .onSnapshot((Snapshot) => {
            Snapshot.docChanges().forEach((changed) => {
                this.setState({
                    listMessage: changed.doc.data() 
                });
            })
        })
    }
}

const mapStateToProps = ( state ) => {
    return {
        dataUser: state.user,
        messages: state.messages
    }
}
const mapDispatchToProps = ( dispatch, props ) => {
    return {
        onFetchUser : async (user) => {
            await dispatch( fetchUser(user) );
        },
        onFetchAllUserTab: async (listUsers,dataUser) => {
            await dispatch(fetchAllUserTab( listUsers,dataUser ))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(IndexPage);