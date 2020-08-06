import React, { Fragment } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import  Avatar  from '@material-ui/core/Avatar'
import ButtonOpenConfigLogout from './ButtonOpenConfigLogout';

class Nav extends React.Component{
render(){
    return(
        <Fragment>
            <div className="menuTab">
                <div className="avatar">
                <Avatar src="./avt.jpg" alt="" className="avtNavMain" />
                    <span className="avtOnline"></span>
                </div>
                <div className="tabList">
                    <div style={ this.props.status === "message" ? { "backgroundColor":"rgb(238, 238, 238)" } : {}} 
                    onClick={ () => this.props.onChangDPLStatus("message") }>
                        <i className="far fa-comment-dots"></i></div>

                    <div style={ this.props.status === "friends" ? { "backgroundColor":"rgb(238, 238, 238)" } : {}}  
                    onClick={ () => this.props.onChangDPLStatus("friends") }>
                        <i className="far fa-address-book"></i></div>
                </div>
                <div className="tabList-bottom">
                    
                    <div>
                    
                        <ButtonOpenConfigLogout/>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
}
export default Nav;