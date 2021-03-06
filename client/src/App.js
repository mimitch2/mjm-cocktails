import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import customTheme from "./components/Theme.js"
import Grid from '@material-ui/core/Grid'
import './css/App.css';
import FullWidthTabs from './containers/TabBarContainer.js'
import FetchDrinks from './containers/FetchDrinksContainer.js';
import TitlebarGridList from './containers/GridListContainer.js'
import SimpleListMenu from './components/SelectBoozeMenu'
import RaisedButtons from './components/RaisedButtons.js'
import IntegrationAutosuggest from './components/SearchFeild'
import CheckboxLabels from './components/Checkbox.js';
import SimpleSnackbar from './components/SnackBar.js';
import LinearIndeterminate from './components/Progress.js';
import PropTypes from "prop-types";
// import { BrowserRouter, Route, Switch } from "react-router-dom";

const styles ={
  flex: {
    justifyContent: "center"
  }
}

const boozeOptions = [
  'Bourbon', 'Whiskey', 'Vodka', 'Gin', 'Rum', 
  'Tequila', 'Scotch', "Brandy",'Vermouth', "Bailey's",
  'Wine', 'Beer'
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alchOnlyData: [],
      isLoaded: false,
      returnedDrink: [{//This is here just to have at least 1 drink prior to data loading
        _id: "5b2ab5ab04978014c1e980a6",idDrink: "13839",strDrink: "Manhattan",strCategory: "Cocktail",strIBA: "Unforgettables",strAlcoholic: "Alcoholic",strGlass: "Cocktail glass",strInstructions: "Stirred over ice, strained into a chilled glass, garnished, and seup.",strDrinkThumb: "/img/ec2jtz1504350429.jpg",strIngredient1: "Sweet Vermouth",strIngredient2: "Bourbon",strIngredient3: "Angostura bitters",strIngredient4: "Ice",strIngredient5: "Maraschino cherry",strIngredient6: "Orange peel",strMeasure1: "3/4 oz ",strMeasure2: "2 1/2 oz Blended ",strMeasure3: "dash ",strMeasure4: "2 or 3 ",strMeasure5: "1 ",strMeasure6: "1 twist of ",dateModified: "2017-09-02 12:07:09",
        __v: 0
      }],
      favorites: this.props.favorites,
      type: 0,
      boozeType: "",
      boozeSearchResults: {},
      nonAlcSwitch: false,
      sbSwitch: 1,
      favUnfavDrinkData: null
    };
  }
  
  componentDidMount(){
    this.props.loadFullData()
    this.props.loadFavorites()
  }

  //****************** componentDidUpdate *************************************/

  componentDidUpdate = (prevProps) => {
    if (prevProps.fullData !== this.props.fullData) {
      this.setState({ 
        alchOnlyData: this.props.fullData.filter(drk => drk.strAlcoholic === "Alcoholic"),
        favorites: this.props.favorites
      })
      this.getNewDrink(1, null)
      this.parseBoozeSearch()
    }
  }
     
  //****************** parseBoozeSearch *************************************/

  parseBoozeSearch = () => { 
    const tempArr =  []
    boozeOptions.forEach((booze)=> {
      tempArr[booze.toLowerCase()] = []
    })
    boozeOptions.forEach((booze)=> {
      this.props.fullData.forEach((drk) => {
        let found = false
        for(let key in drk) {
          if (drk[key] && drk[key] !== true){
            if(drk[key].toLowerCase().includes(booze.toLowerCase())){
              if(found === false){
                found = true
                tempArr[booze.toLowerCase()].push(drk)
              }
            }
          }
        }
      })
    })  
    this.setState({boozeSearchResults: tempArr}) 
  }

  //****************** filterAlchSwitch *************************************/

  filterAlchSwitch = (state) => {
    if(state === false){
      this.setState({nonAlcSwitch: false})
    }else{
      this.setState({nonAlcSwitch: true})
    }
  }
  
    //****************** returnFilteredDrinks *************************************/
  
    returnFilteredDrinks = () => {
      if(this.state.nonAlcSwitch){
        return this.props.fullData
      }else{
        return this.state.alchOnlyData
      }
    }

  //****************** getNewDrink *************************************/


  getNewDrink=(type, data)=>{
    setTimeout(() => {
      const dataArr = [...this.returnFilteredDrinks()]
      let drink = [];
      if (type === 1 || !type){//get random drink
        drink = [dataArr[Math.floor(Math.random() * dataArr.length)]]
      }  
      if (type === 2) {//search by booze type 
        const boozeArr = this.state.boozeSearchResults[data]    
        drink = [...boozeArr]
        this.setState({boozeType: data})
      }
      if (type === 3){//find specific drink by id OR name
        drink =[];
        const tempObj = this.props.fullData.find((result) => result.idDrink === data)
        drink.push(tempObj)
      }
      if (type === 4){//find favorite drink by id 
        drink =[];
        const tempObj = this.props.favorites.find((result) => result.idDrink === data)
        drink.push(tempObj)
      }
      setTimeout(() => {
        this.setState({
          returnedDrink: drink,
          type: type,
          isLoaded: true
        });
        this.makeRecipeList()
      }, 20);
    }, 10);
  }

  //******************** makeRecipeList **************************/

  makeRecipeList() {
    const fullRecipe = []
    const tempObj = this.state.returnedDrink[0]
    let measCount = 1
    for (let key in tempObj) {
      if(key === "strMeasure" + measCount.toString()){
        const mKey = tempObj[key]
        const iKey = tempObj["strIngredient" + measCount.toString()]
        fullRecipe.push(mKey + " " + iKey)
        measCount++
      } 
    }
    return fullRecipe.map((str, index)=>{
      return <li key={index} style={{padding: "2px"}}>{str}</li>
    })
    
  }

  //************************ renderDrink *************************/

  renderDrink=()=>{
    if(this.state.isLoaded){
      if(this.state.type === 2){
        return <TitlebarGridList returnedDrink={this.state.returnedDrink}
          addRemoveFav={this.dealWithFavorites}
          getDrink = {(type, data)=>this.getNewDrink(type, data)}
          boozeType={this.state.boozeType} />
      }
      return (<FetchDrinks 
        recipe = {this.makeRecipeList()}
        addRemoveFav={this.dealWithFavorites} myDrink={this.state.returnedDrink[0]}
      />)
    }
  }

  //********************* dealWithFavorites *****************************/

 dealWithFavorites = (drink) => {
   let tempFavs = [...this.props.favorites];
   if(!drink.favorite){     
     drink.favorite = true 
     this.props.addFav(drink);
     tempFavs.push(drink);
     this.setState({favUnfavDrinkData: drink, favorites: tempFavs})
   }else{
     drink.favorite = false
     this.props.deleteFav(drink.idDrink)
     const filterArr = tempFavs.filter(fav => fav.idDrink !== drink.idDrink)  
     this.setState({favUnfavDrinkData: drink, favorites: filterArr})
   }
   this.setState({sbSwitch: this.state.sbSwitch + 1})
   this.props.loadFavorites()
 }

  //*************** render **********************************/

 render() {
   if (!this.state.isLoaded){
     return (
       <div style={{height:"100vh", width:"100vw", display: "flex", justifyContent:"center", alignItems: "center"}}>
         <LinearIndeterminate />
       </div>
     )
   }
   return ( 
     <MuiThemeProvider theme={customTheme}>
       <div className="App">

         <FullWidthTabs
           getDrink = {(type, data)=>this.getNewDrink(type, data)}
           addRemoveFav={this.dealWithFavorites} lastId={this.idSort}
           drinkView = {
             <Grid container style = {styles.flex}>
               <Grid item xlg={12}>{this.renderDrink()}
               </Grid>
             </Grid>
           }
           controls = {
             <div>
               <Grid container style = {styles.flex}>
                 <Grid item xlg={3} style={{marginTop: "18px"}}>
                   <CheckboxLabels label="Include Non-Alcoholic Drinks" action ={this.filterAlchSwitch} />
                 </Grid>
                 <Grid item xlg={3}>
                   <RaisedButtons getDrink={(type, data)=>this.getNewDrink(type, data)}/>
                 </Grid>
                 <Grid item xlg={3}>
                   <SimpleListMenu 
                     getDrink={(type, data)=>this.getNewDrink(type, data)}
                     options={boozeOptions} />
                 </Grid>
                 <Grid item xlg={3}>
                   <div style={{marginLeft: "20px", marginTop: "-5px"}}>
                     <IntegrationAutosuggest getDrink={(type, data)=>this.getNewDrink(type, data)} drinks={this.returnFilteredDrinks()} alcSwitch={this.state.nonAlcSwitch} />
                   </div>
                 </Grid>
               
               </Grid>
             
             </div>}
         />
         <div id = "snack-bar-div" > 
           <SimpleSnackbar switch={this.state.sbSwitch} drinkData={this.state.favUnfavDrinkData}/>
         </div>
     
       </div>
     </MuiThemeProvider>
   );

 }
}

App.propTypes = {
  fullData: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired
};

export default App;
