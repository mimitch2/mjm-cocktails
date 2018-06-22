
import App from "./App";
import { connect } from "react-redux";
import {loadFullData, loadFavorites, fullDataLoaded, addFav, deleteFav} from "./actions";

function mapStateToProps(state) {  
  return {
    fullData: state.fullData,
    favorites: state.favorites
  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    loadFullData: () => {
      const action = loadFullData();
      dispatch(action);      
    },
    fullDataLoaded: () =>{
      const action = fullDataLoaded();
      dispatch(action);
    },
    loadFavorites: () => {
      const action = loadFavorites();
      dispatch(action);
    },
    addFav: (fav) => {
      const action = addFav(fav);
      dispatch(action);
    },
    deleteFav: (id) => {
      const action = deleteFav(id);
      dispatch(action);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
