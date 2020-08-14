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
    constructor(props) {
        super(props);
        this.state = {

        }
        this.receiveProps = false ;

    }
    async componentWillMount() {
        if( this.props.currentPeerUser   ){
           
        }
         
    }
    async componentDidUpdate() {
        if( this.props.currentPeerUser   ){
            //console.log("receive prosp user")
            //await this.props.onFetchMessagse(this.props.currentPeerUser.id,this.props.currentUser.id);
            
        }
    }
    componentWillUnmount() { 
        this.receiveProps = false;
    }
    render(){   
        //console.log(this.props.listMessages)
        let renderListMSG = "";
        //console.log(this.props.currentUser,this.props.currentPeerUser)
        //console.log(this.props.messages)
        //console.log("render main")
        if( this.props.currentPeerUser ) {
            //console.log("vo dc render list msg")
            renderListMSG = <ListMessage 
                currentUser = { this.props.currentUser }
                currentPeerUser = { this.props.currentPeerUser }
                listMessages = { this.props.listMessages } />
        } 
        else {
            renderListMSG = ""
        }
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
                            { renderListMSG }

                        </div>
                    </div>
                </div>

               <SendMessage
                onSendMessage = { this.props.onSendMessage }
               />

                </main>
                </Content>
                
                </PanelGroup>
            </Fragment>
        );
    }
}

export default Main;

 