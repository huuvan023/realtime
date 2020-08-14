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
import { fetchAllUserTab,sendMessage,fetchPeerMessage,fetchMessage } from './../Lib/Dispatch';

class IndexPage extends React.Component {
    constructor(props) {
        super(props); 
        this.state={
            listUsers: [],
            dataUser: null,
            inpuValue:"",
            
            currentPeerUser: null,
            currentUser: null,

            status:"message",
            toggleMiniMenu: false,
            loading: true,
            openDialogLogout: false,
            displayContactSwitchedNotification:[],
            listUserWillDisplay:[],
            
            viewUsers: null,
            keyWordFilter: "",
            isShowSticker: true,
            
            listMessage : [],
            image: {
                file: null,
                imagePreviewUrl: null,
            },
        }
        this.onSendMessage = this.onSendMessage.bind(this)
        this.listMessages = []
        this.groupChatID = null;


        this.currentUserName = localStorage.getItem(LoginString.name);
        this.currentUserID = localStorage.getItem(LoginString.ID);
        this.currentUserDocumentID = localStorage.getItem(LoginString.firebaseDocumentID);
        this.currentUserMessage = [];
        this.searchUsers = [];
        
        this.currentPeerUserMessage = [];
        this.removeListener = null;
        console.log("constructor")
        
    }
    async componentWillReceiveProps(nextProps) {
         
    }
    
