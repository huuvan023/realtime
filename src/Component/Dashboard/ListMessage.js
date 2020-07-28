import React, { Fragment } from 'react'

class ListMessage extends React.Component {
    render() {
        var result = null;
        if( this.props.listMessage && this.props.listMessage.length > 0 ) {
            result = this.props.listMessage.map((item,index) => {
                if( item.idFrom === this.props.currentUserID ) {
                    return (
                        <div className= "msg-dpl-r" key = { index } >
                           
                            <div>
                            <span>{ item.content }</span>
                            <p className="t-msg">{ item.timestamp }</p>
                            </div>
                             <img src="./avt.jpg" alt=""/>
                        </div>
                    )
                }
                if ( item.idFrom === this.props.currentPeerUserid ) {
                    return (
                        <div key={ index } className="msg-dpl">
                            <img src="./avt.jpg" alt=""/>
                            <div>
                            <span>{ item.content }</span>
                            <p className="t-msg">{ item.timestamp }</p>
                            </div>
                        </div>
                    )
                }
            })
        }
        return (
            <Fragment>
                <div className = "sayHi-msg">
                    <img src="./sayHi.gif" alt=""/>
                    Vẫy tay chào nào!
                </div>
                    { result }
            </Fragment>
        )
    }
}
export default ListMessage;