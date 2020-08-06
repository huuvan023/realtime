import React from 'react';
import firebase from './../../Services/Firebase'
import { connect } from 'react-redux';
import { fetchPeerMessage } from './../../Lib/Dispatch';


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
        console.log(this.props.dataUser)
        console.log(this.props.item)
        //this.props.onsetCurrentPeer(this.props.item);
        //await this.props.onFetchPeerMessage(this.props.dataUser.userData.data.id,this.props.item.dataUser.id)
        await this.props.onSetActivePeerUser(this.props.item);
        console.log(this.props.messages)
    }  
    async componentDidMount () {
        /*this.groupChatID = Math.abs(this.hashString(this.props.currentUserID) - this.hashString(this.props.item.id) ).toString();
        let lastModified = null;
        await firebase.firestore()
        .collection("Message")
        .doc(this.groupChatID)
        .get()
        .then( doc => {
            if( typeof doc.data().lastModified !== "undefined" ) {
                lastModified = doc.data().lastModified;
            }
        })
        .catch( error => alert("error"));

        await firebase.firestore()
        .collection("Message")
        .doc(this.groupChatID)
        .get()
        .then( async doc => {
            if( doc.exists ){
                await firebase.firestore()
                .collection("Message")
                .doc(this.groupChatID)
                .collection(this.groupChatID)
                .doc(lastModified)
                .get()
                .then( doc => {
                    console.log(this.groupChatID)
                    console.log(doc.data().type)
                    console.log(doc.data().content)
                    if( doc.data() !== null ) {
                        this.setState({
                            messageSum: {
                                content: doc.data().content,
                                type: doc.data().type,
                            },
                            checkClickUser: true,
                        });
                    }
                })
            }
        })
*/
    
    
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
        messages: state.messages
    }
}
const mapDispatchToProps = ( dispatch, props ) => {
    return {
        onFetchPeerMessage: async (host,peer) => {
            await dispatch(fetchPeerMessage( host,peer ))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ListUser);