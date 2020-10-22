import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../../database/_DATA";
import QuestionsActionTypes from "./questions.types";

//
// FETCH QUESTIONS
//
const fetchQuestionsStart = () => ({
  type: QuestionsActionTypes.FETCH_QUESTIONS_START,
});

const fetchQuestionsSuccess = (questions) => ({
  type: QuestionsActionTypes.FETCH_QUESTIONS_SUCCESS,
  payload: questions,
});

const fetchQuestionsFailure = (error) => ({
  type: QuestionsActionTypes.FETCH_QUESTIONS_FAILURE,
  payload: error,
});

export const fetchQuestions = () => {
  return (dispatch) => {
    dispatch(fetchQuestionsStart());

    _getQuestions()
      .then((res) => dispatch(fetchQuestionsSuccess(res)))
      .catch((error) => dispatch(fetchQuestionsFailure(error)));
  };
};

//
// ADD NEW QUESTION
//
const addNewQuestionStart = () => ({
  type: QuestionsActionTypes.ADD_NEW_QUESTION_START,
});

const addNewQuestionSuccess = (question) => ({
  type: QuestionsActionTypes.ADD_NEW_QUESTION_SUCCESS,
  payload: question,
});

const addNewQuestionFailure = (error) => ({
  type: QuestionsActionTypes.ADD_NEW_QUESTION_FAILURE,
  payload: error,
});

export const addNewQuestion = (newQuetion, history) => {
  return (dispatch) => {
    dispatch(addNewQuestionStart());

    _saveQuestion(newQuetion)
      .then((res) => {
        dispatch(addNewQuestionSuccess(res));
        history.push("/");
      })
      .catch((error) => dispatch(addNewQuestionFailure(error)));
  };
};

//
// SAVE QUESTION ANSWER
//
const saveQuestionAnswerStart = () => ({
  type: QuestionsActionTypes.SAVE_QUESTION_ANSWER_START,
});

const saveQuestionAnswerSuccess = (authedUserId, questionId, answer) => ({
  type: QuestionsActionTypes.SAVE_QUESTION_ANSWER_SUCCESS,
  payload: { authedUserId, questionId, answer },
});

const saveQuestionAnswerFailure = (error) => ({
  type: QuestionsActionTypes.SAVE_QUESTION_ANSWER_FAILURE,
  payload: error,
});

export const saveQuestionAnswer = (authedUserId, questionId, answer) => {
  return (dispatch) => {
    dispatch(saveQuestionAnswerStart());

    _saveQuestionAnswer(authedUserId, questionId, answer)
      .then(() =>
        dispatch(saveQuestionAnswerSuccess(authedUserId, questionId, answer))
      )
      .catch((error) => {
        dispatch(saveQuestionAnswerFailure(error));
      });
  };
};
