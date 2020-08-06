import React, { Fragment } from 'react';
import PanelGroup from "react-panelgroup";
import Content from "react-panelgroup";
import { MDBContainer } from "mdbreact";
import MainBody from './MainBody';
import ListUser from './ListUser';
import ModalAddFiend from './ModalAddFriend';
import { connect } from 'react-redux';
import { fetchPeerMessage } from './../../Lib/Dispatch';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checkClickUserID: null,
            onOpenDropTitle: false,
        }
        this.myref = React.createRef();
    }
    

    onShowListUsers =  (listUser) => {
        
        var result =  listUser.map(  (item, index) => {
            let classname = "";
             
            if( this.state.checkClickUserID !== null){
               // console.log(item.dataUser.id , this.state.checkClickUserID.id )
                if( item.dataUser.id ===  this.state.checkClickUserID ) {
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
                listUsers = { this.props.viewUsers }
                dataUser = { this.props.dataUser }
                currentUserID = { this.props.currentUserID }
                onsetCurrentPeer = { (item) => { this.props.onsetCurrentPeer(item) } } 
                onSetActivePeerUser = { this.onSetActivePeerUser }            
                className = { classname }
                key= {index}
                item = { item }
            />
        })
        return result;
    }
    onSetActivePeerUser = (id) => {
        this.setState({
            checkClickUserID: id.dataUser.id
        })
    }
    render(){   
         
            var dropStyle = "";
            if( this.state.onOpenDropTitle ) {
                dropStyle = "block";
            }
            var heightElement = 0;
            var heiBL = {
                "height": "" 
            }
            if(  this.myref.current ) {
                heightElement = this.myref.current.offsetHeight;
                heiBL = {
                    "height":  parseInt( this.props.height -heightElement)
                }
            }
            let displayTab = "";
            if( this.props.viewUsers && this.props.status == "message" ) {
                displayTab = this.onShowListUsers(this.props.viewUsers);
            }
            if( this.props.viewUsers && this.props.status == "friends" ) {
                displayTab = <div>asdad</div>;
            }
        return(
            
            <Fragment>
                <PanelGroup direction="row" 
                    panelWidths={[
                        { size: 300, minSize: 290, maxSize: 400, resize: "dynamic"},
                      ]}>
                <Content >
                    <div className="chatList">
                    <div className="header" id="test" ref={ this.myref }>
                        <div className="usrName">
                            Chat - { this.props.currentUserName }
                        </div>
                        <div className="search">
                            <input onChange={ (e) => { this.props.onFilterUser(e.target.value) } } type="text" placeholder="Tìm..."/>
                            <ModalAddFiend />
                        </div>
                    </div>
                    <div  style={ heiBL } className="body">
                        <div className="message-list">
                            <div className="messageFilter">
                                <div style={ this.props.status === "friends" ? { "display":"none" } : { "display":"block" } }  
                                onClick={ () => { this.setState({ onOpenDropTitle: !this.state.onOpenDropTitle }) } } className="drop-title">
                                    Tin nhắn <i className="fas fa-caret-down"></i>
                                    <div style = {{ "display": dropStyle }}className="drop-content">
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

                        <div className="new-fr">
                            <h4>Liên hệ mới (1)</h4>
                            <div className="list-new-fr">
                            <div className="list-fr-crd">
                                    <div className="list-fr-img">
                                        <img src="./avt.jpg" alt="" />
                                    </div>
                                    <div className="list-fr-bd">
                                        <h5>Hữu Văn</h5>
                                        <p>Hôm qua</p>
                                    </div>
                                    <div className="list-fr-ft">
                                        <button className="btn btn-primary">Gửi lời chào </button>
                                    </div>
                                </div>
                                <div className="list-fr-crd">
                                    <div className="list-fr-img">
                                        <img src="./avt.jpg" alt="" />
                                    </div>
                                    <div className="list-fr-bd">
                                        <h5>Hữu Văn</h5>
                                        <p>Hôm qua</p>
                                    </div>
                                    <div className="list-fr-ft">
                                        <button className="btn btn-primary">Gửi lời chào </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                </Content>
                
                <Content>
                <main className="bodyMessage">
                    <MainBody currentUserName = { this.props.currentUserName } 
                    currentPeerUser = { this.props.currentPeerUser }
                    offSetHeight = { heightElement }
                    onSayHi = { this.props.onSayHi }
                    height = { this.props.height }
                    currentUserID = { this.props.currentUserID }
                    onOpenListSticker = { this.props.onOpenListSticker }
                    onSendMessage = { this.props.onSendMessage }
                    onUploadImage = { this.props.onUploadImage }
                    onSendSticker = {  this.props.onSendSticker }
                    onChangeInputValue = { this.props.onChangeInputValue }
                    inpuValue = { this.props.inpuValue }
                    listMessage = { this.props.listMessage }
                    history={ this.props.history }/>
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
        onFetchPeerMessage: async (host,peer) => {
            //console.log("vo dc dispatch 2")
            await dispatch(fetchPeerMessage( host,peer ))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);

 