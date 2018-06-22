import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import "../css/App.css"


const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  }
});

class SimpleSnackbar extends React.Component {
  state = {
    open: false,
  };

  componentDidUpdate(prevProps) { 
    if(prevProps.switch !== this.props.switch){
      setTimeout(() => {
        this.handleClick()
      }, 10);
    }
  }

  returnProperText = () => {
    if(this.props.drinkData){
      if(this.props.drinkData.favorite){
        return `${this.props.drinkData.strDrink} added to favorites`
      }else if(!this.props.drinkData.favorite){
        return `${this.props.drinkData.strDrink} removed from favorites`
      }
      return "Placeholder"
    }
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          snackbarcontentprops={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id" style={{fontSize: "1.4em"}}>{this.returnProperText()}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              // color="secondary"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon color="error" style={{fontSize:"30px"}}/>
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);