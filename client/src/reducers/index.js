import {combineReducers} from "redux";

function fullData(state = [], action) {
  if (action.type === "FULLDATA_LOADED") {
    return action.value;
  }
  return state;
}

function favorites(state = [], action) {
  if (action.type === "FAVORITES_LOADED") {
    return action.value;
  }
  return state;
}

// function /* myMovieList */(state = [], action) {
//   if (action.type === /* "MY_MOVIE_LIST_LOADED" */) {
//     return action.value;
//   }
//   return state;
// }

const rootReducer = combineReducers({
  fullData, favorites
});

export default rootReducer;
