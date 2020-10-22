export const saveUserAnswer = (users, { authedUserId, questionId, answer }) => {
  return {
    ...users,
    [authedUserId]: {
      ...users[authedUserId],
      answers: {
        ...users[authedUserId].answers,
        [questionId]: answer,
      },
    },
  };
};

export const saveAuthedUserAnswer = (authedUser, { questionId, answer }) => {
  return {
    ...authedUser,
    answers: { ...authedUser.answers, [questionId]: answer },
  };
};
