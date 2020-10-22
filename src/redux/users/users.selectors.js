import { createSelector } from "reselect";

const selectUsers = (state) => state.users;

export const selectAllUsers = createSelector([selectUsers], (users) =>
  Object.keys(users.allUsers).map((userId) => users.allUsers[userId])
);

export const selectAllUsersForLeaderboard = createSelector(
  [selectAllUsers],
  (allUsers) =>
    allUsers.sort((u1, u2) => {
      const userOneTotalQuestionsAndAnswers =
        u1.questions.length + Object.keys(u1.answers).length;
      const userTwoTotalQuestionsAndAnswers =
        u2.questions.length + Object.keys(u2.answers).length;
      return userTwoTotalQuestionsAndAnswers - userOneTotalQuestionsAndAnswers;
    })
);

export const selectAuthedUser = createSelector(
  [selectUsers],
  (users) => users.authedUser
);

export const selectUserWhoAskedQuestion = (userId) =>
  createSelector([selectAllUsers], (allUsers) =>
    allUsers.find((user) => user.id === userId)
  );
