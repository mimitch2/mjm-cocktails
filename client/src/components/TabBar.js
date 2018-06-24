import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FavoritesGrid from "../containers/FavoritesGridContainer.js"
import Badge from '@material-ui/core/Badge';
import SubmitForm from '../containers/SubmitFormContainer';
import Info from './Info'


function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100vw",
    opacity: 1
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  indicator: {
    height: "3px"
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0
  };
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

 
  switchTabsOnFavClick=()=>{
    if (this.state.value !== 0){
      this.setState({value: 0})
    }
  }
  
  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>

        <AppBar position="sticky" color="default" style={{backgroundColor: 'rgb(60, 60, 60)', color: "white"}}>

          <span style={{ fontSize: "24px", marginTop: "44px", marginLeft: "35px", fontWeight: "500",postion: "absolute"}}>&nbsp; NEED A DRINK</span> 

          <div className="icon" style={{marginBottom: "-35px", marginTop: "-62px", marginLeft:"10px", display: "flex", alignItems: "center"}}>
            <img src="/img/MartiniGlass.png" alt="" height="65px" width="55px" />
          </div>

          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            centered
            classes={{indicator: classes.indicator}}
          >

            <Tab label="Find Drinks" />
            <Tab label={ 
              <Badge className={classes.padding} color="primary" badgeContent={this.props.favorites.length} >Favorites
              </Badge>}
            />
            <Tab label="Add A Drink" />        
            <Tab label="Info" />
          </Tabs>

        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}>
                
          <TabContainer dir={theme.direction}>{this.props.controls}{this.props.drinkView}</TabContainer> 

          {/* *********** Try putting Link around  this container******** */}
          <TabContainer dir={theme.direction}>
            <FavoritesGrid 
              returnedDrink={this.props.returnedDrink}
              addRemoveFav={this.props.addRemoveFav} 
              getDrink={this.props.getDrink} 
              switchTab={this.switchTabsOnFavClick}/> 
          </TabContainer>

          <TabContainer dir={theme.direction}><SubmitForm /></TabContainer>

          <TabContainer dir={theme.direction}><Info /></TabContainer>

        </SwipeableViews>

      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
