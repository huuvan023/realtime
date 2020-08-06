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
  const useStyles = makeStyles({
    dialogTitle: {
      color: blue[800],
      fontSize: 30,
      fontWeight: 700,
      textAlign: "center"
    },
  });
  const classes = useStyles();

  const handleDeleteConver = () => {
    setAnchorEl(null);
    confirmAlert({
        message: 'Confirm delete this conversation ?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              alert("Deleted message sucessfully!")
            }
          },
          {
            label: 'No',
            onClick: () => {
            }
          }
        ]
      });
  };
  const handleDevelop = () => {
      alert("Capsules are in the process of development! =))");
  }
  return (
    <Fragment>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <i style={{"fontSize":"20px"}} className="fas fa-ellipsis-h"></i>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        className="menuITWrapIT"
        open={Boolean(anchorEl)}
        onClose={handleClose} >
      <MenuItem className="menuITchild" onClick={handleDeleteConver}>Delete conversation</MenuItem>
      <MenuItem className="menuITchild" onClick={handleDevelop}>Block user</MenuItem>
      <MenuItem className="menuITchild" onClick={handleDevelop}>Hide conversation</MenuItem>
      </Menu>
    </Fragment>
  );
}