import React, { Fragment } from 'react';
import '../App.css';
import { Link, Redirect } from 'react-router-dom';    
import LoginString from './../Lib/LoginString';
import firebase from './../Services/Firebase';


class RegisterPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            error: null,
            showPW: false
        }
        this.onShowPW = this.onShowPW.bind(this);
        this.onHandleSubmitF = this.onHandleSubmitF.bind(this);
        this.handleChangeInutField = this.handleChangeInutField.bind(this);
    }
    onShowPW() {
        this.setState({
            showPW: !this.state.showPW
        });
    }
    handleChangeInutField (event) {
        this.setState({
            [event.target.name] : [event.target.value],
        });
    }
    async onHandleSubmitF (event) {
        const {password,email,name} = this.state;
        event.preventDefault();
        try {
            firebase.auth().createUserWithEmailAndPassword(email.toString(),password.toString())
            .then( async result => {
                firebase.firestore().collection("users")
                .add({
                    name : name,
                    id: result.user.uid,
                    email,
                    password,
                    URL: "",
                    message: [{ notificationId: "", number: 0}]
                })
                .then((docRef) => {
                    localStorage.setItem(LoginString.ID, result.user.uid);
                    localStorage.setItem(LoginString.name, name);
                    localStorage.setItem(LoginString.email, email);
                    localStorage.setItem(LoginString.password, password);
                    localStorage.setItem(LoginString.photoURL, "");
                    localStorage.setItem(LoginString.UPLOAD_CHANGED, "state_changed");
                    localStorage.setItem(LoginString.description, "");
                    localStorage.setItem(LoginString.firebaseDocumentID, docRef.id);
                    this.setState({
                        name: "",
                        password: "",
                        email: "",
                    });
                    this.props.history.push("/dashboard")
                })
            }).catch(error=>{
                console.log("Error while add user", error);
            });
        }
        catch(error) {
            console.log("Error try catch", error)
        };
    } 
    render(){
        return(
            <Fragment>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                            <form onSubmit={ this.onHandleSubmitF } className="login100-form validate-form flex-sb flex-w">
                                <span className="login100-form-title p-b-32">
                                    Account Register
                                </span>
                                <span className="txt1 p-b-11">
                                    Your name
                                </span>
                                <div className="wrap-input100 validate-input m-b-36" data-validate = "Username is required">
                                    <input onChange={ this.handleChangeInutField } className="input100" type="text" 
                                    name="name" />
                                    <span className="focus-input100"></span>
                                </div>
                                <span className="txt1 p-b-11">
                                    Your email
                                </span>
                                <div className="wrap-input100 validate-input m-b-36" data-validate = "Username is required">
                                    <input onChange={ this.handleChangeInutField } className="input100" type="text" 
                                    name="email" />
                                    <span className="focus-input100"></span>
                                </div>
                                
                                <span className="txt1 p-b-11">
                                    Password
                                </span>
                                <div className="wrap-input100 validate-input m-b-12" data-validate = "Password is required">
                                    <span onClick={ this.onShowPW } className="btn-show-pass">
                                        <i className="fa fa-eye"></i>
                                    </span>
                                    <input onChange={ this.handleChangeInutField } className="input100" 
                                    type={ this.state.showPW ? "text" : "password" } name="password" />
                                    <span className="focus-input100"></span>
                                </div>
                                
                                <div className="flex-sb-m w-full p-b-40">
                                    <div className="contact100-form-checkbox">
                                        <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
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
export default RegisterPage;