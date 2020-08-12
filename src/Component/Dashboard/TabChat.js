import React, { Fragment } from 'react'
import Content from "react-panelgroup";
import ModalAddFiend from './ModalAddFriend';
import { MDBContainer } from "mdbreact"; 
import ListUser from './ListUser'

class TabChat extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentPeerActive: null,
        }
    }
    onShowListUsers =  (listUser) => {
        var result =  listUser.map(  (item, index) => {
            let classname = "";
             
            if( this.state.currentPeerActive !== null){
             
                if( item.dataUser.id ===  this.state.currentPeerActive ) {
                    classname = "list chatUserActive";
                   
                }
                else {
                    classname =" list"
                }
            }
            else {
                classname =" list"
            }
        
            return <ListUser 
            fetchMessagePeer
                onSetActivePeerUser = { this.setActivePeer }            
                className = { classname }
                key= {index}
                item = { item }
            />
        })
        return result;
    }
    setActivePeer = ( user ) => {
        this.setState({ 
            currentPeerActive:user.dataUser.id 
        })
        this.props.fetchPeerMessage(user);
    }
    render(){
        var dropStyle = "";
        if( this.state.onOpenDropTitle ) {
            dropStyle = "block";
        }
        
        let displayTab = "";
            if( this.props.viewUsers && this.props.status == "message" ) {
                displayTab = this.onShowListUsers(this.props.viewUsers);
            }
            if( this.props.viewUsers && this.props.status == "friends" ) {
                displayTab = <div>Friends</div>;
            }

        return(
            <Fragment>
                <Content >
                    <div className="chatList">
                    <div className="header" id="test" >
                        <div className="usrName">
                            Chat - { this.props.currentUserName }
                        </div>
                        <div className="search">
                            <input onChange={ (e) => { this.props.onFilterUser(e.target.value) } } type="text" placeholder="Tìm..."/>
                            <ModalAddFiend />
                        </div>
                    </div>
                    <div  className="body">
                        <div className="message-list">
                            <div className="messageFilter">
                                <div style={ this.props.status === "friends" ? { "display":"none" } : { "display":"block" } }  
                                onClick={ () => { this.setState({ onOpenDropTitle: !this.state.onOpenDropTitle }) } } className="drop-title">
                                    Tin nhắn <i className="fas fa-caret-down"></i>
                                    <div  style = {{ "display": dropStyle }} className="drop-content">
                                        <div>Tất cả tin nhắn</div>
                                        <div>Tin nhắn chưa đọc</div>
                                    </div>
                                </div>
                            </div>
                            <MDBContainer>
                                <div className="scrollbar scrollbar-juicy-peach mx-auto wrapAllMSG">
                                    
                                { displayTab }
 
 
                                <p id="watch-mr">Xem thêm...</p>
                                </div>
                            </MDBContainer>

                        </div>

                         

                    </div>
                    </div>
                </Content>
            </Fragment>
        );
    }
}
export default TabChat;