import FullWidthTabs from "../components/TabBar";
import { connect } from "react-redux";
import {loadFavorites} from "../actions";

function mapStateToProps(state) {
  return {
    favorites: state.favorites,
    fullData: state.fullData
  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    loadFavorites: () => {
      const action = loadFavorites();
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullWidthTabs);