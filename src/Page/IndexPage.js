import React from 'react';

class IndexPage extends React.Component {
    render(){
        return(
            <div className="container-wrap">
                
                <nav className="navMenu">
                    <div className="menuTab">
                        <div className="avatar">
                            <img src="./avt.jpg" alt="" />
                            <span className="avtOnline"></span>
                        </div>
                        <div className="tabList">
                            <div><i className="far fa-comment-dots"></i></div>
                            <div><i className="far fa-address-book"></i></div>
                            <div><i className="fas fa-at"></i></div>
                            <div><i className="far fa-check-square"></i></div>
                        </div>
                        <div className="tabList-bottom">
                            <div><i className="far fa-star"></i></div>
                            <div><i className="fas fa-cog"></i></div>
                        </div>
                    </div>
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
                                        Tin nhắn <i class="fas fa-caret-down"></i>
                                        <div className="drop-content">
                                            <div>Tất cả tin nhắn</div>
                                            <div>Tin nhắn chưa đọc</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list">
                                        <div className="messageCard">
                                            <img src="./avt.jpg" alt="" />
                                            
                                        </div>
                                </div>
                            </div>
                            <div className="suggest-fr">

                            </div>
                        </div>
                    </div>
                </nav>
                <main className="bodyMessage">
b
                </main>
                
            </div>
        );
    }
}
export default IndexPage;