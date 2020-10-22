import React from "react";
import "./LeaderboardUser.scss";

const LeaderboardUser = ({ user }) => {
  const questionsAsked = user.questions.length;
  const questionsAnswered = Object.keys(user.answers).length;
  const total = questionsAsked + questionsAnswered;

  return (
    <div className="LeaderboardUser">
      <p className="user-name">{user.name}</p>
      <div className="user-avatar">
        <img alt="avatar" src={`${user.avatarURL}`} />
      </div>
      <div className="questions">
        <p>Questions asked: {questionsAsked}</p>
        <p>Questions answered: {questionsAnswered}</p>
      </div>
      <div className="total">
        Total: <b>{total}</b>
      </div>
    </div>
  );
};

export default LeaderboardUser;
