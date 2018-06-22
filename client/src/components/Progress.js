import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
// import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  progress: {
    marginRight: "30%",
    marginLeft: "30%"
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div sytle={{display: "flex", justifyContent: "center", alignItems: "center"}}>
    
      <div style={{marginTop: "50vh"}}>
  
        <LinearProgress color="primary" className={classes.progress}/>
        {/* <CircularProgress className={classes.progress} color="secondary" thickness={6} size={60} /> */}
        <h2 style={{marginLeft: "43%", fontStyle: "italic", color: "grey"}}>...Loading</h2>
      </div>
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);


