import React, { useState } from "react";
import { connect } from "react-redux";
import { selectUserWhoAskedQuestion } from "../../redux/users/users.selectors";
import { saveQuestionAnswer } from "../../redux/questions/questions.actions";
import "./UnansweredQuestion.scss";
import { MoonLoader } from "react-spinners";
import { selectIsSavingAnswer } from "../../redux/questions/questions.selectors";

const UnansweredQuestion = ({
  question,
  userAskingQuestion,
  authedUser,
  dispatch,
  isSaving,
}) => {
  const [selectedOption, setSelectedOption] = useState("optionOne");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(saveQuestionAnswer(authedUser.id, question.id, selectedOption));
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="UnansweredQuestion">
      <div className="header">
        <p>Author: {userAskingQuestion.name}</p>
      </div>
      <div className="content">
        <div className="user-avatar">
          <img alt="avatar" src={`${userAskingQuestion.avatarURL}`} />
        </div>
        <form className="questionForm" onSubmit={handleSubmit}>
          <p>Whould You Rather ...</p>
          <div>
            <input
              type="radio"
              value="optionOne"
              checked={selectedOption === "optionOne"}
              onChange={handleChange}
            />
            &nbsp;
            {question.optionOne.text}
          </div>
          <div>
            <input
              type="radio"
              value="optionTwo"
              checked={selectedOption === "optionTwo"}
              onChange={handleChange}
            />
            &nbsp;
            {question.optionTwo.text}
          </div>
          {isSaving ? (
            <div className="loader">
              <MoonLoader size={30} color={"gray"} />
            </div>
          ) : (
            <button type="submit">Answer</button>
          )}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  userAskingQuestion: selectUserWhoAskedQuestion(ownProps.question.author)(
    state
  ),
  isSaving: selectIsSavingAnswer(state),
});

export default connect(mapStateToProps)(UnansweredQuestion);
