import React, { Fragment } from 'react';
import '../App.css';
import LoginString from './../Lib/LoginString';
import swal from 'sweetalert';
import Register from '../Component/Register/Register';
import { connect } from 'react-redux';
import { loadingRegister } from './../Component/Register/LoadingRegister';
import { submitRegister } from './../Lib/Dispatch';
import PositionSnackbar from './../Component/Register/PositionSnackbar';

class RegisterPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            error: "",
            agreeTermOfUse: false,
            showPW: false,
            loading: true,
            loadingRegister: false,
            showAgreement: false
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
    componentDidMount() {
        if( localStorage.getItem(LoginString.ID) ) {
            this.setState({loading: false},() => {
                this.props.history.push("/")
            })
        }
        else {
            this.setState({
                loading: false
            })
        }
    }
    onChangeAgree = () => {
        this.setState({
            agreeTermOfUse : !this.state.agreeTermOfUse
        })
    }
    async onHandleSubmitF (event) {
        const {password,email,name} = this.state;
        event.preventDefault();
        await this.setState({
            loadingRegister: true
        })
        if( this.state.agreeTermOfUse === true ) {
            await this.props.onSubmitRegister(email,password,name);
            if( this.props.registerStatus.status !== true ) {
                await this.setState({
                    loadingRegister: false,
                    error: this.props.registerStatus.message,
                });
                await swal({
                    title: "Error",
                    text: this.state.error,
                    icon: "error",
                    timer: 2000,
                    buttons: false,
                })
                    
            }
            else {
                await this.setState({
                    loadingRegister: false
                })
                await swal({
                    title: "Register successfully!",
                    text: "",
                    icon: "success",
                    button: "Login"
                })
                .then( () => {
                    this.props.history.push("/")
                })
                .catch( error => console.log(error) )
            }
        }
        else {
            this.setState({
                loadingRegister: false,
                showAgreement: true
            })
        }
    } 
    render(){
        return this.state.loading === true ? ( loadingRegister() )
        :
        (
        <Fragment>
            { this.state.loadingRegister === true ? loadingRegister() : "" }
            { this.state.showAgreement === true ? <PositionSnackbar /> : "" }
            <Register
            showPW = { this.state.showPW }
            onShowPW = { this.onShowPW }
            onHandleSubmitF = { this.onHandleSubmitF }
            handleChangeInutField = { this.handleChangeInutField }
            agreeTermOfUse = { this.state.agreeTermOfUse }
            onChangeAgree = { this.onChangeAgree }
            />
        </Fragment>
        );
    }
}
const mapStateToProps = ( state ) => {
    return {
        registerStatus: state.user
    }
}
const mapDispatchToProps = ( dispatch, props ) => {
    return {
        onSubmitRegister : async (email,password,name) => {
            await dispatch( submitRegister(email,password,name) )
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RegisterPage);