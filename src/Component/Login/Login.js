import React from 'react'
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    render(){
        return(
            <Fragment>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                            <form onSubmit={ (e) => this.props.onHandleSubmitF(e) } className="login100-form validate-form flex-sb flex-w">
                                <span className="login100-form-title p-b-32">
                                    Account Login
                                </span>

                                <span className="txt1 p-b-11">
                                    Your Email
                                </span>
                                <div className="wrap-input100 validate-input m-b-36" data-validate = "Username is required">
                                    <input onChange={ (e) => this.props.handleChangeInutField(e) } className="input100" type="text" name="email" />
                                    <span className="focus-input100"></span>
                                </div>
                                
                                <span className="txt1 p-b-11">
                                    Password
                                </span>
                                <div className="wrap-input100 validate-input m-b-12" data-validate = "Password is required">
                                    <span onClick={ () => this.props.onShowPW() } className="btn-show-pass">
                                        <i className="fa fa-eye"></i>
                                    </span>
                                    <input onChange={ (e) => this.props.handleChangeInutField(e) } className="input100" 
                                    type={ this.props.showPW ? "text" : "password" } name="password" />
                                    <span className="focus-input100"></span>
                                </div>
                                
                                <div className="flex-sb-m w-full p-b-5">
                                    <div className="contact100-form-checkbox">
                                        <input onChange={ (e) => this.props.handleChangeInutField(e) }  
                                        checked={ this.props.remember }
                                        className="input-checkbox100" 
                                        id="ckb1" type="checkbox" name="remember"/>
                                        <label className="label-checkbox100" htmlFor="ckb1">
                                            Remember me
                                        </label>
                                    </div>
                                    <div>
                                        <Link to="/forgetpassword" className="txt3">
                                            Forget Password?
                                        </Link>
                                    </div>
                                </div>
                                <p className="p-b-40">You don't have account? <Link to="/register">Register now!</Link></p>
                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        Login
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
export default Login;