import React,{ Fragment } from 'react'
import Sticker from './Stickers';

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
    onSendMessage = () => {
        this.props.onSendMessage(this.state.content,1)
    }
}


export default SendMessage;