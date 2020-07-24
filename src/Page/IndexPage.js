import React from 'react';
import Nav from './../Component/Dashboard/Nav';
import Main from './../Component/Dashboard/Main';
import MainResponsive from './../Component/Dashboard/MainResponsive';
import ResponsiveNav from './../Component/Dashboard/ResponsiveNav';

class IndexPage extends React.Component {
    constructor(props) {
        super(props); 
        this.state={
            stringMess:"ZaloPay - Ứng dụng thanh toán di động, chuyển-nhận tiền nhanh, an toàn theo tiêu Chuẩn Quốc Tế PCI-DSS.",
            toggleMiniMenu: false
        }
    }
    componentDidMount() { 
        if( window.innerWidth >= 0 && window.innerWidth <= 768 ){
            this.setState({
                toggleMiniMenu: true,
            });
        }
        window.addEventListener("resize",this.toggleMiniMenu);
    }
    toggleMiniMenu = () => {
        if( window.innerWidth >= 0 && window.innerWidth <= 768 ){
            this.setState({
                toggleMiniMenu: true,
            });
        }
        else {
            this.setState({
                toggleMiniMenu: false,
            });
        }
    }
    render(){
        var height = window.innerHeight;
        return(
            <div style={{ "height": height*(99.9/100) }} className="container-wrap">
                <nav  className="navMenu">
                    <Nav/>
                    <ResponsiveNav/>
                </nav>
                { !this.state.toggleMiniMenu ? <Main stringMess = { this.state.stringMess } /> : <MainResponsive/> }
            </div>
        );
    }
}
export default IndexPage;