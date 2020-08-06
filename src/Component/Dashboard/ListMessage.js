import React, { Fragment } from 'react'
import DialogDeleteMessage from './DialogDeleteMessage'
import { connect } from 'react-redux'


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
    render() {
        var result = null;
        if( this.props.messages && this.props.messages.length > 0 ) {
            let previousMessage = null;
            console.log(this.props.messages)
            result = this.props.messages.map((item,index) => {
                let boolCheck = false;
                    if( previousMessage === item.idFrom ) {
                        boolCheck = true;
                    }
                    else {
                        boolCheck = false;
                    }
                    previousMessage = item.idFrom;
                switch( item.type ) {
                    case 0 :
                        if( item.idFrom === this.props.currentUserID ) {
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
                        if ( item.idFrom === this.props.currentPeerUserid ) {
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
                    case 1 :
                        if( item.idFrom === this.props.currentUserID ) {
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
                        if ( item.idFrom === this.props.currentPeerUserid ) {
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