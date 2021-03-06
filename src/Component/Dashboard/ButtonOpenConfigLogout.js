import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme,makeStyles } from '@material-ui/core/styles';
import firebase from './../../Services/Firebase'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useHistory } from "react-router"; 
import { Redirect } from 'react-router-dom'
import { blue } from '@material-ui/core/colors';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const historyy = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null);
  };
 
  const useStyles = makeStyles({
    dialogTitle: {
      color: blue[800],
      fontSize: 30,
      fontWeight: 700,
      textAlign: "center"
    },
  });
  const classes = useStyles();
  const handleLoout = () => {
    setAnchorEl(null);
    confirmAlert({
      message: 'Confirm logout ?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            await firebase.auth().signOut();
            await localStorage.clear();
            await historyy.push({
                    pathname : "/"
                  })
                  
          }
        },
        {
          label: 'No',
          onClick: () => {
            
          }
        }
      ]
    });
  }


  return (
    <Fragment>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <i aria-controls="fade-menu" aria-haspopup="true" className="fas fa-cog"></i>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        style={{"textAlign":"center"}}
        className="menuITWrapIT"
        open={Boolean(anchorEl)}
        onClose={handleClose} >
      <MenuItem className="menuITchild" onClick={handleClickOpen}>Introduce Awesome chat</MenuItem>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle className= { classes.dialogTitle }  id="responsive-dialog-title">{"Awesome chat"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
              Created by a programming enthusiast and loves learning new things!
              <br/>
              <span style={{"display":"block","textAlign":"center","fontWeight":"bold"}} >Coppyright @2020</span>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        <MenuItem className="menuITchild"><a href="https://fb.com/huu.van.20x" target="_blank">Contact supporter</a></MenuItem>
        <MenuItem className="menuITchild" onClick={handleLoout}>Logout</MenuItem>
      </Menu>
    </Fragment>
  );
}