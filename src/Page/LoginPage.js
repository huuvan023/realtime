import React, { Fragment } from 'react';
import '../App.css';
import { TextField } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom';
import LoginString from './../Lib/LoginString';
import { toast } from 'react-toastify';
import firebase from './../Services/Firebase';

class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showPW: false,
            email: "",
            password: "",
            name:"",
            error: null,
            loading: true,
        };
        this.onHandleSubmitF = this.onHandleSubmitF.bind(this)
        this.handleChangeInutField = this.handleChangeInutField.bind(this);
        this.onShowPW = this.onShowPW.bind(this);
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
    componentDidMount(){
        if( localStorage.getItem(LoginString.ID) ) {
            this.setState({loading: false},() => {
                this.setState({loading: false});
                this.props.history.push("/dashboard");
            })
        }
        else {
            this.setState({
                loading: false
            })
        }
    }
    async onHandleSubmitF(event) {
        var { email,password } = this.state;
        event.preventDefault();
        try {
            this.setState({error:""});
            await firebase.auth().signInWithEmailAndPassword(email.toString(), password.toString())
            .then( async (result) => {
                let user = result.user;
                if( user ) {
                    await firebase.firestore().collection("users")
                    .where("id", "==", user.uid).get()
                    .then((querySnapShot) => {
                        querySnapShot.forEach((doc) => {
                            const currentData = doc.data();
                            localStorage.setItem(LoginString.firebaseDocumentID, doc.id);
                            localStorage.setItem(LoginString.ID, currentData.id);
                            localStorage.setItem(LoginString.name, currentData.name);
                            localStorage.setItem(LoginString.email, currentData.email);
                            localStorage.setItem(LoginString.message,currentData.message)
                        })
                        this.props.history.push("/dashboard");
                    })
                }
            })
            .catch((error) => {
                window.alert( error);
            })
        }
        catch(error) {
            console.log("Error before login",error);
        }
    }
    render(){
        return this.state.loading === true ? 
        (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only text-center">Loading...</span>
            </div>
        )
        :
        ( <Fragment>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
                            <form onSubmit={ this.onHandleSubmitF } className="login100-form validate-form flex-sb flex-w">
                                <span className="login100-form-title p-b-32">
                                    Account Login
                                </span>

                                <span className="txt1 p-b-11">
                                    Your Email
                                </span>
                                <div className="wrap-input100 validate-input m-b-36" data-validate = "Username is required">
                                    <input onChange={ this.handleChangeInutField } className="input100" type="text" name="email" />
                                    <span className="focus-input100"></span>
                                </div>
                                
                                <span className="txt1 p-b-11">
                                    Password
                                </span>
                                <div className="wrap-input100 validate-input m-b-12" data-validate = "Password is required">
                                    <span onClick={ this.onShowPW } className="btn-show-pass">
                                        <i className="fa fa-eye"></i>
                                    </span>
                                    <input onChange={ this.handleChangeInutField } className="input100" type={ this.state.showPW ? "text" : "password" } name="password" />
                                    <span className="focus-input100"></span>
                                </div>
                                
                                <div className="flex-sb-m w-full p-b-5">
                                    <div className="contact100-form-checkbox">
                                        <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
                                        <label className="label-checkbox100" htmlFor="ckb1">
                                            Remember me
                                        </label>
                                    </div>
                                    <div>
                                        <Link to="/forgetpassword" className="txt3">
                                            Forgot Password?
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
export default LoginPage;