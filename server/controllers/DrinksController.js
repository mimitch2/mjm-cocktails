
const Drink = require( "../models/DrinksModel.js");


module.exports.list = function list(request, response) {

  Drink.find({}).exec().then(drinksArr => {
    return response.json(drinksArr);
  });
};

// module.exports.show = function show(request, response) {
//   const id = request.params.id;
//   Drink.find({_id: id}).exec().then(drinkArr => {
//     return response.json(drinkArr[0]);
//   });
// };

module.exports.create = function create(request, response) {
  const newDrink = new Drink(
    request.body
  );
  newDrink.save().then(savedDrink => {
    return response.json(savedDrink);
  });
};

// module.exports.update = function update(request, response) {
//   return response.json({theId: request.params.id});
// };
// module.exports.remove = function remove(request, response) {
//   return response.json({});
// };
  
