import React, { Fragment } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import PositionSnackbar from './../Component/Login/PositionSnackbar';
import { loadingLogin } from './../Component/Login/LoadingLogin'
import LoginString from './../Lib/LoginString';
import { checkUserLogins } from './../Lib/Dispatch';
import swal from 'sweetalert';
import Login from '../Component/Login/Login';


class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showPW: false,
            error: "",
            email: "",
            password: "",
            remember: true,
            name:"",
            loginLoading: false,
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
       if( event.target.name === "remember" ) {
            this.setState({
                remember: !this.state.remember
            })
       }
       else {
            this.setState({
                [event.target.name] : [event.target.value],
            });
       }
    }
    componentDidMount(){
        if( localStorage.getItem(LoginString.ID) ) {
            this.setState({loading: false},() => {
                swal({
                    title: "Success",
                    text: "Login successfully!",
                    icon: "success",
                    timer: 2000,
                    buttons: false,
                })
                .then( a => {
                    this.props.history.push("/dashboard")
                })
            })
        }
        else {
            this.setState({
                loading: false
            })
        }
    }
    async onHandleSubmitF(event) {
        var { email,password,remember } = this.state;
        event.preventDefault();
        this.setState({
            loginLoading: true,
            error: "",
        })

        try {
            await this.props.checkUserLogin(email,password,remember);
            this.setState({
                loginLoading: false,
            })
            if( this.props.userData.checkLogin === true ) {
                await swal({
                    title: "Success",
                    text: "Login successfully!",
                    icon: "success",
                    timer: 2000,
                    buttons: false,
                })
                .then( a => {
                    this.props.history.push("/dashboard")
                })
                
                
            }
            else if( this.props.userData.error !== "" ) {
                this.setState({
                    error: this.props.userData.error
                });
            }
        }
        catch(error) {
            alert("Error: ",error)
        }
    }
    
    render(){
        return this.state.loading === true ? ( loadingLogin() ) :
        ( 
        <Fragment>
                { this.state.loginLoading === true ? loadingLogin() : "" }
                { this.state.error !== "" ? <PositionSnackbar error = { this.state.error } /> : "" }
                
                <Login 
                remember = { this.state.remember }
                handleChangeInutField = { this.handleChangeInutField }
                onShowPW = { this.onShowPW }
                showPW = { this.state.showPW }
                onHandleSubmitF = { this.onHandleSubmitF }
                />
            </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userData: state.user
    }
}
const mapDispatchToProps = ( dispatch, props ) => {
    return {
        checkUserLogin: async (email,password,remember) =>{
            await dispatch( checkUserLogins(email,password,remember) )
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);