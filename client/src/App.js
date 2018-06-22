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
import CircularIndeterminate from './components/Progress.js';
// import PropTypes from "prop-types";
// import { BrowserRouter, Route, Switch } from "react-router-dom";

const styles ={
  flex: {
    justifyContent: "center"
  }
}

const boozeOptions = [
  'Bourbon','Whiskey','Vodka','Gin', 'Rum', 
  'Tequila', 'Scotch', "Brandy",'Vermouth', "Bailey's",
  'Wine', 'Beer'
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // fullData: null,
      alchOnlyData: [],
      isLoaded: false,
      returnedDrink: [],
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

  componentDidUpdate = (prevProps) => {
    if (prevProps.fullData !== this.props.fullData) {
      this.setState({ 
        alchOnlyData: this.props.fullData.filter(drk => drk.strAlcoholic === "Alcoholic"),//******put this in redux action */
        favorites: this.props.favorites
      })
      this.getNewDrink(1, null)
      this.parseBoozeSearch()
   
    }
  }
     
  // continueAfterData = () => {
  //   setTimeout(() => {
      
  //     this.setState({ 
  //       alchOnlyData: this.props.fullData.filter(drk => drk.strAlcoholic === "Alcoholic"),
  //       favorites: this.props.favorites
  //     })
  //     // console.log(this.props.fullData, this.state.favorites);
  //     this.parseBoozeSearch()
  //     this.getNewDrink(1, null)
  //   }, 2000);
  // }
    
    
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
          boozeType={this.state.boozeType} /* favorites={this.state.favorites} */ />
      }
      return (<FetchDrinks 
        recipe = {this.makeRecipeList()}
        addRemoveFav={this.dealWithFavorites} myDrink={this.state.returnedDrink[0]}
        /* favorites={this.state.favorites} */ />)
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
     return <CircularIndeterminate />
   }
   return ( <MuiThemeProvider theme={customTheme}>
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
               <Grid item xlg={4}>
                 <RaisedButtons getDrink={(type, data)=>this.getNewDrink(type, data)}/>
               </Grid>
               <Grid item xlg={4}>
                 <SimpleListMenu 
                   getDrink={(type, data)=>this.getNewDrink(type, data)}
                   options={boozeOptions} />
               </Grid>
               <Grid item xlg={4}>
                 <div style={{marginLeft: "20px"}}>
                   <IntegrationAutosuggest getDrink={(type, data)=>this.getNewDrink(type, data)} drinks={this.returnFilteredDrinks()} alcSwitch={this.state.nonAlcSwitch} />
                 </div>
               </Grid>
             </Grid>
             <Grid container style={ {justifyContent: "center", marginLeft: "173px"} }>
               <Grid item xlg={12}>
                 <CheckboxLabels label="Include Non-Alcoholic Drinks" action ={this.filterAlchSwitch} />
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

export default App;
