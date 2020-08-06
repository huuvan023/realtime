import React, { Fragment } from 'react';
import '../App.css';
import LoginString from './../Lib/LoginString';
import ResetPassword from './../Component/ResetPassWord/ResetPassword'
import { connect } from 'react-redux';
import { loadingRS } from './../Component/ResetPassWord/LoadingRS';
import { resetPassword } from './../Lib/Dispatch';
import swal from 'sweetalert';

class ForgetPWPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            loading: true,
            loadingReset: false,
        };
    }
    handleChangeInput = (event) => {
        this.setState ({
            email: event.target.value
        })
    }
    onSubmitFom = async (event) => {
        event.preventDefault();
        this.setState({
            loadingReset: true
        })
        try {
            await this.props.onResetPassword( this.state.email );
            if(this.props.resetStatus.status === true  ) {
                this.setState({loadingReset: false},() => {
                    swal({
                        title: "Success",
                        text: "Please check the mail box to reset your password!",
                        icon: "success",
                        timer: 10000,
                    })
                })
            }
            else {
                this.setState({loadingReset: false},() => {
                    swal({
                        title: "Error",
                        text: this.props.resetStatus.message,
                        icon: "error",
                        timer: 10000,
                    })
                })
            }
        }
        catch (err) {
            alert(err)
        }
        this.setState({
            loadingReset: false
        })
    }
    componentDidMount(){
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
    render(){

        return this.state.loading === true ? 
        ( loadingRS() )
        :
        (
        <Fragment>
            { this.state.loadingReset === true ? ( loadingRS() ) : "" }
            <ResetPassword 
            value = { this.state.email }
            handleChangeInput = { this.handleChangeInput }
            onSubmitFom = { this.onSubmitFom }
            />
        </Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        resetStatus: state.user
    }
}
const mapDispatchToProps = ( dispatch, props ) =>{ 
    return {
        onResetPassword: async (email) => {
            await dispatch( resetPassword(email) )
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ForgetPWPage);