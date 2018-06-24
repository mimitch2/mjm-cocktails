import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  progress: {
    width: "100%"
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div>
      <div style={{width: "400px"}}>
        <LinearProgress color="primary" className={classes.progress}/>
        <h2 style={{fontStyle: "italic", color: "grey", textAlign: "center"}}>...loading</h2>
      </div>
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);


