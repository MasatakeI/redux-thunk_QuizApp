import quizReducer from "./quizReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  quizInfo: quizReducer,
});

export default rootReducer;
