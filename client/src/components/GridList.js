import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';


const styles = theme => ({
  root: {
    marginTop: '8px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',

  },
  gridList: {
    cursor: 'pointer',
    maxWidth: 800,
    maxHeight: 600,
    background: "#444444",
  },
  title: {
    color: 'white',
    fontSize: "1.4em"
  },

  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  buttonRed: {
    fontSize: "24px",
    color: "red"
  },
  button: {
    fontSize: "24px",
    color:  "white"
  }

});

function TitlebarGridList(props) {
  // console.log(props);
  
  const { classes } = props;
  const tileData = [...props.returnedDrink]

  const getDrinkId=(e)=>{
    props.getDrink(3, e.target.id)
  }

  const handleFavClick=(data)=>{
    props.addRemoveFav(data)
  }

  const returnProperFavIcon=(data)=>{
    const isItInFavs = 
    props.favorites.filter(drk => drk.idDrink === data.idDrink)
    if(isItInFavs.length > 0){
      return {
        fontSize: "24px",
        color: "red"
      }
    }else{
      return {
        fontSize: "24px",
        color:  "white"
      }
    }
  }
  
  return (
    <div className={classes.root}>
      <GridList cellHeight={350}
        className={classes.gridList}>
        <ListSubheader cols={2} style={{ fontFamily: "Oswald", fontSize: "2.0em", fontWeight: "300", color: "white", height: "auto", padding: "10px"}} component="div" >{tileData.length}&nbsp;{props.boozeType.charAt(0).toUpperCase() + props.boozeType.slice(1)}&nbsp;Drinks. &nbsp;Click picture to get recipe.
        </ListSubheader>
   
        {tileData.map((tile, index) => (
          <GridListTile key={index}>
            <img src={tile.strDrinkThumb}  alt={tile.strDrink} 
              id = {tile.idDrink} style={{opacity: "1", maxWidth: "400px"}}
              onClick={(e)=>getDrinkId(e)}/>
            <GridListTileBar
              title={tile.strDrink}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon ={
                <IconButton  id={tile} onClick={() => handleFavClick(tile)}>
                  <FavoriteIcon  style={returnProperFavIcon(tile)}/>
                </IconButton>
              }
              actionPosition="left"
            />

          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);