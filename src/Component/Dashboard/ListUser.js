import React from 'react';


class ListUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkClickUser : false,
        }
    }
    onsetCurrentPeer = () => {
        this.props.onsetCurrentPeer(this.props.item);
        this.props.onSetActivePeerUser(this.props.item);
    }   
    render(){
        return(
            <div onClick={ this.onsetCurrentPeer } className = { this.props.className }>
                    <div className="messageCard">
                        <div>
                            <img src="./avt.jpg" alt="" />
                        </div>
                        <div className="mess-summary">
                            <div className="head-summary">
                                <span className="summ-n">{ this.props.item.name  }</span>
                                <span className="summ-t">hôm qua</span>
                            </div>
                            <div className="body-summary">
                                <p className="summ-mess-bd">
                                    asdsadsaaddsa...
                                </p>
                                { /*<span  className="summ-mess-more"> </span>*/}
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default ListUser;