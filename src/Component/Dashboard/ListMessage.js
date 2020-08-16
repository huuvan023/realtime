import React, { Fragment } from 'react'
import DialogDeleteMessage from './DialogDeleteMessage'

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
        this.newMessCheck = null;
    }
    showImgZoom = (url) => {
        this.setState({
            showImage: true,
            url: url,
        });
    }

    render() {
        console.log(this.props.listMessages)
        var result = null;         
        if(  this.props.listMessages.length > 0 ) {
            let previousMessage = null;
            let previousTime = null;
            
            result = this.props.listMessages.map((item,index) => {
                
                let boolCheck = false;
                if( previousMessage === item.idFrom ) {
                    boolCheck = true;
                }
                else {
                    boolCheck = false;
                }
                if(previousTime !== null ) {
                    if( Date.parse(item.timestamp) - Date.parse(previousTime) > 7200000 ){
                           this.newMessCheck = item.timestamp
                        
                    }
                    else {
                            this.newMessCheck =  null
                    }
                }
                else {
                    this.newMessCheck = item.timestamp
                }
                previousTime = item.timestamp;
                previousMessage = item.idFrom;
                let time = new Date(item.timestamp);
                let timeDisplay = `${time.getHours()}:${time.getMinutes()}`;
                switch( item.type ) {
                    
                    case 1 :
                        if( item.idFrom === this.props.currentUser.id ) {
                            return (
                                <Fragment key = { index }>
                                { this.newMessCheck !== null ? <div  className="newdateMessage"><span>{this.newMessCheck}</span></div> : "" }
                                <div className= "msg-dpl-r"  >
                                    <div style={ boolCheck ? { "margin":"0 50px 0 auto"} : { "margin":"0 10px 0 auto"} } >
                                    <div className="deleteMessage">
                                    <DialogDeleteMessage item = { item } />
                                    </div>
                                    <span>{ item.content }</span>
                                    <p className="t-msg">{ timeDisplay }</p>
                                    </div>
                                    { boolCheck ? "" : <Avatar/> }
                                </div>
                                </Fragment>
                            )
                        }
                        if ( item.idFrom === this.props.currentPeerUser.id ) {
                            return (
                                <Fragment key = { index }>
                                { this.newMessCheck !== null ? <div  className="newdateMessage"><span>{this.newMessCheck}</span></div> : "" }
                                <div key={ index } className="msg-dpl">
                                    { boolCheck ? "" : <Avatar/> }
                                    <div style={ boolCheck ? { "margin":"0 auto 0 50px"} : { "margin":"0 auto 0 10px"} }  >
                                        <span>{ item.content }</span>
                                        <p className="t-msg">{ timeDisplay }</p>
                                        <div className="deleteMessage">
                                        <DialogDeleteMessage item = { item } />
                                            </div>
                                    </div>
                                    
                                </div>
                                </Fragment>
                            )
                        }
                        break;
                    case 0:
                        if( item.idFrom === this.props.currentUser.id ) {
                            //console.log(item)
                            return (
                                <Fragment key = { index }>
                                { this.newMessCheck !== null ? <div  className="newdateMessage"><span>{this.newMessCheck}</span></div> : "" }
                                <div className= "msg-dpl-r" key = { index } >
                                    <div style={ boolCheck ? { "margin":"0 50px 0 auto"} : { "margin":"0 10px 0 auto"} }>
                                        <div className="deleteMessage">
                                        <DialogDeleteMessage item = { item } /></div>
                                        
                                        <img style={{"cursor":"pointer"}} 
                                        src={item.content} onClick={ () => { this.showImgZoom(item.content) } } alt="" />

                                        <p className="t-msg">{ timeDisplay }</p>
                                    </div>
                                    { boolCheck ? "" : <Avatar/> }
                                </div>
                                </Fragment>
                            )
                        }
                        if ( item.idFrom === this.props.currentPeerUser.id ) {
                            return (
                                <Fragment key = { index }>
                                { this.newMessCheck !== null ? <div  className="newdateMessage"><span>{this.newMessCheck}</span></div> : "" }
                                <div key={ index } className="msg-dpl">
                                    { boolCheck ? "" : <Avatar/> }
                                    <div style={ boolCheck ? { "margin":"0 auto 0 50px"} : { "margin":"0 auto 0 10px"} }>
                                        <img style={{"cursor":"pointer"}} 
                                        src={item.content} onClick={ () => { this.showImgZoom(item.content) } } alt="" />

                                        <p className="t-msg">{ timeDisplay }</p>
                                        <div className="deleteMessage">
                                        <DialogDeleteMessage item = { item } />
                                        </div>
                                    </div>
                                </div>
                                </Fragment>
                            )
                        }
                        break;
                    case 2:
                        if(item.idFrom === this.props.currentUser.id ) {
                            return (
                                <Fragment key = { index }>
                                { this.newMessCheck !== null ? <div  className="newdateMessage"><span>{this.newMessCheck}</span></div> : "" }
                                <div className= "msg-dpl-r" key = { index } >
                                    <div className="stickerMSG" style={ boolCheck ? { "margin":"0 50px 0 auto"} : { "margin":"0 10px 0 auto"} }>
                                        <div className="deleteMessage">
                                            <DialogDeleteMessage item = { item } />
                                        </div>
                                        <img src={item.content} alt={ item.name }/>
                                        <p className="t-msg">{ timeDisplay }</p>
                                    </div>
                                    { boolCheck ? "" : <Avatar/> }
                                </div>
                                </Fragment>
                            )
                        }
                        if ( item.idFrom === this.props.currentPeerUser.id ) {
                            return (
                                <Fragment key = { index }>
                                { this.newMessCheck !== null ? <div  className="newdateMessage"><span>{this.newMessCheck}</span></div> : "" }
                                <div key={ index } className="msg-dpl">
                                    { boolCheck ? "" : <Avatar/> }
                                    <div className="stickerMSG" style={ boolCheck ? { "margin":"0 auto 0 50px"} : { "margin":"0 auto 0 10px"} }>
                                        <img src={item.content} alt={ item.name }/>
                                        <p className="t-msg">{ timeDisplay }</p>
                                        <div className="deleteMessage">
                                        <DialogDeleteMessage item = { item } />
                                        </div>
                                    </div>
                                </div>
                                </Fragment>
                            )
                        }
                        break;
                        default:
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
                    { result }
            </Fragment>
        )
    }
}

export default ListMessage;