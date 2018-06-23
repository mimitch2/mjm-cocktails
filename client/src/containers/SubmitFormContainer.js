import SubmitForms from "../components/SubmitForm";
import { connect } from "react-redux";
import {addDrink} from "../actions";

function mapStateToProps(state) {
  return {
    fullData: state.fullData
  };
}
  
function mapDispatchToProps(dispatch) {
  return {
    addDrink: (data) => {
      const action = addDrink(data);
      dispatch(action);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitForms);