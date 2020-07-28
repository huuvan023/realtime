import React from 'react';
import Nav from './../Component/Dashboard/Nav';
import Main from './../Component/Dashboard/Main';
import MainResponsive from './../Component/Dashboard/MainResponsive';
import ResponsiveNav from './../Component/Dashboard/ResponsiveNav';
import firebase from './../Services/Firebase';
import LoginString from './../Lib/LoginString';

class IndexPage extends React.Component {
    constructor(props) {
        super(props); 
        this.state={
            stringMess:"ZaloPay - Ứng dụng thanh toán di động, chuyển-nhận tiền nhanh, an toàn theo tiêu Chuẩn Quốc Tế PCI-DSS.",
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
    componentDidMount() {
        if( window.innerWidth >= 0 && window.innerWidth <= 450 ){
            this.setState({
                toggleMiniMenu: true,
            });
        }
        window.addEventListener("resize",this.toggleMiniMenu);
        firebase.firestore().collection('users').doc(this.currentUserDocumentID).get()
        .then((doc) => {
            doc.data().message.map((item) => {
                this.currentUserMessage.push({
                    notificationId: item.notificationId,
                    number: item.number
                });
            });
            this.setState({
                displayContactSwitchedNotification : this.currentUserMessage,
            });
        })
        this.getListUser();
    }
    getListUser = async () => {
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
    }
    /*
    onRenderClassNameUserNotification = ( itemID ) => {
        let number = 0;
        let classname = "";
        let check = false;
        if( this.state.currentPeerUser && this.state.currentPeerUser.id === itemID ) {
            classname = "chatUserActive";
        }
        else {
            this.state.displayContactSwitchedNotification.forEach((item) => {
                if( item.notificationId.length > 0 ) {
                    if( item.notificationId === itemID ) {
                        check = true;
                        number = item.number;
                    }
                }
            })
            if( check === true ) {
                classname="viewWrapItemNotification";
            }
            else {
                classname="";
            }
        }
        return classname;
    }
    */
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
        //type 0 text, 1 images, 0 sticker
        if( content.trim() === "" ) {
            return 
        }
        if( this.currentUserID && this.state.currentPeerUser ) {
            this.groupChatID = Math.abs(this.hashString(this.currentUserID) - this.hashString(this.state.currentPeerUser.id) ).toString();
        }
        const time = new Date();
        var timestamp = time.toISOString()
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
                console.log("vo dc snapshot")
                    listMSGArr.push(changed.doc.data());
            })
            this.setState({
                listMessage: listMSGArr
            });
        })
        
        
        /*
        this.currentPeerUserMessage.map((item) => {
            if( item.notificationId !== this.currentUserID ) {
                notificationMessages.push({
                    notificationId: item.notificationId,
                    number: item.number,
                });
            }
        })
        firebase.firestore()
        .collection("users")
        .doc(this.state.currentPeerUser.docID)
        .update({
            message: notificationMessages
        })
        .then((data) => {})
        .catch((error) => {
            window.alert(error);
        })*/
    }
    onKeyboardPress = (event) => {
       
            //this.onSendMessage(this.state.inpuValue, 0);
        
    }
    onChangeInputValue = (value) => {
        this.setState({
            inpuValue: value
        })
    }
    onSendMessageClick = () => {
        this.onSendMessage(this.state.inpuValue, 0);
    }
    onRenderListMessage = () => {
        /*
        if ( this.state.listMessage.length > 0 ) {
            let viewListMessage = [];
            this.listMessage.forEach((item,index) => {

                if( item.idFrom === this.currentUserID ) {
                    if( item.type === 0 ) {
                        viewListMessage.push({
                            sender: this.currentUserID,
                            key: item.timestamp,
                            content: item.content
                        })
                    }
                }
                else {
                    if( item.type === 0 ) {
                        viewListMessage.push({
                            sender: this.state.currentPeerUser.id,
                            key: item.timestamp,
                            content: item.content
                        })
                    }
                }

            })
            return viewListMessage;
        }*/
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
    hashString = (string) => {
        let hash = 0;
        for ( let i = 0; i< string.length ; i++ ) {
            hash += Math.pow(string.charCodeAt(i) * 31, string.length - i );
            hash = hash & hash;
        }
        return hash;
    }
    onOpenListSticker = () => {
        console.log("Show ticker!")
    }
    render(){
        //console.log(this.state.listMessage)
        var viewUsers = this.state.viewUsers;
        if( this.state.keyWordFilter !== "" ) {
            viewUsers = viewUsers.filter((item) => {
                let name = item.name.toString().toLowerCase();
                return name.indexOf(this.state.keyWordFilter.toLowerCase()) >= 0;
            });
        }
        var height = window.innerHeight;
        return this.state.loading === true ? 
        (<div>Loading</div>)
        :
        ( <div style={{ "height": height*(99.9/100) }} className="container-wrap">
                <nav  className="navMenu">
                    <Nav history = { this.props.history } />
                    <ResponsiveNav/>
                </nav>
                { !this.state.toggleMiniMenu ?
                <Main onsetCurrentPeer = { this.onsetCurrentPeer } 
                currentPeerUser = { this.state.currentPeerUser }
                onFilterUser = { this.onFilterUser } 
                currentUserName = { this.currentUserName }
                viewUsers = { viewUsers } 
                onTest = { this.onTest }
                height = { height }
                currentUserID = { this.currentUserID }
                onSendMessage = { this.onSendMessageClick }
                onLogOut = { this.onLogOut } 
                listMessage = { this.state.listMessage }
                inpuValue = { this.state.inpuValue}
                onRenderListMessage = { this.onRenderListMessage }
                onOpenListSticker = { this.onOpenListSticker }
                onChangeInputValue = { this.onChangeInputValue }
                history = { this.props.history } 
                stringMess = { this.state.stringMess } /> : <MainResponsive/> }
            </div>
        );
    }
    onTest = () => {
        //this.groupChatID = Math.abs( this.hashString(this.currentUserID) - this.hashString(this.state.currentPeerUser.id) )
        /*console.log(parseInt(this.groupChatID))
        firebase.firestore()
        .collection("Message")
        .doc("das")
        .get()
        .then((doc) => { 
            if( doc.exists ) {
                console.log("co xuat hien");
            }
            else {
                console.log("Doc ko co")
            }
         }).catch(function(error) {
            console.log("Error getting document:", error);
        });*/
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
export default IndexPage;