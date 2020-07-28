import React, { Fragment } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import  Avatar  from '@material-ui/core/Avatar'
import ButtonOpenConfigLogout from './ButtonOpenConfigLogout';

import {
    blue300,
    indigo900,
    orange200,
    deepOrange300,
    pink400,
    purple500,
  } from '@material-ui/core/colors';
  
  const style = {margin: 5};
  /*<Avatar
                        color={deepOrange300}
                        className= " avtNavMain"
                        backgroundColor={purple500}
                        size={30}
                        style={style}
                        >
                        A
                        </Avatar>*/

class Nav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            anchorEl: null,
            setAnchorEl: null
        }
    }
    handleClick = (event) => {
        console.log(event.target)
    };
    render(){
        return(
            <Fragment>
                <div className="menuTab">
                    <div className="avatar">
                    <Avatar src="./avt.jpg" alt="" className="avtNavMain" />
                        <span className="avtOnline"></span>
                    </div>
                    <div className="tabList">
                        <div><i className="far fa-comment-dots"></i></div>
                        <div><i className="far fa-address-book"></i></div>
                        <div><i className="far fa-check-square"></i></div>
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