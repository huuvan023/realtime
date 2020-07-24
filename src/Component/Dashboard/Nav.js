import React, { Fragment } from 'react';

class Nav extends React.Component{
    render(){
        return(
            <Fragment>
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
            </Fragment>
        );
    }
}
export default Nav;