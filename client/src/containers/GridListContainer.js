import TitlebarGridList from "../components/GridList";
import { connect } from "react-redux";
import {loadFavorites} from "../actions";

function mapStateToProps(state) {
  return {
    favorites: state.favorites
  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    loadFavorites: () => {
      const action = loadFavorites();
      dispatch(action);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TitlebarGridList);