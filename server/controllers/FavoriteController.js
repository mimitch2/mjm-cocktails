
const Favorite = require( "../models/FavoriteModel.js");
let favorites = []

// fix how do I do this without reassigning comments??

const updateData = () => {
  Favorite.find({}).exec().then(favArr => {
    favorites = favArr;
    // console.log(favorites);
  });
};

updateData();

module.exports.list = function list(request, res) {
  Favorite.find({}).exec().then(favsArr => {
    return res.json(favsArr);
  });
  // console.log(favorites);
};

module.exports.show = function show(request, res) {
  const id = request.params.id;
  Favorite.find({_id: id}).exec().then(favsArr => {
    return res.json(favsArr[0]);
  });
};

module.exports.create = function create(request, res) {
  updateData();
  const newFavorite = new Favorite(
    request.body
  );
  newFavorite.save().then(savedFavorite => {
    updateData();
    return res.json(savedFavorite);
  });
};

module.exports.update = function update(request, res) {
  return res.json({idDrink: request.params.id});
};

module.exports.remove = function remove(request, res) {  
  Favorite.remove({idDrink: request.params.id}).then(function(favorite){
    res.send(favorite);
  })
};
  
