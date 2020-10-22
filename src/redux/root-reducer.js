import { combineReducers } from "redux";
import usersReducer from "./users/users.reducer";
import questionsReducer from "./questions/questions.reducer";

const rootReducer = combineReducers({
  users: usersReducer,
  questions: questionsReducer,
});

export default rootReducer;
