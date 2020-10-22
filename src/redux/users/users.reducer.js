import QuestionsActionTypes from "../questions/questions.types";
import UsersActionTypes from "./users.types";
import { saveUserAnswer, saveAuthedUserAnswer } from "./users.utils";

const INITIAL_STATE = {
  allUsers: {},
  isFetching: false,
  errorsFetching: {},
  authedUser: null,
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USERS_START:
      return {
        ...state,
        isFetching: true,
      };
    case UsersActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allUsers: action.payload,
      };
    case UsersActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorsFetching: action.payload,
      };
    case UsersActionTypes.SET_AUTHED_USER:
      return {
        ...state,
        authedUser: action.payload,
      };
    case UsersActionTypes.DELETE_AUTHED_USER:
      return {
        ...state,
        authedUser: null,
      };
    case QuestionsActionTypes.SAVE_QUESTION_ANSWER_SUCCESS:
      return {
        ...state,
        allUsers: saveUserAnswer(state.allUsers, action.payload),
        authedUser: saveAuthedUserAnswer(state.authedUser, action.payload),
      };
    default:
      return state;
  }
};

export default usersReducer;