    async componentDidUpdate() {
        
         
            //console.log("did update")
        
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
            
        })
        
    //..................
        
        //console.log(this.state.listUsers)
        //await this.props.onFetchAllUserTab( this.state.listUsers, this.props.dataUser );
        this.setState({
            loading: false,
        })
    }
  
 
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

 
    onFilterUser = (value) => {
        this.setState({
            keyWordFilter : value,
        });
    }
    sendMessage = async () => {

    }
    async onSendMessage (content,currentUser,currentPeerUser,type){
        //console.log(currentUser,currentPeerUser)
        var currentUserID = currentUser.id;
        var currentPeerUserID = currentPeerUser.id;
        
        var groupChatID = "";
        //type 0 text, 1 images, 2 sticker
        if( type === 1 ) {
            if( content === "" ) {
                return 
            }
            if( currentUserID && currentPeerUserID ) {
                groupChatID = Math.abs(this.hashString(currentPeerUserID) -this.hashString(currentUserID) ).toString();
                
            }
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let timestamp = date+' '+time;

            const itemMessage = {
                idFrom: currentUserID,
                idTo: currentPeerUserID,
                timestamp: timestamp,
                content: content,
                type: 1
            }
            await firebase.firestore()
            .collection("Message")
            .doc(groupChatID)
            .set({
                lastModified: timestamp
            })
            .then(() => { /*console.log("sended !")*/  })
            .catch( error => alert(error) )

            await firebase.firestore()
            .collection("Message")
            .doc(groupChatID)
            .collection(groupChatID)
            .doc(timestamp)
            .set(itemMessage)
            .then(() => {
                //console.log("sended 2 !")
                 
            });
            /*
            let listMSGArr = [];
            await firebase.firestore()
            .collection("Message")
            .doc(groupChatID)
            .collection(groupChatID)
            .onSnapshot((Snapshot) => {
                Snapshot.docChanges().forEach((changed) => {
                        listMSGArr.push(changed.doc.data());
                })
                this.setState({
                    listMessage: listMSGArr
                });
            })
*/
        }
        
        
    }
    onChangeInputValue = (value) => {
        this.setState({
            inpuValue: value.target.value
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
    fetchPeerMessage = async (user) => {
        await this.setState({
            currentPeerUser: user.dataUser,
            currentUser: this.props.dataUser.userData.data
        })
        await this.props.onFetchMessagse(this.state.currentPeerUser.id,this.state.currentUser.id);
        console.log(this.props.messages)
        /*console.log(this.props.peerUser , this.state.dataUser)
        if( user === null || this.props.dataUser !== user ) {
            let docID = null;
            await firebase.firestore().collection("users")
            .where("id", "==", user.dataUser.id).get()
            .then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    docID = doc.id;
                });
                //console.log(docID)
            })
            .catch((error) => {
                window.alert( error);
            })
            this.setState({
                currentPeerUser: user.dataUser,
                currentUser: this.props.dataUser.userData.data
            })
             
                this.groupChatID = Math.abs(this.hashString(user.dataUser.id) - this.hashString(this.props.dataUser.userData.data.id) ).toString();
            //console.log(this.groupChatID)
            let listMSGArr = [];
            await firebase.firestore()
            .collection("Message")
            .doc(this.groupChatID)
            .collection(this.groupChatID)
            .onSnapshot((Snapshot) => {
               // console.log("Snapshot current peer")
                Snapshot.docChanges().forEach((changed) => {
                        listMSGArr.push(changed.doc.data());
                })
                this.setState({
                    listMessage: listMSGArr
                });
            })
        }*/
    }
    render(){ 
        console.log(this.props.messages)
       //console.log(this.state.currentPeerUser,this.state.currentUser)
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
        ( <div   className="container-wrap">
                <nav  className="navMenu">
                    <Nav history = { this.props.history } status = { this.state.status } onChangDPLStatus = { this.onChangDPLStatus } />
                    <ResponsiveNav/>
                </nav>
                { !this.state.toggleMiniMenu ?
                <Main onsetCurrentPeer = { this.onsetCurrentPeer } 
                listMessages = { this.listMessages }
                onFetchPeerMessage = { this.onFetchPeerMessage }
                currentPeerUser = { this.state.currentPeerUser }
                currentUser = { this.state.currentUser }
                fetchPeerMessage = { this.fetchPeerMessage }
                listMessage = { this.props.messages }
                sendMessage = { this.sendMessage }


                onFilterUser = { this.onFilterUser } 
                currentUserName = { this.currentUserName }
                viewUsers = { viewUsers } 
                height = { height }
                dataUser = { this.state.dataUser !== null ? this.state.dataUser : "" }
                status = { this.state.status }
                onUploadImage = { this.onUploadImage }
                currentUserID = { this.currentUserID }
                onSayHi = { this.onSayHi }
                onSendMessage = { this.onSendMessage }
                 
                
                status = { this.state.status }
                inpuValue = { this.state.inpuValue}
                onRenderListMessage = { this.onRenderListMessage }
                onChangeInputValue = { this.onChangeInputValue }
                history = { this.props.history } 
                onSendSticker = { this.onSendSticker }
                stringMess = { this.state.stringMess } /> 
                : 
                <MainResponsive/> }
            </div>
        );
    }
    onChangDPLStatus = (status) => {
        this.setState({
            status: status,
        });
    }
    onFetchPeerMessage = async (userID,item,messages) => {
        
        await this.props.onFetchPeerMessages(userID,item,messages)
        await this.setState({
            currentUser: this.props.peerMessages.userID,
            currentPeerUser: this.props.peerMessages.conversationWith,
        })
        this.listMessages = this.props.peerMessages.messages
        console.log("vo dc sau fetch ",this.listMessages)
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
        peerUser: state.peerUser,
        messages: state.messages,
        peerMessages: state.peerMessage,
    }
}
const mapDispatchToProps = ( dispatch, props ) => {
    return {
        onFetchUser : async (user) => {
            await dispatch( fetchUser(user) );
        },
        onFetchAllUserTab: async (listUsers,dataUser) => {
            await dispatch(fetchAllUserTab( listUsers,dataUser ))
        },
        onSendMessage: async (infor,vl,type) => {
            await dispatch(sendMessage(infor,vl,type))
        },
        onFetchPeerMessages: async (userID,item,listMessages) => {
            await dispatch(fetchPeerMessage( userID,item,listMessages ))
        }
        ,
        onFetchMessagse: (peerID,userID) => {
            //console.log(" dispatch msg")
            dispatch( fetchMessage(peerID,userID) )
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(IndexPage);