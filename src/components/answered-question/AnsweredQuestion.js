import React from "react";
import { connect } from "react-redux";
import { selectUserWhoAskedQuestion } from "../../redux/users/users.selectors";
import "./AnsweredQuestion.scss";

const AnsweredQuestion = ({ question, userAskingQuestion, authedUser }) => {
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;

  return (
    <div className="AnsweredQuestion">
      <div className="header">
        <p>Author: {userAskingQuestion.name}</p>
        <div className="your-answer">
          <span className="answer-color" /> Your answer
        </div>
      </div>
      <div className="content">
        <div className="user-avatar">
          <img alt="avatar" src={`${userAskingQuestion.avatarURL}`} />
        </div>
        <div className="question">
          <p className="title">Whould You Rather ...</p>
          <div
            className={`option ${
              question.optionOne.votes.includes(authedUser.id) ? "user-answer" : ""
            }`}
          >
            <p className="option-text">{question.optionOne.text}</p>
            <span className="votes">
              Votes: {Math.round(optionOneVotes / totalVotes * 100)}% ({optionOneVotes} out of{" "}
              {totalVotes})
            </span>
          </div>
          <div
            className={`option ${
              question.optionTwo.votes.includes(authedUser.id) ? "user-answer" : ""
            }`}
          >
            <p className="option-text">{question.optionTwo.text}</p>
            <span className="votes">
              Votes: {Math.round(optionTwoVotes / totalVotes * 100)}% ({optionTwoVotes} out of{" "}
              {totalVotes})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  userAskingQuestion: selectUserWhoAskedQuestion(ownProps.question.author)(
    state
  ),
});

export default connect(mapStateToProps)(AnsweredQuestion);
