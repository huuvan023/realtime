import React from 'react';
import Nav from './../Component/Dashboard/Nav';
import Main from './../Component/Dashboard/Main';
import SendMessage from './../Component/Dashboard/SendMessage'
import firebase from './../Services/Firebase';
import { connect } from 'react-redux';
import { fetchUser } from '../Lib/Dispatch';
import { loadingDashboard } from './../Component/Dashboard/LoadingDashboard';
import Toast from 'light-toast';

class IndexPage extends React.Component {
    constructor(props) {
        super(props); 
        this.state={
            listUsers: [],
            dataUser: null,
            inpuValue:"",
            currentPeerUser: null,
            listMessages: [],
            content:"",
            showSticker: false,
            status:"message",
            loading: true,
            keyWordFilter: "",


            image: {
                file: null,
                imagePreviewUrl: null,
            },
        }
        this.currentUser = null;
        this.groupChatID = null;
        
    }
    async componentDidMount() {
        await this.props.onFetchUser(this.props.dataUser);
       
        await this.setState({
            listUsers: this.props.dataUser.listUsers.data,
            dataUser: this.props.dataUser.userData,
        })
        this.currentUser = this.props.dataUser.userData.data;
         
        this.setState({
            loading: false,
        })
    }
  

    onShowSticker = () => {
        this.setState({
            showSticker: !this.state.showSticker
        })
    }
    onFilterUser = (value) => {
        this.setState({
            keyWordFilter : value,
        });
    }
    sendMessage = async (type,item) => { 
        let {content} = this.state;
        if( this.currentUser && this.state.currentPeerUser.id !== this.currentUser.id  ) {
            switch( type ) {
                case 1:
                    if( content === "" ) return;
                    Toast.loading("Loading")
                    let today = new Date();
                    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    let timestamp = date+' '+time;

                    const itemMessage = {
                        idFrom: this.currentUser.id ,
                        idTo: this.state.currentPeerUser.id,
                        timestamp: timestamp,
                        content: content,
                        type: 1
                    }
                    await firebase.firestore()
                    .collection("Message")
                    .doc(this.groupChatID)
                    .set({
                        lastModified: timestamp
                    })
                    .then(() => { })
                    .catch( error => alert(error) )

                    await firebase.firestore()
                    .collection("Message")
                    .doc(this.groupChatID)
                    .collection(this.groupChatID)
                    .doc(timestamp)
                    .set(itemMessage)
                    .then(async () => {
                        await this.setState({
                            content:""
                        })
                        Toast.hide();
                    });
                    break
                case 2:
                    console.log("case 2",item)
                    Toast.loading("Loading")
                    let today1 = new Date();
                    let date1 = today1.getFullYear()+'-'+(today1.getMonth()+1)+'-'+today1.getDate();
                    let time1 = today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();
                    let timestamp1 = date1+' '+time1;
                    var itemMessage1 = null;
                    if( item === "./sayHi.gif" ) {
                            itemMessage1 = {
                            idFrom: this.currentUser.id ,
                            idTo: this.state.currentPeerUser.id,
                            timestamp: timestamp1,
                            content: "./sayHi.gif",
                            name: "Hello",
                            type: 2
                        }
                    }
                    else {
                            itemMessage1 = {
                            idFrom: this.currentUser.id ,
                            idTo: this.state.currentPeerUser.id,
                            timestamp: timestamp1,
                            content: item.src,
                            name: item.name,
                            type: 2
                        }
                    }
                    await firebase.firestore()
                    .collection("Message")
                    .doc(this.groupChatID)
                    .set({
                        lastModified: timestamp1
                    })
                    .then(() => { })
                    .catch( error => alert(error) )

                    await firebase.firestore()
                    .collection("Message")
                    .doc(this.groupChatID)
                    .collection(this.groupChatID)
                    .doc(timestamp1)
                    .set(itemMessage1)
                    .then( async () => {
                        await this.setState({
                            showSticker: false
                        })
                        Toast.hide();
                    });
                    break;
                case 0:
                    Toast.loading("Loading")
                    let ref = firebase.storage().ref();
                    let file = item;
                    let metadata = {
                        contentTYpe: file.type,
                    }
                    console.log(file)
                    const task = ref.child(file.name).put(file,metadata);
                    task.then( snapshot => snapshot.ref.getDownloadURL() )
                    .then( async url => {
                        let today2 = new Date();
                        let date2 = today2.getFullYear()+'-'+(today2.getMonth()+1)+'-'+today2.getDate();
                        let time2 = today2.getHours() + ":" + today2.getMinutes() + ":" + today2.getSeconds();
                        let timestamp2 = date2+' '+time2;
                        const itemMessage2 = {
                            idFrom: this.currentUser.id ,
                            idTo: this.state.currentPeerUser.id,
                            timestamp: timestamp2,
                            content: url,
                            type: type,
                        }
                            await firebase.firestore()
                            .collection("Message")
                            .doc(this.groupChatID)
                            .collection(this.groupChatID)
                            .doc(timestamp2)
                            .set(itemMessage2)
                            .then(() => {Toast.hide();});
                    })
                    break;
            }
            
        }
    }
    hashString = (string) => {
        let hash = 0;
        for ( let i = 0; i< string.length ; i++ ) {
            hash += Math.pow(string.charCodeAt(i) * 31, string.length - i );
            hash = hash & hash;
        }
        return hash;
    }
    render(){ 
        //console.log(this.props.dataUser)
        //filter username
        var viewUsers = this.state.listUsers;
        if( viewUsers.length > 0 ) {
            
            if( this.state.keyWordFilter !== ""  && this.state.status === "message") {
                viewUsers = viewUsers.filter((item) => {
                    let name = item.dataUser.name.toString().toLowerCase();
                    return name.indexOf(this.state.keyWordFilter.toLowerCase()) >= 0;
                });
            }
        }


        return this.state.loading === true ? 
        ( loadingDashboard() )
        :
        ( <div   className="container-wrap">
                <nav  className="navMenu">
                <Nav history = { this.props.history } 
                status = { this.state.status } 
                onChangDPLStatus = { this.onChangDPLStatus } />
                </nav>
                <Main
                listMessages = { this.state.listMessages }
                listUsers = { viewUsers.length > 0 ? viewUsers : [] }
                currentPeerUser = { this.state.currentPeerUser }
                currentUser = { this.currentUser }
                onFilterUser = { this.onFilterUser }
                onSendMessage = { this.sendMessage }
                content = { this.state.content }
                status = { this.state.status } 
                fetchPeerMessage = { this.fetchPeerMessage }>
                    { this.state.currentPeerUser ? 
                    <SendMessage
                    showSticker = { this.state.showSticker }
                    onShowSticker = { this.onShowSticker }
                    onChangeInput = { this.onChangeInput }
                    content = { this.state.content }
                    onSendMessage = { this.sendMessage } />
                    : ""
                    }
                    
                </Main>
            </div>
        );
    }
    onChangeInput = (value,name) => {
        this.setState({
            content: value
        })
    }
    onChangDPLStatus = (status) => {
        this.setState({
            status: status,
        });
    }
    fetchPeerMessage = async (item) => {
        await this.setState({
            currentPeerUser: item.dataUser,
            loading: true,
        });
        if( this.currentUser && item.dataUser.id !== this.currentUser.id  ) {
            this.groupChatID = Math.abs(this.hashString(item.dataUser.id) - this.hashString(this.currentUser.id ) ).toString();
            let listMessages = [];
            await firebase.firestore()
            .collection("Message")
            .doc(this.groupChatID)
            .collection(this.groupChatID)
            .onSnapshot(async (Snapshot) => {
               
                await Snapshot.docChanges().forEach((changed) => {
                    listMessages.push(changed.doc.data());
                  
                })
                listMessages.sort(function (a,b){ return Date.parse(a.timestamp) - Date.parse(b.timestamp)})
                
                this.setState({
                    listMessages: listMessages,
                    loading: false
                })
            })
        }
        
    }
}

const mapStateToProps = ( state ) => {
    return {
        dataUser: state.user,
    }
}
const mapDispatchToProps = ( dispatch, props ) => {
    return {
        onFetchUser : async (user) => {
            await dispatch( fetchUser(user) );
        },
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(IndexPage);