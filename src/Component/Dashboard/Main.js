import React, { Fragment } from 'react';
import PanelGroup from "react-panelgroup";
import Content from "react-panelgroup";
import ListMessage from './ListMessage';
import MainBody from './MainBody';
import ModifiedMessagePeer from './ButtonOpenModifiedMessage';
import ListUser from './ListUser';
import { connect } from 'react-redux';
import TabChat from './TabChat'
import { fetchPeerMessage } from './../../Lib/Dispatch';
import SendMessage from './SendMessage';

class Main extends React.Component{
 
    render(){   
        let renderListMSG = "";
        /*
        if( typeof this.props.peerMessages.messages !== "undefined" ) {
            renderListMSG = <ListMessage 
             
            currentUserID = { this.props.currentUser }
            currentPeerUserid = { this.props.currentPeerUser }
            listMessages ={ this.props.listMessages } />
        } */
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

               <SendMessage />

                </main>
                </Content>
                
                </PanelGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }
}
const mapDispatchToProps = ( dispatch, props ) => {
    //console.log("vo dc dispatch1")
    return {
         
        onFetchPeerMessages: async (userID,item,listMessages) => {
            await dispatch(fetchPeerMessage( userID,item,listMessages ))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);

 