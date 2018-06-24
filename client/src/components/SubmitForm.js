import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import CheckboxLabels from './AlchCheckbox.js';
import AlertDialogSlide from './Alert'
import '../css/SubmitForm.css'



//**** material-ui specific styles, all others in css file or in-line ********/

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "40%"
  },
  lgTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "90%",
    floatingLabelStyle: "white"
  },
  white: {
    color: 'primary'
  }
});


class SubmitForms extends React.Component {

  //******************** state **********************/

  state = {
    alertSwitch: 0,
    submitSwitch: 0,
    measureIngCount: 1,
    recipeLines:[],
    name: '',
    measure: '',
    ingredient: '',
    instructions: '',
    alcoholic: "Alcoholic",
    drink:{
      idDrink:'', strDrink:'', strAlcoholic:'',
      strInstructions:'', strDrinkThumb:'', strIngredient1:'',
      strMeasure1:''
    },
    lastId:""
  };

  //******************** mount **********************/

  componentDidMount = () => {
    document.getElementById('icon-button-file').addEventListener('change', this.handleFileSelect, false)
    
    document.getElementById("measure").addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("add-line").click();
      }
    });

    document.getElementById("ingredient").addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("add-line").click();
      }
    });
    this.idSort()
  }

  //******************** handleFileSelect **********************/

   handleFileSelect = (e) => {
     const files = e.target.files;
     const f = files[0];
     const reader = new FileReader();
     
     reader.onload = (function(theFile) {
       return function(e) {
         console.log(e.target.result);
         document.getElementById('list').innerHTML = ['<img src="', e.target.result,'" title="', theFile.name, '" width="300" />'].join('');
       };
     })(f);
       
     reader.readAsDataURL(f);
   }

  //******************** handleChange **********************/

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  //******************** handleAddClick **********************/

  handleAddClick = () => {
    const measureCount = `strMeasure${this.state.measureIngCount}`
    const ingCount = `strIngredient${this.state.measureIngCount}`
    const tempDrink = {...this.state.drink}
   
    if(this.state.ingredient && this.state.measure){
      tempDrink[measureCount] = this.state.measure
      tempDrink[ingCount] =  this.state.ingredient
      const tempRecipe = 
      [...this.state.recipeLines, `${this.state.measure} ${this.state.ingredient}`]
      this.setState({measure: "",
        ingredient: "", measureIngCount: this.state.measureIngCount + 1,
        recipeLines: tempRecipe, drink: tempDrink
      })
      this.renderList()
      document.getElementById("measure").focus()
    }
  }

  //******************** handleRemove **********************/

  handleRemove = () => {
    this.setState({recipeLines: [],
      drink: {
        idDrink:'', strDrink:'', strAlcoholic:'',
        strInstructions:'', strDrinkThumb:'', strIngredient1:'',
        strMeasure1:''
      }})
    this.renderList()
  }

  //****************** idSort *************************************/

  idSort = () => {
    const idSort = this.props.fullData.map(id => id.idDrink).sort()
    this.setState({lastId: idSort[idSort.length -1]})
    
  }

  //******************** handleSubmit **********************/

  handleSubmit = () => {
    if(this.state.recipeLines.length > 0 && this.state.instructions &&
    this.state.name ) {
      const id = parseInt(this.state.lastId, 10) + 1
      const tempDrink = {...this.state.drink}
      tempDrink.idDrink = id.toString()
      tempDrink.strDrink = this.state.name
      tempDrink.strAlcoholic = this.state.alcoholic
      tempDrink.strInstructions = this.state.instructions
      tempDrink.strDrinkThumb = "img/default.jpg"
      tempDrink.dateModified = Date()
      setTimeout(() => {
      }, 400);
      this.setState({
        measureIngCount: 1, recipeLines:[], name: '',
        measure: '', ingredient: '', instructions: '',
        alcoholic: "Alcoholic",
        drink:{
          idDrink:'', strDrink:'', strAlcoholic:'',
          strInstructions:'', strDrinkThumb:'', 
          strIngredient1:'', strMeasure1:''
        },
        submitSwitch: this.state.submitSwitch + 1,
        lastId: id
      })
      this.props.addDrink(tempDrink);
      document.getElementById('list').innerHTML = ""
    }else{
      this.setState({alertSwitch: this.state.alertSwitch + 1})
    }
  }

  //******************** alchoholicSwitch **********************/

  alchoholicSwitch = () => {
    // const imgValue = document.getElementById("icon-button-file")
    if (this.state.alcoholic){
      this.setState({alcoholic: "Non alcoholic"})
    }else{
      this.setState({alcoholic: "Alcoholic"})
    }
  }

  //******************** renderList **********************/
 
  renderList = () => {
    return this.state.recipeLines.map((line,index) => <li style={{fontSize: "16px"}} 
      key={index}> {`${line} ${index + 1}`} </li>)
  }

  renderRemoveDiv = () =>{
    if(this.state.recipeLines.length > 0){
      return (
        <div style={{marginLeft: "-10px", marginTop: "8px"}}>
          <IconButton
            style={{width: "28px", height: "28px"}}
            key="close"
            aria-label="Close"
            onClick={this.handleRemove}>
            <CloseIcon color="primary" style={{fontSize:"22px"}} />
          </IconButton>
          <span style={{marginTop: "4px"}}>Remove recipe</span>  
        </div>
      )
    }else{
      return ""
    }
  }

  //******************** render **********************/

  render() {
    const { classes } = this.props;
    
    return (
      <div className="submit-form-root">
   
        <form className = "upper" noValidate autoComplete="off" id="form">
          <div className="upperLeft">
            
            <div>
              <TextField
                id="name" label="Drink Name" 
                className={classes.lgTextField}
                value={this.state.name} onChange={this.handleChange}
                margin="normal"
              />
            </div>
            
            <div>
              <TextField
                id="measure" label="Measure" className={classes.textField}
                value={this.state.measure} onChange={this.handleChange}
                margin="normal"
              />

              <TextField
                id="ingredient" label="Ingredient" value={this.state.ingredient} 
                className={classes.textField} onChange={this.handleChange}
                margin="normal"
              />

              <Tooltip enterDelay={500} id="tooltip-top-end" title="Click to add recipe line" placement="top-end">
                <Button  mini={true} className="addButton" variant="fab" color="primary" aria-label="add" 
                  onClick={this.handleAddClick} id="add-line">
                  <AddIcon />
                </Button>
              </Tooltip>
            </div>

            <div>
              <TextField
                multiline={true} id="instructions" label="Instructions"
                value={this.state.instructions} className={classes.lgTextField}
                onChange={this.handleChange} margin="normal"
              />
            </div>

          </div>
            
          <div className="upperRight" >
            <div>
              <CheckboxLabels label="Alchoholic" action = {this.alchoholicSwitch} id="checkbox-color"/>
            </div>

            <div>
              <input accept="image/*" className="input" id="icon-button-file" type="file" />
              <label htmlFor="icon-button-file">
                <Tooltip enterDelay={500} id="tooltip-left-start" title="Click to add photo" placement="left-start">
                  <Button color="primary" variant="fab" className="cameraButton" component="span">
                    <PhotoCamera className="cameraIcon"/>
                  </Button>
                </Tooltip>
              </label>
            </div>

            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
              <Tooltip enterDelay={500} id="tooltip-bottom-start" title="Click to submit your drink" placement="bottom-start">
                <Button variant="contained" color="secondary" className="submitButton" 
                  onClick={this.handleSubmit}>
                      Submit
                </Button>
              </Tooltip>
            </div>    

          </div>

        </form>
  
        <div className="lower">
          <div className="lowerLeft">
            <div>
              <h2>Name:</h2>
              <p style={{fontSize: "18px"}}>{this.state.name}</p>   
            </div>
       
            <div>
              <h2>Recipe:</h2>
              {this.renderList()}
              {this.renderRemoveDiv()}
            </div>
          
            <div style={{marginTop: "10px"}}>
              <h2>Instructions:</h2>
              <p>{this.state.instructions}</p>
            </div>
          </div>

          <div className="lowerRight">
            <h2>Image:</h2>
            <output id="list"/>
          </div>
          
        </div>
        
        <AlertDialogSlide title = "🤔 Please complete the form" content= "You must provide a Name, Instructions, and at least 1 recipe line (Measure + Ingredient)" switch = {this.state.alertSwitch}/>
        <AlertDialogSlide title = "👍 You did it!" content = "Refresh to see your new drink!!!" submitSwitch = {this.state.submitSwitch}/>
      </div>
      
    );
  }
}

SubmitForms.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SubmitForms);