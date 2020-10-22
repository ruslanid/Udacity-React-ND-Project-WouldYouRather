import QuestionsActionTypes from "./questions.types";
import { saveAuthedUserIdInQuestion } from "./questions.utils";

const INITIAL_STATE = {
  allQuestions: {},
  isFetching: false,
  isSavingQuestion: false,
  isSavingAnswer: false,
  errorsFetching: {},
  errorsSavingQuestion: {},
  errorsSavingAnswer: {},
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QuestionsActionTypes.FETCH_QUESTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case QuestionsActionTypes.FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allQuestions: action.payload,
      };
    case QuestionsActionTypes.FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorsFetching: action.payload,
      };
    case QuestionsActionTypes.ADD_NEW_QUESTION_START:
      return {
        ...state,
        isSavingQuestion: true,
      };
    case QuestionsActionTypes.ADD_NEW_QUESTION_SUCCESS:
      return {
        ...state,
        isSavingQuestion: false,
        allQuestions: {...state.allQuestions, [action.payload.id]: action.payload},
      };
    case QuestionsActionTypes.ADD_NEW_QUESTION_FAILURE:
      return {
        ...state,
        isSavingQuestion: false,
        errorsSavingQuestion: action.payload,
      };
    case QuestionsActionTypes.SAVE_QUESTION_ANSWER_START:
      return {
        ...state,
        isSavingAnswer: true,
      };
    case QuestionsActionTypes.SAVE_QUESTION_ANSWER_SUCCESS:
      return {
        ...state,
        isSavingAnswer: false,
        allQuestions: saveAuthedUserIdInQuestion(state.allQuestions, action.payload)
      };
    case QuestionsActionTypes.SAVE_QUESTION_ANSWER_FAILURE:
      return {
        ...state,
        isSavingAnswer: false,
        errorsSavingAnswer: action.payload,
      };
    default:
      return state;
  }
};

export default questionsReducer;
