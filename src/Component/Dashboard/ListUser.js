import React from 'react';
import firebase from './../../Services/Firebase'
import { connect } from 'react-redux';
import { onSetCurrentPeer } from './../../Lib/Dispatch';


class ListUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkClickUser : false,
            messageSum: {
                content:"",
                type: null
            }
        }
        this.groupChatID = "a";
    }
    onsetCurrentPeer = async() => {
        let { item } = this.props;
        await this.props.onSetActivePeerUser(this.props.item);
        await this.props.setCurrentPeer( this.props.item )
    }  
    hashString = (string) => {
        let hash = 0;
        for ( let i = 0; i< string.length ; i++ ) {
            hash += Math.pow(string.charCodeAt(i) * 31, string.length - i );
            hash = hash & hash;
        }
        return hash;
    }
    render(){
    
        let messageSumDisplay = "mesage";
        if( this.groupChatID !== null && this.state.checkClickUser === true )
        {
            switch( this.state.messageSum.type ) {
                case 0:
                    messageSumDisplay = this.state.messageSum.content;
                    break;
                case 1:
                    messageSumDisplay = "[image]";
                    break
                case 2:
                    messageSumDisplay = "[sticker]";
                    break
            }
        }
        return this.state.checkClickUser === false ?
        (
            <div onClick={ this.onsetCurrentPeer } className = { this.props.className }>
                    <div className="messageCard">
                        <div>
                            <img src="./avt.jpg" alt="" />
                        </div>
                        <div className="mess-summary">
                            <div className="head-summary">
                                <span className="summ-n">{ this.props.item.dataUser.name  }</span>
                                <span className="summ-t">hôm qua</span>
                            </div>
                            <div className="body-summary">
                                <p className="summ-mess-bd">
                                    {messageSumDisplay}
                                </p>
                                { /*<span  className="summ-mess-more"> </span>*/}
                            </div>
                        </div>
                    </div>
            </div>
        )
        :
        (<div>Loading</div>) 
    }
}
const mapStateToProps = (state) => {
    return {
        dataUser: state.user,
        peerUser: state.peerUser,
        messages: state.messages
    }
}
const mapDispatchToProps = ( dispatch, props ) => {
    return {
        setCurrentPeer: (item) => {
            dispatch( onSetCurrentPeer(item) )
        }
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(ListUser);