import React, { Fragment } from 'react';
import ListMessage from './ListMessage';

class MainBody extends React.Component{
    render() {
        var renderListMSG = "";
        console.log(this.props.listMessage)
        if( this.props.listMessage.length > 0 ) {
            renderListMSG = <ListMessage 
            currentUserID = { this.props.currentUserID }
            currentPeerUserid = { this.props.currentPeerUser.id }
            listMessage={ this.props.listMessage } />
        }
        return this.props.currentPeerUser ? 
        (
            <Fragment>
                <div className="mainbd-head">
                    <img src="./avt.jpg" alt="" />
                    <div className="mainbd-h-inf">
                        <h4>{ this.props.currentPeerUser !== null ? this.props.currentPeerUser.name : "" }</h4>
                        <p>Đang online<span id="onlCir"></span></p>
                    </div>
                    <div className="mainbd-h-opt">
                        <div className="div1">
                            <label>Tìm tin nhắn</label> 
                            <input type="text" name="searchMess" placeholder="Nhập tin cần tìm..."/>
                        </div>
                        <div onClick= { this.props.onTest } className="div2"><i className="fas fa-plus"></i></div>
                        <div onClick={ this.props.onLogOut } className="div3"><i className="fas fa-ellipsis-h"></i></div>
                    </div>
                </div>
                <div className="wrapMessbdWrap">
                    <div className="scrollbar wrapMessbd scrollbar-juicy-peach mx-auto ">
                        <div className="mainbd-body">
                           
                            { renderListMSG }

                        </div>
                    </div>
                </div>

                <div className="mainbd-ft">
                    <div className="mainbd-ft-bd">
                        <div onClick = { () => { this.props.onOpenListSticker() } } className="ic-sugg-mainbd">
                            <i className="far fa-smile"></i>
                        </div>
                        <div className="bd-field-mainbd">
                            <input value={ this.props.inpuValue } type="text" onChange = { (e) => { this.props.onChangeInputValue(e.target.value) } } 
                            name="messageInputField" placeholder="Nhập tin nhắn..."/>
                            <div onClick = { () => { this.props.onSendMessage() }} className="divi">
                            <i className="fas fa-paper-plane"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
        :
        (<div>Khong co du lieu</div>)
    }
}
export default MainBody;