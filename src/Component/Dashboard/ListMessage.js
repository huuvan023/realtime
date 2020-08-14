import React, { Fragment } from 'react'
import DialogDeleteMessage from './DialogDeleteMessage'
import { connect } from 'react-redux'
import firebase from './../../Services/Firebase'

class Avatar extends React.Component {
    render(){
        return (
            <img src="./avt.jpg" alt=""/>
        );
    }
}

class ListMessage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showImage : false,
            url:"",
        }
    }
    showImgZoom = (url) => {
        this.setState({
            showImage: true,
            url: url,
        });
    }
    hashString = (string)  => {
        let hash = 0;
        for ( let i = 0; i< string.length ; i++ ) {
            hash += Math.pow(string.charCodeAt(i) * 31, string.length - i );
            hash = hash & hash;
        }
        return hash;
    }
 
    render() {
        //console.log( this.props.listMessage )
        var result = null;
         
        if(  this.props.listMessage.length > 0 ) {
            let previousMessage = null;
            
            result = this.props.listMessage.map((item,index) => {
                //console.log(item)
                let boolCheck = false;
                    if( previousMessage === item.idFrom ) {
                        boolCheck = true;
                    }
                    else {
                        boolCheck = false;
                    }
                    previousMessage = item.idFrom;
                    
                switch( item.type ) {
                    
                    case 1 :
                        if( item.idFrom === this.props.currentUser.id ) {
                            return (
                                <div className= "msg-dpl-r" key = { index } >
                                    <div style={ boolCheck ? { "margin":"0 50px 0 auto"} : { "margin":"0 10px 0 auto"} } >
                                    <div className="deleteMessage">
                                    <DialogDeleteMessage item = { item } />
                                    </div>
                                    <span>{ item.content }</span>
                                    <p className="t-msg">{ item.timestamp }</p>
                                    </div>
                                    { boolCheck ? "" : <Avatar/> }
                                </div>
                            )
                        }
                        if ( item.idFrom === this.props.currentPeerUser.id ) {
                            return (
                                <div key={ index } className="msg-dpl">
                                    { boolCheck ? "" : <Avatar/> }
                                    <div style={ boolCheck ? { "margin":"0 auto 0 50px"} : { "margin":"0 auto 0 10px"} }  >
                                        <span>{ item.content }</span>
                                        <p className="t-msg">{ item.timestamp }</p>
                                        <div className="deleteMessage">
                                        <DialogDeleteMessage item = { item } />
                                            </div>
                                    </div>
                                    
                                </div>
                            )
                        }
                        break;
                    case 0:
                        //console.log("vo dc type 0")
                        //console.log(this.props.currentUser)
                        //console.log(this.props.currentPeerUser)
                        if( item.idFrom === this.props.currentUser.id ) {
                            //console.log(item)
                            return (
                                <div className= "msg-dpl-r" key = { index } >
                                    <div style={ boolCheck ? { "margin":"0 50px 0 auto"} : { "margin":"0 10px 0 auto"} }>
                                        <div className="deleteMessage">
                                        <DialogDeleteMessage item = { item } /></div>
                                        
                                        <img style={{"cursor":"pointer"}} 
                                        src={item.content} onClick={ () => { this.showImgZoom(item.content) } } alt="" />

                                        <p className="t-msg">{ item.timestamp }</p>
                                    </div>
                                    { boolCheck ? "" : <Avatar/> }
                                </div>
                            )
                        }
                        if ( item.idFrom === this.props.currentPeerUser.id ) {
                            return (
                                <div key={ index } className="msg-dpl">
                                    { boolCheck ? "" : <Avatar/> }
                                    <div style={ boolCheck ? { "margin":"0 auto 0 50px"} : { "margin":"0 auto 0 10px"} }>
                                        <img style={{"cursor":"pointer"}} 
                                        src={item.content} onClick={ () => { this.showImgZoom(item.content) } } alt="" />

                                        <p className="t-msg">{ item.timestamp }</p>
                                        <div className="deleteMessage">
                                        <DialogDeleteMessage item = { item } />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        break;
                    case 2:
                        if( item.idFrom === this.props.currentUserID ) {
                            return (
                                <div className= "msg-dpl-r" key = { index } >
                                    <div className="stickerMSG" style={ boolCheck ? { "margin":"0 50px 0 auto"} : { "margin":"0 10px 0 auto"} }>
                                        <div className="deleteMessage">
                                            <DialogDeleteMessage item = { item } />
                                        </div>
                                        <img src={item.content} alt=""/>
                                    </div>
                                    { boolCheck ? "" : <Avatar/> }
                                </div>
                            )
                        }
                        if ( item.idFrom === this.props.currentPeerUserid ) {
                            return (
                                <div key={ index } className="msg-dpl">
                                    { boolCheck ? "" : <Avatar/> }
                                    <div className="stickerMSG" style={ boolCheck ? { "margin":"0 auto 0 50px"} : { "margin":"0 auto 0 10px"} }>
                                        <img src={item.content}  alt="" />
                                        <div className="deleteMessage">
                                        <DialogDeleteMessage item = { item } />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        break;
                }
            })
        }
        return (
            <Fragment>
                <div className="zoomImageMSG"
                style = { this.state.showImage ? { "display":"flex" } : { "display":"none" } } >
                    <i onClick = { () => this.setState({ showImage: false }) } className="fas fa-times"></i>
                    <img src={ this.state.url } alt=""/>
                </div>
                <div className="newdateMessage"><span>20/2/2020</span></div>
                    { result }
            </Fragment>
        )
    }
}
const mapStateToProps = ( state ) => {
    return {
        messages: state.messages
    }
}
export default connect(mapStateToProps,null)(ListMessage);