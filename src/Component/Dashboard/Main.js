import React, { Fragment } from 'react';
import PanelGroup from "react-panelgroup";
import Content from "react-panelgroup";
import ListMessage from './ListMessage';
import MainBody from './MainBody';
import ModifiedMessagePeer from './ButtonOpenModifiedMessage';
import ListUser from './ListUser';
import { connect } from 'react-redux';
import TabChat from './TabChat'
import SendMessage from './SendMessage';

class Main extends React.Component{
    render(){  
        return(
            <Fragment>
                <PanelGroup direction="row" 
                    panelWidths={[
                        { size: 300, minSize: 290, maxSize: 400, resize: "dynamic"},
                      ]}>
                <TabChat status = { this.props.status }
                        fetchPeerMessage = { this.props.fetchPeerMessage }
                        viewUsers = {this.props.viewUsers}/>
                <Content>
                <main className="bodyMessage">
                <div className="mainbd-head" >
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
                <div className="wrapMessbdWrap">
                    <div className="scrollbar wrapMessbd scrollbar-juicy-peach mx-auto ">
                        <div className="mainbd-body">
                            <div onClick={ () => alert("say Hi") } className = "sayHi-msg">
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

               <SendMessage
                onSendMessage = { this.props.onSendMessage } />
                </main>
                </Content>
                
                </PanelGroup>
            </Fragment>
        );
    }
    componentDidUpdate(){
        if(this.messagesEnd) {
            this.messagesEnd.scrollIntoView({})
        }
    }
}

export default Main;

 