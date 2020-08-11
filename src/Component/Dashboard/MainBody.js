import React, { Fragment } from 'react';
import ListMessage from './ListMessage';
import WelCome from './Welcome'
import ModifiedMessagePeer from './ButtonOpenModifiedMessage';
import Sticker from './Stickers';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { sendMessage } from './../../Lib/Dispatch'
import firebase from './../../Services/Firebase'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class MainBody extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showSticker: false,
            content: "",
            snackBarOpen: true,
        }
    }
    onUploadImage = (event) => {
        this.props.onUploadImage(event.target.files[0]);
    }
    componentDidUpdate(){
        //console.log(this.props.peerMessages)
    }
    /*async componentDidMount(){
        if( this.props.currentUserID && this.props.currentPeerUser ) {
            var groupChatID = Math.abs(this.hashString(this.state.currentUser) -this.hashString(this.state.currentPeerUser) ).toString();
          
            let listMSGArr = [];
                await firebase.firestore()
                .collection("Message")
                .doc(groupChatID)
                .collection(groupChatID)
                .onSnapshot((Snapshot) => {
                    Snapshot.docChanges().forEach((changed) => {
                            listMSGArr.push(changed.doc.data());
                    })
                     console.log(listMSGArr)
                })

            }
    }*/
    
    render() {
        console.log(this.props.currentUser,this.props.currentPeerUser)
        var renderListMSG = "";

        if( typeof this.props.peerMessages.messages !== "undefined" ) {
            renderListMSG = <ListMessage 
             
            currentUserID = { this.props.currentUser }
            currentPeerUserid = { this.props.currentPeerUser }
            listMessages ={ this.props.listMessages } />
        }

        return this.props.peerMessages.messages  ? 
        (
            
            <Fragment>
                <div className="mainbd-head" style = {{ "height": this.props.offSetHeight }}>
                    <img src="./avt.jpg" alt="" />
                    <div className="mainbd-h-inf">
                        <h4>{ this.props.currentPeerUser !== null ? this.props.currentPeerUser.name : "" }</h4>
                        <p>Đang online<span id="onlCir"></span></p>
                    </div>
                    <div className="mainbd-h-opt">
                        <div className="div3">
                            <i style={{ "marginRight":"10px" }} className="fas fa-video"></i>
                            { /*<Snackbar open={ this.state.snackBarOpen } autoHideDuration={30000} onClose={() => { this.setState({ snackBarOpen : false }) }}>
                            <Alert severity="success">
                                This is a success message!
                            </Alert>
                            </Snackbar> */ }
                            <ModifiedMessagePeer/></div>
                    </div>
                </div>
                <div style= {{ "height":this.props.height - 60 - this.props.offSetHeight  }} className="wrapMessbdWrap">
                    <div className="scrollbar wrapMessbd scrollbar-juicy-peach mx-auto ">
                        <div className="mainbd-body">
                            <div onClick={ () => this.props.onSayHi() } className = "sayHi-msg">
                                <img src="./sayHi.gif" alt=""/>
                                Vẫy tay chào nào!
                            </div>
                            { renderListMSG }

                        </div>
                    </div>
                </div>

                <div style={{"height": 60 }} className="mainbd-ft">
                    <div className="mainbd-ft-bd">
                        <div onClick = { () => { this.props.onOpenListSticker() } } className="ic-sugg-mainbd">
                            { this.state.showSticker ? <Sticker onSendSticker = {  this.props.onSendSticker  } /> : "" }
                            <div>
                                <label htmlFor="upload-file-img">
                                <i style={{"cursor":"pointer"}} id="img"  className="far fa-images"></i>
                                </label>
                                <input style={{"display":"none"}} 
                                type="file" onChange={ this.onUploadImage }
                                id="upload-file-img" name="upload-file-img"/>
                            </div>
                            <i id="icon" onClick={ () => { this.setState({ showSticker : !this.state.showSticker }) } } className="far fa-smile ml-3"></i>
                        </div>
                        <div className="bd-field-mainbd">
                            <input value={ this.props.inpuValue } type="text" onChange = { this.onChangeInputValue } 
                            name="messageInputField" placeholder="Type your message..."/>
                            <div onClick = { this.onSendMessage } className="divi">
                            <i className="fas fa-paper-plane"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
        :
        (
            <WelCome/>
        )
    }
    onChangeInputValue = (e) => {
        this.props.onChangeInputValue(e);
    }
    onSendMessage =  () => {
        
        this.props.onSendMessage()
        
    }
}
const mapStateToProps = state => {
    return { 
        peerMessages: state.peerMessage,
        dataUser: state.user,
    }
}
export default  connect(mapStateToProps,null)(MainBody);