const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  idDrink: {
    require: true,
    type: String,
  },
  strDrink: {
    required: true,
    type: String
  },
  strVideo: {
    require: false,
    type: String
  },
  strCategory: {
    require: false,
    type: String
  },
  strIBA: {
    require: false,
    type: String
  },
  strAlcoholic: {
    require: true,
    type: String
  },
  strGlass: {
    require: false,
    type: String
  },
  strInstructions: {
    require: true,
    type: String
  },
  strDrinkThumb: {
    require: true,
    type: String
  },
  strIngredient1: {
    require: true,
    type: String
  },
  strIngredient2: {
    require: false,
    type: String
  },
  strIngredient3: {
    require: false,
    type: String
  },
  strIngredient4: {
    require: false,
    type: String
  },
  strIngredient5: {
    require: false,
    type: String
  },
  strIngredient6: {
    require: false,
    type: String
  },
  strIngredient7: {
    require: false,
    type: String
  },
  strIngredient8: {
    require: false,
    type: String
  },
  strIngredient9: {
    require: false,
    type: String
  },
  strIngredient10: {
    require: false,
    type: String
  },
  strIngredient11: {
    require: false,
    type: String
  },
  strIngredient12: {
    require: false,
    type: String
  },
  strIngredient13: {
    require: false,
    type: String
  },
  strIngredient14: {
    require: false,
    type: String
  },
  strIngredient15: {
    require: false,
    type: String
  },
  strMeasure1: {
    require: true,
    type: String
  },
  strMeasure2: {
    require: false,
    type: String
  },
  strMeasure3: {
    require: false,
    type: String
  },
  strMeasure4: {
    require: false,
    type: String
  },
  strMeasure5: {
    require: false,
    type: String
  },
  strMeasure6: {
    require: false,
    type: String
  },
  strMeasure7: {
    require: false,
    type: String
  },
  strMeasure8: {
    require: false,
    type: String
  },
  strMeasure9: {
    require: false,
    type: String
  },
  strMeasure10: {
    require: false,
    type: String
  },
  strMeasure11: {
    require: false,
    type: String
  },
  strMeasure12: {
    require: false,
    type: String
  },
  strMeasure13: {
    require: false,
    type: String
  },
  strMeasure14: {
    require: false,
    type: String
  },
  strMeasure15: {
    require: false,
    type: String
  },
  dateModified: {
    require: false,
    type: String
  },
});

module.exports = mongoose.model("Drink", schema);
