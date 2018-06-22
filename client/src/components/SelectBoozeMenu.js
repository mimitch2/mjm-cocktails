import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import "../css/App.css"

const styles = theme => ({
  root: {
    width: 135,
    height: "40px",
    backgroundColor: "#444444",
    boxShadow: "0px 1px 5px 0px grey",
    borderRadius: "5px",
  
  }
});

class SimpleListMenu extends React.Component {
  state = {
    anchorEl: null,
    selectedIndex: 0,
    options: this.props.options
  };

  button = undefined;

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null});
    const boozeType = this.props.options[index]
    this.props.getDrink(2, boozeType.toLowerCase())
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <List component="nav" style={{padding: "0px", marginTop: "10px"}}>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="Choose by booze type"
            onClick={this.handleClickListItem}
          >
            {/* <i class="fas fa-chevron-down"></i> */}
            <ListItemText
              primary={<div style={{color:"white", fontSize: "14px", width: "max-content", marginLeft: "-8px", marginTop: "-3px"}}>BOOZE TYPE<i className="fas fa-chevron-down" style={{fontSize: '16px', color:"white", marginLeft:"24px"}}></i></div>}>
            </ListItemText>
          </ListItem>
        </List>
        <Menu

          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.options.map((option, index) => (
            <MenuItem
              style={{fontFamily: "Jura", width: 130}}
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

SimpleListMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleListMenu);
