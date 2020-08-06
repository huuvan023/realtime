import React, { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

export default function PositionedSnackbar() {
    const [state, setState] = React.useState({
      open: true,
      vertical: 'top',
      horizontal: 'right',
    });
  
    const { vertical, horizontal, open } = state;
  
    const handleClick = (newState) => () => {
      setState({ open: true, ...newState });
    };
  
    const handleClose = () => {
      setState({ ...state, open: false });
    };

  
    return (
      <Fragment>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          autoHideDuration={4000}
          key={vertical + horizontal} >
              <Alert severity="error" >Please agree to the terms of use!</Alert>
        </Snackbar>
      </Fragment>
    );
}