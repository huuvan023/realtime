import React, { Fragment } from 'react'
import Content from "react-panelgroup";
import { MDBContainer } from "mdbreact"; 
import ListUser from './ListUser'
import { connect } from "react-redux"
import firebase from './../../Services/Firebase'

class TabChat extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentPeerActive: null,
            loading: true,
        }
        this.lastMessage = [];
    }
    hashString = (string) => {
        let hash = 0;
        for ( let i = 0; i< string.length ; i++ ) {
            hash += Math.pow(string.charCodeAt(i) * 31, string.length - i );
            hash = hash & hash;
        }
        return hash;
    }
    componentDidMount = async () => {
        this.setState({
            loading: true,
        })
        await this.props.viewUsers.map( async (item,index) => {
            let groupChatID = Math.abs(this.hashString(this.props.currentUser.id) - this.hashString(item.dataUser.id) ).toString();
            await firebase.firestore()
            .collection("Message")
            .doc(groupChatID)
            .get()
            .then( rs => {
                if( typeof rs.data() !== "undefined") {
                    console.log("vo dc nef")
                    this.lastMessage.push(rs.data());
                }
                else {
                    this.lastMessage.push("Nope");
                }
            })
        })    
        console.log(this.lastMessage)
        this.setState({
            loading: false,
        })
    }
    onShowListUsers =  (listUser) => {
        console.log(this.lastMessage)
        var result =  listUser.map( (item, index) => {
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
                lastMessage = { this.props.lastMessage }
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

        return this.state.loading === false ? 
        (
            <Fragment>
                <Content >
                    <div className="chatList">
                    <div className="header" id="test" >
                        <div className="usrName">
                            Chat - { this.props.dataUser.userData.data.name }
                        </div>
                        <div className="search">
                            <input onChange={ (e) => { this.props.onFilterUser(e.target.value) } } type="text" placeholder="Tìm..."/>
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
                                { this.props.viewUsers ? this.onShowListUsers(this.props.viewUsers) : "" }
                                </div>
                            </MDBContainer>

                        </div>

                         

                    </div>
                    </div>
                </Content>
            </Fragment>
        )
        : (<div>loading</div>)
    }
}
const mapStateToProps = (state) => {
    return {
        dataUser: state.user
    }
}
export default connect(mapStateToProps,null)(TabChat);