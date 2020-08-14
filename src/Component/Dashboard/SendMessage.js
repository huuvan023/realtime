import React,{ Fragment } from 'react'
import Sticker from './Stickers';
import { connect } from 'react-redux'
import { sendMessage } from './../../Lib/Dispatch'

class SendMessage extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            showSticker: false,
            content:""
        }
    }
    render(){
        return(
            <Fragment>
                 <div className="mainbd-ft">
                    <div className="mainbd-ft-bd">
                        <div className="ic-sugg-mainbd">
                            { this.state.showSticker ? <Sticker onSendSticker = {  this.props.onSendSticker  } /> : "" }
                            <div>
                                <label htmlFor="upload-file-img">
                                <i style={{"cursor":"pointer"}} id="img"  className="far fa-images"></i>
                                </label>
                                <input style={{"display":"none"}} 
                                type="file" onChange={ this.onUploadImage }
                                id="upload-file-img" name="upload-file-img"/>
                            </div>
                            <i id="icon" onClick={ () => { this.setState({ showSticker : !this.state.showSticker }) } } 
                            className="far fa-smile ml-3"></i>
                        </div>
                        <div className="bd-field-mainbd">
                            <input value={ this.state.content } type="text" 
                            onChange = { (e) => this.setState({ content: e.target.value }) } 
                            name="messageInputField" placeholder="Type your message..."/>
                            <div onClick = { this.onSendMessage } 
                            className="divi">
                            <i className="fas fa-paper-plane"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
    onSendMessage = (currentUser,currentPeer) => {
        this.props.onSendMessage(this.state.content,this.props.currentUser,this.props.currentPeerUser,1)
    }
}
const mapDispatchToProps = (dispatch,props) => {
    return {
        onSendMessage: (a,b,c,d) => {
            dispatch(sendMessage(a,b,c,d))
        }
    }
}
export default connect(null,null)(SendMessage);