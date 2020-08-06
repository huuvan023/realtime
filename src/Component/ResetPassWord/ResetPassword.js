import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

class ResetPassword extends React.Component {
    render(){
        return(
            <Fragment>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                            <form onSubmit = { (e) => this.props.onSubmitFom(e) }
                            className="login100-form validate-form flex-sb flex-w">
                                <span className="login100-form-title p-b-32">
                                    Reset your pasword
                                </span>
                                <span className="txt1 p-b-11">
                                    Your email
                                </span>
                                <div className="wrap-input100 validate-input m-b-36 forgetPassworddiv" 
                                    data-validate = "Email is required">
                                    <input className="input100" 
                                    onChange = { (e) => this.props.handleChangeInput(e) }
                                    type="text" name="email" />
                                    <span className="focus-input100"></span>
                                </div>
                                <Link to="/">Login!</Link>
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

export default ResetPassword