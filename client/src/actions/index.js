

export function loadFullData() {
  return function (dispatch) {
    fetch("http://localhost:3001/getAllData").then( (response) => {
      return response.json();
    }).then(
      (result) => {
        dispatch(fullDataLoaded(result));
      });
  };
}
      
export function fullDataLoaded(result) {
  return {
    type: "FULLDATA_LOADED",
    value: result
  };
}

export function loadFavorites() {
  return function (dispatch) {
    fetch("http://localhost:3001/favorites").then( (response) => {
      return response.json();
    }).then((favorites) => {
      dispatch(favoritesLoaded(favorites));
    });
  };
}
      
export function favoritesLoaded(favorites) {
  return {
    type: "FAVORITES_LOADED",
    value: favorites
  };
}

// export function showUser(id) {
//   return function (dispatch) {
//     fetch("/user/" + id).then((response) => {
//       return response.json();
//     }).then(() => {
//       dispatch(loadUsers());
//     });
//   };
// }
  
  
export function addFav(fav) {
  return function (dispatch) {
    fetch("http://localhost:3001/favorite", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(fav)
    }).then(() => {
      dispatch(loadFavorites());
    });
  };
}


      
export function deleteFav(id) {
  return function (dispatch) {
    fetch("http://localhost:3001/favorite/" + id, {
      method: "DELETE"
    }).then(res => res.json())
      .then(() => {
        dispatch(loadFavorites());
      });
  };
}


      
// export function updateUser(id, user) {
//   return function (dispatch) {
//     fetch("/user/" + id, {
//       method: "PUT",
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify(user)
//     }).then(res => res.json())
//       .then(() => {
//         dispatch(loadUsers());
//       });
//   };
// }
  
