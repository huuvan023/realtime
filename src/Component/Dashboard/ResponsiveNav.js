import React, { Fragment } from 'react';

class ResponsiveNav extends React.Component{
    render(){
        return(
            <Fragment>
                <div className="menuTab-respon">
                    <div className="miniTabIc">
                        <div><i className="far fa-comment-dots"></i></div>
                        <div><i className="far fa-address-book"></i></div>
                        <div><i className="far fa-check-square"></i></div>
                    </div>
                    <div className="scrollbar scrollbar-juicy-peach mx-auto">
                        <div className="tabList">
                            <div><img src="./avt.jpg" alt="" /></div>
                            <div><img src="./avt.jpg" alt="" /></div>
                            <div><img src="./avt.jpg" alt="" /></div>
                            <div><img src="./avt.jpg" alt="" /></div>
                            <div><img src="./avt.jpg" alt="" /></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default ResponsiveNav;