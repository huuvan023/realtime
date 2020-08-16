import React, { Fragment } from 'react';
import PanelGroup from "react-panelgroup";
import Content from "react-panelgroup";
import ListMessage from './ListMessage';
import ModifiedMessagePeer from './ButtonOpenModifiedMessage';
import TabChat from './TabChat'
import SendMessage from './SendMessage';
import Welcome from './Welcome';

class Main extends React.Component{
    render(){  
        return(
            <Fragment>
                <PanelGroup direction="row" 
                    panelWidths={[
                        { size: 300, minSize: 290, maxSize: 400, resize: "dynamic"},
                      ]}>
                <TabChat status = { this.props.status }
                        lastMessage = { this.props.listMessages ? this.props.listMessages[this.props.listMessages.length - 1] : null }
                        onFilterUser = { this.props.onFilterUser }
                        fetchPeerMessage = { this.props.fetchPeerMessage }
                        currentUser = { this.props.currentUser ? this.props.currentUser : null  }
                        viewUsers = {this.props.listUsers}/>
                <Content>
                <main className="bodyMessage">
                    
                <div style = { this.props.currentPeerUser ? { "display":"flex" } : { "display":"none" } } className="mainbd-head" >
                    <img src="./user.svg" alt="" />
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
                <div style = { this.props.currentPeerUser ? { "display":"block" } : { "display":"none" } } className="wrapMessbdWrap">
                    <div className="scrollbar wrapMessbd scrollbar-juicy-peach mx-auto ">
                        <div className="mainbd-body">
                            <div onClick={ () => this.props.onSendMessage(2,"./sayHi.gif") } 
                            style={ this.props.listMessages.length > 0 ? { "display":"none" } : { "display":"block" } }
                            className = "sayHi-msg">
                                <img src="./sayHi.gif" alt=""/>
                                Vẫy tay chào nào!
                            </div>
                            <ListMessage 
                            key={ this.props.listMessages ? this.props.listMessages.length  : 0 }
                            currentUser = { this.props.currentUser ? this.props.currentUser : null  }
                            currentPeerUser = { this.props.currentPeerUser ? this.props.currentPeerUser  : null }
                            listMessages = { this.props.listMessages ? this.props.listMessages  : [] } />
                            <div
                                style={{float: 'left', clear: 'both'}}
                                ref={el => {
                                    this.messagesEnd = el
                                }}
                            />
                        </div>
                    </div>
                </div>
                { this.props.currentPeerUser ? "" : <Welcome/> }
                    
               { this.props.children }
                </main>
                </Content>
                
                </PanelGroup>
            </Fragment>
        );
    }
    componentDidMount(){
        if(this.messagesEnd) {
            this.messagesEnd.scrollIntoView({})
        } 
    }
    componentDidUpdate(){
        if(this.messagesEnd) {
            this.messagesEnd.scrollIntoView({})
        }
    }
}

export default Main;

 