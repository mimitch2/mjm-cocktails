import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import '../css/FavoritesGrid.css';

const styles = theme => ({
  root: {
    marginTop: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  header: {
    borderRadius: "20px 20px 0px 0px"
  },
  gridList: {
    cursor: 'pointer',
    maxWidth: 800,
    maxHeight: 600,
    background: "#444444",
    borderRadius: "8px"
  },
  title: {
    color: 'white',
    fontSize: "1.4em"
  },

  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
});


function FavoritesGrid(props) {

  const { classes } = props;
  const tileData = [...props.favorites]
  
  const getDrinkId=(e)=>{
    props.getDrink(4, e.target.id)
    props.switchTab()
  }

  const handleFavClick=(data)=>{
    returnProperFavIcon(false)
    props.addRemoveFav(data);
    props.getDrink(4, data.idDrink)//this is here to fix a bug, maybe could do without it at some point, however it works well as far as UX
  }

  const returnProperFavIcon=(clicked)=>{
    if(clicked){
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
    <div className={classes.root} >
      <GridList cellHeight={350}
        className={classes.gridList}>
        <ListSubheader className={classes.header} cols={2} style={{ fontFamily: "Oswald", fontSize: "2.0em", fontWeight: "300", color: "white", height: "auto", padding: "10px"}} component="div" >
          Favorites
        </ListSubheader>
        {tileData.map(tile => (
          <GridListTile key={tile.idDrink}>
            <img src={tile.strDrinkThumb}  alt={tile.strDrink} id = {tile.idDrink} 
              style={{maxWidth: "400px"}} onClick={(e)=>getDrinkId(e)}/>
            <GridListTileBar
              title={tile.strDrink}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon ={
                <IconButton  id={tile} onClick={() => handleFavClick(tile)}>
                  <FavoriteIcon  style={returnProperFavIcon(true)}/>
                </IconButton>
              }
              actionPosition="left" />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );

}

// FavoritesGrid.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(FavoritesGrid);
