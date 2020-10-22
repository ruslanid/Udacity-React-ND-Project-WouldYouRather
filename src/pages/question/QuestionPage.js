import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./QuestionPage.scss";
import { selectQuestion } from "../../redux/questions/questions.selectors";
import { selectAuthedUser } from "../../redux/users/users.selectors";
import AnsweredQuestion from "../../components/answered-question/AnsweredQuestion";
import UnansweredQuestion from "../../components/unanswered-question/UnansweredQuestion";

const QuestionPage = ({ question, authedUser, match }) => {
  console.log(match);
  const renderProperComponent = () => {
    if (question) {
      return authedUser.answers[question.id] ? (
        <AnsweredQuestion question={question} authedUser={authedUser} />
      ) : (
        <UnansweredQuestion question={question} authedUser={authedUser} />
      );
    } else {
      return <Redirect to="/not-found" />;
    }
  };

  return <div className="QuestionPage">{renderProperComponent()}</div>;
};

const mapStateToProps = (state, ownProps) => ({
  question: selectQuestion(ownProps.match.params.id)(state),
  authedUser: selectAuthedUser(state),
});

export default withRouter(connect(mapStateToProps)(QuestionPage));
