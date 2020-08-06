import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import SearchIcon from '@material-ui/icons/Search';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { red , brown,blueGrey } from '@material-ui/core/colors';
import FabButtonAddFriend from './FabButtonAddFriend'
import { sizing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    cardcontent : {
        marginBottom:"20px",
        width:"100% ",
        padding:"auto 40px !important"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid red',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    closebtn:{
        cursor: "pointer",
    },

    FabBtn:{
        width:"100%",
        padding:"auto 40px !important"
    },
        gridCL:{
        height: "10px",
    },
    cardheader: {
        backgroundColor:`${blueGrey[50]}`,
        borderBottom:`1px solid ${brown[200]}`,
    }
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen,expanded, setExpanded, closeBtnHover] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <div className="i"><i onClick={handleOpen} className="fas fa-user-plus"></i></div>
      <Modal
        disableEnforceFocus = { true }
        disableAutoFocus = { true }
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
            <Card className={classes.root}>
            <CardHeader
                className={classes.cardheader}
                action={
                <CloseIcon onClick={ handleClose }
                className={ classes.closebtn } aria-label="settings">
                </CloseIcon>
                }
                title="Add new friend"/>
                <CardContent className={ classes.cardcontent } >
                    <form style={{"width":"100%"}} autoComplete="off">
                    <Box component="span" display="flex" m={1}>
                        <TextField id="input-with-icon-grid" style={{"width":"100%"}} label="Type your email to find..." />
                        <Box component="span">
                            <FabButtonAddFriend />
                        </Box>
                       
                    </Box>
                    </form>
                </CardContent>
                <CardContent style={{"marginTop":"20px","minHeight":"100px"}}>
                    <div className = "list">
                            <div className="messageCard">
                                <div>
                                    <img src="./avt.jpg" alt="" />
                                </div>
                                <div className="mess-summary">
                                    <div className="head-summary">
                                        <span className="summ-n">Huu van</span>
                                    </div>
                                    <div className="body-summary">
                                        <p className="summ-mess-bd">
                                            hvan@gmail.com
                                        </p>
                                        { /*<span  className="summ-mess-more"> </span>*/}
                                    </div>
                                </div>
                            </div>
                    </div>
                </CardContent>
            </Card>
        </Fade>
      </Modal>
    </Fragment>
  );
}

