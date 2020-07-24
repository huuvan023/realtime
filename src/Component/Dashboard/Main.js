import React, { Fragment } from 'react';
import PanelGroup from "react-panelgroup";
import Content from "react-panelgroup";
import { MDBContainer } from "mdbreact";
import MainBody from './MainBody';

class Main extends React.Component{
    render(){
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
                            Chat - Gió Biển
                        </div>
                        <div className="search">
                            <input type="text" placeholder="Tìm..."/>
                            <div className="i"><i className="fas fa-user-plus"></i></div>
                            <div className="i"><i className="fas fa-plus"></i></div>
                        </div>
                    </div>
                    <div className="body">
                        <div className="message-list">
                            <div className="messageFilter">
                                <div className="drop-title">
                                    Tin nhắn <i className="fas fa-caret-down"></i>
                                    <div className="drop-content">
                                        <div>Tất cả tin nhắn</div>
                                        <div>Tin nhắn chưa đọc</div>
                                    </div>
                                </div>
                            </div>
                            <MDBContainer>
                                <div className="scrollbar scrollbar-juicy-peach mx-auto wrapAllMSG">
                                <div className="list">
                                        <div className="messageCard">
                                            <div>
                                                <img src="./avt.jpg" alt="" />
                                            </div>
                                            <div className="mess-summary">
                                                <div className="head-summary">
                                                    <span className="summ-n">Hữu Văn</span>
                                                    <span className="summ-t">hôm qua</span>
                                                </div>
                                                <div className="body-summary">
                                                    <p className="summ-mess-bd">
                                                        { this.props.stringMess.slice(0, 25) }...
                                                    </p>
                                                    <span  className="summ-mess-more">
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="list">
                                        <div className="messageCard">
                                            <div>
                                                <img src="./avt.jpg" alt="" />
                                            </div>
                                            <div className="mess-summary">
                                                <div className="head-summary">
                                                    <span className="summ-n">Hữu Văn</span>
                                                    <span className="summ-t">hôm qua</span>
                                                </div>
                                                <div className="body-summary">
                                                    <p className="summ-mess-bd">
                                                        { this.props.stringMess.slice(0, 25) }...
                                                    </p>
                                                    <span  className="summ-mess-more">
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="list">
                                        <div className="messageCard">
                                            <div>
                                                <img src="./avt.jpg" alt="" />
                                            </div>
                                            <div className="mess-summary">
                                                <div className="head-summary">
                                                    <span className="summ-n">Hữu Văn</span>
                                                    <span className="summ-t">hôm qua</span>
                                                </div>
                                                <div className="body-summary">
                                                    <p className="summ-mess-bd">
                                                        { this.props.stringMess.slice(0, 25) }...
                                                    </p>
                                                    <span  className="summ-mess-more">
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="list">
                                        <div className="messageCard">
                                            <div>
                                                <img src="./avt.jpg" alt="" />
                                            </div>
                                            <div className="mess-summary">
                                                <div className="head-summary">
                                                    <span className="summ-n">Hữu Văn</span>
                                                    <span className="summ-t">hôm qua</span>
                                                </div>
                                                <div className="body-summary">
                                                    <p className="summ-mess-bd">
                                                        { this.props.stringMess.slice(0, 25) }...
                                                    </p>
                                                    <span  className="summ-mess-more">
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="list">
                                        <div className="messageCard">
                                            <div>
                                                <img src="./avt.jpg" alt="" />
                                            </div>
                                            <div className="mess-summary">
                                                <div className="head-summary">
                                                    <span className="summ-n">Hữu Văn</span>
                                                    <span className="summ-t">hôm qua</span>
                                                </div>
                                                <div className="body-summary">
                                                    <p className="summ-mess-bd">
                                                        { this.props.stringMess.slice(0, 25) }...
                                                    </p>
                                                    <span  className="summ-mess-more">
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="list">
                                        <div className="messageCard">
                                            <div>
                                                <img src="./avt.jpg" alt="" />
                                            </div>
                                            <div className="mess-summary">
                                                <div className="head-summary">
                                                    <span className="summ-n">Hữu Văn</span>
                                                    <span className="summ-t">hôm qua</span>
                                                </div>
                                                <div className="body-summary">
                                                    <p className="summ-mess-bd">
                                                        { this.props.stringMess.slice(0, 25) }...
                                                    </p>
                                                    <span  className="summ-mess-more">
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="list">
                                        <div className="messageCard">
                                            <div>
                                                <img src="./avt.jpg" alt="" />
                                            </div>
                                            <div className="mess-summary">
                                                <div className="head-summary">
                                                    <span className="summ-n">Hữu Văn</span>
                                                    <span className="summ-t">hôm qua</span>
                                                </div>
                                                <div className="body-summary">
                                                    <p className="summ-mess-bd">
                                                        { this.props.stringMess.slice(0, 25) }...
                                                    </p>
                                                    <span  className="summ-mess-more">
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="list">
                                        <div className="messageCard">
                                            <div>
                                                <img src="./avt.jpg" alt="" />
                                            </div>
                                            <div className="mess-summary">
                                                <div className="head-summary">
                                                    <span className="summ-n">Hữu Văn</span>
                                                    <span className="summ-t">hôm qua</span>
                                                </div>
                                                <div className="body-summary">
                                                    <p className="summ-mess-bd">
                                                        { this.props.stringMess.slice(0, 25) }...
                                                    </p>
                                                    <span  className="summ-mess-more">
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                <div className="list">
                                        <div className="messageCard">
                                            <div>
                                                <img src="./avt.jpg" alt="" />
                                            </div>
                                            <div className="mess-summary">
                                                <div className="head-summary">
                                                    <span className="summ-n">Hữu Văn</span>
                                                    <span className="summ-t">hôm qua</span>
                                                </div>
                                                <div className="body-summary">
                                                    <p className="summ-mess-bd">
                                                        { this.props.stringMess.slice(0, 25) }...
                                                    </p>
                                                    <span  className="summ-mess-more">
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
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
                    <MainBody/>
                </main>
                </Content>
                
                </PanelGroup>
            </Fragment>
        );
    }
}
export default Main;