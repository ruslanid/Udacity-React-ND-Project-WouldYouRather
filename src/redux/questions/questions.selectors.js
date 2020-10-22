import { createSelector } from "reselect";

const selectQuestions = (state) => state.questions;

export const selectAllQuestions = createSelector(
  [selectQuestions],
  (questions) =>
    Object.keys(questions.allQuestions)
      .map((questionId) => questions.allQuestions[questionId])
      .sort((q1, q2) => q2.timestamp - q1.timestamp)
);

export const selectQuestion = (questionId) =>
  createSelector([selectAllQuestions], (allQuestions) =>
    allQuestions.find((question) => question.id === questionId)
  );

export const selectAreQuestionsLoaded = createSelector(
  [selectAllQuestions],
  (allQuestions) => allQuestions.length === 0
);

export const selectIsSavingQuestion = createSelector(
  [selectQuestions],
  (questions) => questions.isSavingQuestion
);

export const selectIsSavingAnswer = createSelector(
  [selectQuestions],
  (questions) => questions.isSavingAnswer
);
