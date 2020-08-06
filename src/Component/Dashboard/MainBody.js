import React, { Fragment } from 'react';
import ListMessage from './ListMessage';
import WelCome from './Welcome'
import ModifiedMessagePeer from './ButtonOpenModifiedMessage';
import Sticker from './Stickers';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploader from 'react-images-upload';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class MainBody extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showSticker: false,
            snackBarOpen: true,
        }
    }
    onUploadImage = (event) => {
        this.props.onUploadImage(event.target.files[0]);
    }
    render() {
        var renderListMSG = "";
        if( this.props.listMessage.length > 0 ) {
            renderListMSG = <ListMessage 
            currentUserID = { this.props.currentUserID }
            currentPeerUserid = { this.props.currentPeerUser.id }
            listMessage={ this.props.listMessage } />
        }
        return this.props.currentPeerUser ? 
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
                            <input value={ this.props.inpuValue } type="text" onChange = { (e) => { this.props.onChangeInputValue(e.target.value) } } 
                            name="messageInputField" placeholder="Type your message..."/>
                            <div onClick = { () => { this.props.onSendMessage() }} className="divi">
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
}
export default MainBody;