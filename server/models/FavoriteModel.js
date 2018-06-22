const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    require: true,
    type: String
  },
  idDrink: {
    require: true,
    type: String,
  },
  favorite: {
    required: true,
    type: Boolean
  },
  strDrink: {
    required: true,
    type: String
  },
  strVideo: {
    require: true,
    type: String
  },
  strCategory: {
    require: true,
    type: String
  },
  strIBA: {
    require: true,
    type: String
  },
  strAlcoholic: {
    require: true,
    type: String
  },
  strGlass: {
    require: true,
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
    require: true,
    type: String
  },
  strIngredient3: {
    require: true,
    type: String
  },
  strIngredient4: {
    require: true,
    type: String
  },
  strIngredient5: {
    require: true,
    type: String
  },
  strIngredient6: {
    require: true,
    type: String
  },
  strIngredient7: {
    require: true,
    type: String
  },
  strIngredient8: {
    require: true,
    type: String
  },
  strIngredient9: {
    require: true,
    type: String
  },
  strIngredient10: {
    require: true,
    type: String
  },
  strIngredient11: {
    require: true,
    type: String
  },
  strIngredient12: {
    require: true,
    type: String
  },
  strIngredient13: {
    require: true,
    type: String
  },
  strIngredient14: {
    require: true,
    type: String
  },
  strIngredient15: {
    require: true,
    type: String
  },
  strMeasure1: {
    require: true,
    type: String
  },
  strMeasure2: {
    require: true,
    type: String
  },
  strMeasure3: {
    require: true,
    type: String
  },
  strMeasure4: {
    require: true,
    type: String
  },
  strMeasure5: {
    require: true,
    type: String
  },
  strMeasure6: {
    require: true,
    type: String
  },
  strMeasure7: {
    require: true,
    type: String
  },
  strMeasure8: {
    require: true,
    type: String
  },
  strMeasure9: {
    require: true,
    type: String
  },
  strMeasure10: {
    require: true,
    type: String
  },
  strMeasure11: {
    require: true,
    type: String
  },
  strMeasure12: {
    require: true,
    type: String
  },
  strMeasure13: {
    require: true,
    type: String
  },
  strMeasure14: {
    require: true,
    type: String
  },
  strMeasure15: {
    require: true,
    type: String
  },
  dateModified: {
    require: true,
    type: String
  },
});

module.exports = mongoose.model("Favorite", schema);
