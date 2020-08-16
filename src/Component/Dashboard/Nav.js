import React, { Fragment } from 'react';
import  Avatar  from '@material-ui/core/Avatar'
import ButtonOpenConfigLogout from './ButtonOpenConfigLogout';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
  });
  function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
  
   
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle onClose={handleClose} id="simple-dialog-title">Your profile</DialogTitle>
        Test
      </Dialog>
    );
  }

  var open = false;

class Nav extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
    handleCloseDialog = () => {
        this.setState({
            open: false,
        })
    }
render(){
    return(
        <Fragment>
            <SimpleDialog  open ={ this.state.open } onClose = { this.handleCloseDialog } />
            <div className="menuTab">
                <div className="avatar">
                <Avatar src="./user.svg" alt="" style ={{ "cursor":"pointer" }}
                onClick = { () => { this.setState({ open: true }) } }
                className="avtNavMain" />
                    <span className="avtOnline"></span>
                </div>
                <div className="tabList-bottom">
                    
                    <div>
                    
                        <ButtonOpenConfigLogout/>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
}
export default Nav;