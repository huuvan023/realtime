import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import firebase from './../../Services/Firebase'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useHistory } from "react-router";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const historyy = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLoout = () => {
    setAnchorEl(null);
    confirmAlert({
      title: 'Xác nhận',
      message: 'Xác nhận đăng xuất ?',
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
     
    /*
        firebase.auth().signOut();
        this.props.history.push("/");
        localStorage.clear();   */
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
        className="menuITWrapIT"
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className="menuITchild" onClick={handleClose}>Giới thiệu</MenuItem>
        <MenuItem className="menuITchild" onClick={handleClose}>Thông tin liên hệ</MenuItem>
        <MenuItem className="menuITchild" onClick={handleLoout}>Đăng xuất</MenuItem>
      </Menu>
    </Fragment>
  );
}