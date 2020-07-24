import React, { Fragment } from 'react';
import '../App.css';

class ForgetPWPage extends React.Component {
    render(){
        return(
            <Fragment>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                            <form className="login100-form validate-form flex-sb flex-w">
                                <span className="login100-form-title p-b-32">
                                    Reset your pasword
                                </span>

                                <span className="txt1 p-b-11">
                                    Your email
                                </span>
                                <div className="wrap-input100 validate-input m-b-36" data-validate = "Username is required">
                                    <input className="input100" type="text" name="username" />
                                    <span className="focus-input100"></span>
                                </div>
                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        Send me new password!
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default ForgetPWPage;