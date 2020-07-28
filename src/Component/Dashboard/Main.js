import React, { Fragment } from 'react';
import PanelGroup from "react-panelgroup";
import Content from "react-panelgroup";
import { MDBContainer } from "mdbreact";
import MainBody from './MainBody';
import ListUser from './ListUser';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checkClickUserID: null,
            onOpenDropTitle: false
        }
    }
    onShowListUsers = (listUser) => {
        var result = listUser.map((item, index) => {
            let classname = "";
            if( item.id ===  this.state.checkClickUserID ) {
                classname = "list chatUserActive";
            }
            else {
                classname =" list"
            }
            return <ListUser onsetCurrentPeer = { (item) => { this.props.onsetCurrentPeer(item) } } 
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
            checkClickUserID: id
        })
    }
    render(){
            var dropStyle = "";
            if( this.state.onOpenDropTitle ) {
                dropStyle = "block";
            }
        return(
            
            <Fragment>
                <PanelGroup direction="row" 
                    panelWidths={[
                        { size: 300, minSize: 290, maxSize: 400, resize: "dynamic"},
                      ]}>
                <Content >
                    <div className="chatList">
                    <div className="header">
                        <div className="usrName">
                            Chat - { this.props.currentUserName }
                        </div>
                        <div className="search">
                            <input onChange={ (e) => { this.props.onFilterUser(e.target.value) } } type="text" placeholder="Tìm..."/>
                            <div className="i"><i className="fas fa-user-plus"></i></div>
                            <div className="i"><i className="fas fa-plus"></i></div>
                        </div>
                    </div>
                    <div className="body">
                        <div className="message-list">
                            <div className="messageFilter">
                                <div onClick={ () => { this.setState({ onOpenDropTitle: !this.state.onOpenDropTitle }) } } className="drop-title">
                                    Tin nhắn <i className="fas fa-caret-down"></i>
                                    <div style = {{ "display": dropStyle }}className="drop-content">
                                        <div>Tất cả tin nhắn</div>
                                        <div>Tin nhắn chưa đọc</div>
                                    </div>
                                </div>
                            </div>
                            <MDBContainer>
                                <div className="scrollbar scrollbar-juicy-peach mx-auto wrapAllMSG">
                                    
                                { this.props.viewUsers ? this.onShowListUsers(this.props.viewUsers) : "" }
 
 
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
                    onLogOut = { this.props.onLogOut } 
                    currentUserID = { this.props.currentUserID }
                    onOpenListSticker = { this.props.onOpenListSticker }
                    onSendMessage = { this.props.onSendMessage }
                    onChangeInputValue = { this.props.onChangeInputValue }
                    inpuValue = { this.props.inpuValue }
                    listMessage = { this.props.listMessage }
                    onTest = { this.props.onTest }
                    history={ this.props.history }/>
                </main>
                </Content>
                
                </PanelGroup>
            </Fragment>
        );
    }
}
export default Main;