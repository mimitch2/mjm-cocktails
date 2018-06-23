import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
  root: {
    color: "secondary",
    '&$checked': {
      color: "secondary",
    },
  },
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
};

class CheckboxLabels extends React.Component {
  state = {
    checkedG: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    setTimeout(() => {
      this.props.action(this.state.checkedG)
    }, 50);
    
  };

  render() {
    // console.log("render", this.state.checkedG);
    const { classes } = this.props;
    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedG}
              onChange={this.handleChange('checkedG')}
              value="checkedG"
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            />
          }
          label={this.props.label}
        />
      </FormGroup>
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default  withStyles(styles)(CheckboxLabels);