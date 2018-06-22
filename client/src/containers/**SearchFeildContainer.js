import IntegrationAutosuggest from "../components/SearchFeild.js";
import { connect } from "react-redux";
// import {loadFavorites} from "../actions";

function mapStateToProps(state) {
  return {
    fullData: state.fullData,
    alchOnlyData: state.alchOnlyData
  };
}
  
// function mapDispatchToProps(dispatch) {
//   return {
//     loadFavorites: () => {
//       const action = loadFavorites();
//       dispatch(action);
//     }
//   };
// }

export default connect(mapStateToProps)(IntegrationAutosuggest);