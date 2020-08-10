import { combineReducers } from "redux";
import nodes from "../state/modules/nodes/reducers/nodes.reducer";

const rootReducer = combineReducers({
  nodes,
});

export default rootReducer;
