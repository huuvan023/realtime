import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { shadows } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      padding:"0 !important",
      width: "100%",
      height: "auto",
      boxSizing:"border-box"
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab:{ 
       marginBottom:"0 !important",
       marginLeft:"0 !important"
  },
  addicon:{ 
       
   
  }
}));

export default function FloatingActionButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab  m={0} p={0} className={ classes.fab } aria-label="add">
        <SearchOutlinedIcon className={ classes.addicon } />
      </Fab>
    </div>
  );
}
