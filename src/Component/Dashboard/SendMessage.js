import React,{ Fragment } from 'react'
import Sticker from './Stickers';
import Toast from 'light-toast';

class SendMessage extends React.Component{
    render(){
       
        return(
            <Fragment>
                 <div className="mainbd-ft">
                    <div className="mainbd-ft-bd">
                        <div className="ic-sugg-mainbd">
                            { this.props.showSticker ? <Sticker onSendSticker = {  this.onSendSticker  } /> : "" }
                            <div>
                                <label htmlFor="upload-file-img">
                                <i style={{"cursor":"pointer"}} id="img"  className="far fa-images"></i>
                                </label>
                                <input style={{"display":"none"}} 
                                type="file" onChange={ this.onUploadImage }
                                id="upload-file-img" name="upload-file-img"/>
                            </div>
                            <i id="icon" onClick={ () => { this.props.onShowSticker() } } 
                            className="far fa-smile ml-3"></i>
                        </div>
                        <div className="bd-field-mainbd">
                            <input value={ this.props.content } type="text" 
                            onChange = { (e) => this.props.onChangeInput(e.target.value,e.target.name) } 
                            onKeyUp = { this.onEnterSend }
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
    onEnterSend = (e) => {
        if( e.keyCode === 13 ) {
            this.props.onSendMessage(1)
        }
    }
    onSendMessage = () => {
        this.props.onSendMessage(1)
    }
    onSendSticker = (object,type) => {
        this.props.onSendMessage(type,object)
    }
    onUploadImage = (e) => {
        var file = e.target.files[0];
        if( file ) {
            var error = false
            if(file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg") {
                if( file.size > 2000000 ) {
                    error = true;
                    Toast.fail("Image too large!",1000);
                }
                else {
                    error = false
                }
            }
            else {
                error = true;
                Toast.fail("Image not valid!",1000);
            }
        }
        else {
            error = true;
            Toast.fail("No image select!",1000);
        }
        if ( error === false ) {
            this.props.onSendMessage(0,file)
        }
        
    } 
}


export default SendMessage;