import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./AddQuestionPage.scss";
import { addNewQuestion } from "../../redux/questions/questions.actions";
import { selectAuthedUser } from "../../redux/users/users.selectors";
import { selectIsSavingQuestion } from "../../redux/questions/questions.selectors";
import { MoonLoader } from "react-spinners";

const AddQuestionPage = ({ authedUser, dispatch, history, isSaving }) => {
  const [questionDetails, setQuestionDetails] = useState({
    optionOneText: "",
    optionTwoText: "",
    error: "",
  });

  const { optionOneText, optionTwoText, error } = questionDetails;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (optionOneText === "" || optionTwoText === "") {
      setQuestionDetails({
        ...questionDetails,
        error: "Provide both options before saving the question",
      });
      return;
    }
    setQuestionDetails({ ...questionDetails, error: "" });
    const newQuestion = { ...questionDetails, author: authedUser.id };
    dispatch(addNewQuestion(newQuestion, history));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuestionDetails({ ...questionDetails, [name]: value });
  };

  console.log("error", error);

  return (
    <div className="AddQuestionPage">
      <h3>Create New Question</h3>
      <form className="add-question-form" onSubmit={handleSubmit}>
        <h4>Would you rather ...</h4>
        <input
          type="text"
          name="optionOneText"
          placeholder="Option #1"
          value={optionOneText}
          onChange={handleChange}
        />
        <p>OR</p>
        <input
          type="text"
          name="optionTwoText"
          placeholder="Option #2"
          value={optionTwoText}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}
        <div>
          {isSaving ? (
            <div className="loader">
              <MoonLoader size={30} color={"gray"} />
            </div>
          ) : (
            <button type="submit">Save</button>
          )}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  authedUser: selectAuthedUser,
  isSaving: selectIsSavingQuestion,
});

export default withRouter(connect(mapStateToProps)(AddQuestionPage));
