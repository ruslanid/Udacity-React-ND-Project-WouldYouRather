export const saveAuthedUserIdInQuestion = (
  questions,
  { questionId, authedUserId, answer }
) => {
  return {
    ...questions,
    [questionId]: {
      ...questions[questionId],
      [answer]: {
        ...questions[questionId][answer],
        votes: questions[questionId][answer].votes.concat([authedUserId]),
      },
    },
  };
};
