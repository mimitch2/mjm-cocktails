import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  button: {
    marginTop: '10px',
    width: 135,
    height: "40px",
    marginRight: '20px',
    background: "#444444",
    color: 'white',
    fontSize: "14px",
    borderRadius: "6px"
  },

  input: {
    display: 'none',
  },
});

function RaisedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="raised" style={styles.button} className={classes.button}  
        onClick={()=>props.getDrink(1,null)}>
        RANDOM DRINK
      </Button>
    </div>
  );
}

RaisedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RaisedButtons);
