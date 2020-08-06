import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    render(){
        return(
            <Fragment>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                            <form onSubmit={ (e) => this.props.onHandleSubmitF(e) } className="login100-form validate-form flex-sb flex-w">
                                <span className="login100-form-title p-b-32">
                                    Account Register
                                </span>
                                <span className="txt1 p-b-11">
                                    Your name
                                </span>
                                <div className="wrap-input100 validate-input m-b-36" data-validate = "Username is required">
                                    <input onChange={ (e) => this.props.handleChangeInutField (e)} className="input100" type="text" 
                                    name="name" />
                                    <span className="focus-input100"></span>
                                </div>
                                <span className="txt1 p-b-11">
                                    Your email
                                </span>
                                <div className="wrap-input100 validate-input m-b-36" data-validate = "Username is required">
                                    <input onChange={ (e) => this.props.handleChangeInutField(e) } className="input100" type="text" 
                                    name="email" />
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
                                
                                <div className="flex-sb-m w-full p-b-40">
                                    <div className="contact100-form-checkbox">
                                        <input className="input-checkbox100" id="ckb1" 
                                        type="checkbox" onChange = { () => this.props.onChangeAgree() }
                                        name="agreeTermOfUse" checked={ this.props.agreeTermOfUse } />
                                        <label className="label-checkbox100" htmlFor="ckb1">
                                            Agree to the terms of use
                                        </label>
                                    </div>
                                    <Link to="/">Login!</Link>
                                </div>

                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        Register
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

export default Register;