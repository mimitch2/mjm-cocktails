import React from 'react';
import Grid from 'material-ui/Grid';
// import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


const styles = {
  Typography:{
    fontFamily: 'Jura',
    fontSize: '1.5em'
  },
  AppBar: {
    backgroundColor: 'black',
    opacity: ".8",
    display: 'flex',
    justifyContent: 'center',
    height: "36px",
    boxShadow: "none"
  },
  root: {
    flexGrow: 1,
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (

    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <AppBar position="sticky" className={classes.AppBar}>
            <Toolbar>

              <Typography variant="title" color="inherit">
                <i className="fas fa-glass-martini" style={{marginRight: "10px", fontSize: "22px"}}></i>
                  GET ME A DRINK
              </Typography>

            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </div>

  );
}

// ButtonAppBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ButtonAppBar);
