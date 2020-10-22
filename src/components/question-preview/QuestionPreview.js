import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserWhoAskedQuestion } from "../../redux/users/users.selectors";
import "./QuestionPreview.scss";

const QuestionPreview = ({ question, userAskingQuestion }) => {
  return (
    <div className="QuestionPreview">
      <div className="header">
        <p>Author: {userAskingQuestion.name}</p>
      </div>
      <div className="content">
        <div className="user-avatar">
          <img alt="avatar" src={`${userAskingQuestion.avatarURL}`} />
        </div>
        <div className="question">
          <p className="title">Whould You Rather ...</p>
          <p className="option-text">{question.optionOne.text} OR ...</p>
          <Link to={`/questions/${question.id}`}>
            <button>View</button>
          </Link >
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

export default connect(mapStateToProps)(QuestionPreview);
