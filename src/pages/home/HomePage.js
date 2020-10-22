import React, { useState } from "react";
import { connect } from "react-redux";
import "./HomePage.scss";
import { createStructuredSelector } from "reselect";
import QuestionPreview from "../../components/question-preview/QuestionPreview";
import { selectAllQuestions } from "../../redux/questions/questions.selectors";
import { selectAuthedUser } from "../../redux/users/users.selectors";

const HomePage = ({ questions, authedUser }) => {
  const [activeTab, setActiveTab] = useState("unaswered");

  const filteredQuestions =
    activeTab === "unaswered"
      ? questions.filter((question) => !authedUser.answers[question.id])
      : questions.filter((question) => authedUser.answers[question.id]);

  return (
    <div className="HomePage">
      <div className="tabs">
        <div
          className={`tab ${activeTab === "unaswered" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("unaswered")}
        >
          Unanswered Questions
        </div>
        <div
          className={`tab ${activeTab === "aswered" ? "active-tab" : ""}`}
          onClick={() => setActiveTab("aswered")}
        >
          Answered Questions
        </div>
      </div>
      {filteredQuestions.length === 0 && (
        <p className="empty-list">You don't any unanswered questions</p>
      )}
      {filteredQuestions.map((question) => (
        <QuestionPreview key={question.id} question={question} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  questions: selectAllQuestions,
  authedUser: selectAuthedUser,
});

export default connect(mapStateToProps)(HomePage);
