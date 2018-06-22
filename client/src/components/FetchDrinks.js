import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import Grid from '@material-ui/core/Grid'

const style = {
  card:{
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    maxWidth: '800px',
    height: 'auto',
    marginTop: '20px',
    boxShadow: "0px 1px 5px 0px grey",
    borderRadius: "8px"

  },
  icon:{
    width: "48px",
    marginTop:"22px",
    marginLeft: "20px"
  },
  cocktailImage: {
    maxWidth: '100%',
    margin: '10px',
    marginLeft: "22px",
    marginBottom: "5px",
    border: '4px solid white',
    borderRadius: "4px"
  },
  recipe: {
    marginLeft: '40px',
    marginTop: '40spx',
    maxWidth: "350px",
    fontSize: "20px",
    height: "auto"
  },
  instructions: {
    padding: "40px",
    fontSize: "16px"
  },
  button: {
    color: 'white',
    fontSize: "30px"
  },
  buttonRed: {
    color: "red",
    fontSize: "30px"
  }
}


class FetchDrinks extends Component {

   handleFavClick=()=>{
     this.props.addRemoveFav(this.props.myDrink)
   }

   returnProperFavIcon=()=>{
     const isItInFavs = 
    this.props.favorites.filter(drk => drk.idDrink === this.props.myDrink.idDrink)
     if(isItInFavs.length > 0){
       return style.buttonRed
     }else{
       return style.button
     }
   }

   render(){
     return (
       <div className="fetch-drinks" style={style.card}>
         <Grid container spacing={24}>
           <Grid item sm={12}>
             <div style={{display: "flex"}}>
               <div style={style.icon} >
                 <IconButton id={this.props.myDrink.idDrink} onClick={this.handleFavClick}>
                   <FavoriteIcon style={this.returnProperFavIcon()} />
                 </IconButton>
               </div>
               <h1 id = "drink-name" style={{paddingTop: "10px", width: "maxContent", fontSize: "34px"}}>{this.props.myDrink.strDrink}</h1>
             </div>
           </Grid>

           <Grid item sm={6}>
             <img className = "cocktail-image"  src={this.props.myDrink.strDrinkThumb} alt="cocktail" style={style.cocktailImage}/>
           </Grid>

           <Grid item sm={6}>
             <h3 className = "recipe" style={style.recipe}> {this.props.recipe}</h3>
             <p id = "instruction-p" style={style.instructions}>{this.props.myDrink.strInstructions}</p>
           </Grid>

         </Grid>
       </div>
     );
   }
}

export default FetchDrinks;




