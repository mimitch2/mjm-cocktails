import React from 'react';
// import PropTypes from 'prop-types';
import "../css/App.css"
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from '@material-ui/core/Typography';
import FavoritesGrid from "../containers/FavoritesGridContainer.js"
import Badge from '@material-ui/core/Badge';
import SubmitForm from './SubmitForm';


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

          <span style={{ fontSize: "24px", marginTop: "8px", marginLeft: "10px"}}>I NEED A DRINK</span> 

          <div className="icon" style={{marginBottom: "-40px", marginTop: "6px", marginLeft:"10px", display: "flex", alignItems: "center"}}>
            <img src="/img/MartiniGlass.png" alt="" height="55px" width="55px" />
          </div>

          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="inherit"
            centered>

            <Tab label="Find Drinks" />
           
            <Tab label={ 
              <Badge className={classes.padding} color="primary" badgeContent={this.props.favorites.length} >Favorites
              </Badge>
            }/>

            <Tab label="Add Drinks" />
            
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
            <FavoritesGrid /* favorites={this.props.favorites} */
              returnedDrink={this.props.returnedDrink}
              addRemoveFav={this.props.addRemoveFav} 
              getDrink={this.props.getDrink} 
              switchTab={this.switchTabsOnFavClick}/>
          </TabContainer>

          <TabContainer dir={theme.direction}><SubmitForm fullData={this.props.fullData}/></TabContainer>

          <TabContainer dir={theme.direction}>Put something fucking awesome here</TabContainer>

        </SwipeableViews>

      </div>
    );
  }
}

// FullWidthTabs.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
