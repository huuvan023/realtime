import React, { Fragment } from 'react';

class MainBody extends React.Component{
    render() {
        return (
            <Fragment>
                <div className="mainbd-head">
                    <img src="./avt.jpg" alt="" />
                    <div className="mainbd-h-inf">
                        <h4>Hữu Văn</h4>
                        <p>Đang online<span id="onlCir"></span></p>
                    </div>
                    <div className="mainbd-h-opt">
                        <div className="div1">
                            <label>Tìm tin nhắn</label> 
                            <input type="text" name="searchMess" placeholder="Nhập tin cần tìm..."/>
                        </div>
                        <div className="div2"><i className="fas fa-plus"></i></div>
                        <div className="div3"><i className="fas fa-ellipsis-h"></i></div>
                    </div>
                </div>
                <div className="wrapMessbdWrap">
                    <div className="scrollbar wrapMessbd scrollbar-juicy-peach mx-auto ">
                        <div className="mainbd-body">




                        <div className = "sayHi-msg">
                            <img src="./sayHi.gif" alt=""/>
                            Vẫy tay chào nào!
                        </div>
                        <div className="msg-dpl">
                            <img src="./avt.jpg" alt=""/>
                            <div>
                            <span>sssssssssss</span>
                            <p className="t-msg">16:10</p>
                            </div>
                        </div>

                        <div className="msg-dpl-r">
                            <div>
                            <span>ssssssadssssssssssssssssssss sssssssssss</span>
                            <p className="t-msg">16:10</p>
                            </div>
                            <img src="./avt.jpg" alt=""/>
                        </div>
                        <div className="msg-dpl-r">
                            <div>
                            <span>ssssssadssssssssssssssssssss sssssssssss</span>
                            <p className="t-msg">16:10</p>
                            </div>
                            <img src="./avt.jpg" alt=""/>
                        </div>
                        <div className="msg-dpl-r">
                            <div>
                            <span>ssssssadssssssssssssssssssss sssssssssss</span>
                            <p className="t-msg">16:10</p>
                            </div>
                            <img src="./avt.jpg" alt=""/>
                        </div>
                        <div className="msg-dpl-r">
                            <div>
                            <span>ssssssadssssssssssssssssssss sssssssssss</span>
                            <p className="t-msg">16:10</p>
                            </div>
                            <img src="./avt.jpg" alt=""/>
                        </div>
                        <div className="msg-dpl">
                            <img src="./avt.jpg" alt=""/>
                            <div>
                            <span>sssssssssss</span>
                            <p className="t-msg">16:10</p>
                            </div>
                        </div>
                        <div className="msg-dpl">
                            <img src="./avt.jpg" alt=""/>
                            <div>
                            <span>sssssssssss</span>
                            <p className="t-msg">16:10</p>
                            </div>
                        </div>
                        <div className="msg-dpl">
                            <img src="./avt.jpg" alt=""/>
                            <div>
                            <span>sssssssssss</span>
                            <p className="t-msg">16:10</p>
                            </div>
                        </div>  





                        </div>
                    </div>
                </div>

                <div className="mainbd-ft">
                    <div className="mainbd-ft-bd">
                        <div className="ic-sugg-mainbd">
                            <i className="far fa-smile"></i>
                        </div>
                        <div className="bd-field-mainbd">
                            <input type="text" name="messageInputField" placeholder="Nhập tin nhắn..."/>
                            <div className="divi">
                            <i className="fas fa-paper-plane"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default MainBody;