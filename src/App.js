import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./App.css";

import Header from "./components/header/Header";

import QuestionPage from "./pages/question/QuestionPage";
import HomePage from "./pages/home/HomePage";
import LeaderBoardPage from "./pages/leader-board/LeaderBoardPage";
import LoginPage from "./pages/login/LoginPage";
import AddQuestionPage from "./pages/add-question/AddQuestionPage";

import { selectAuthedUser } from "./redux/users/users.selectors";
import { fetchUsers } from "./redux/users/users.actions";
import { fetchQuestions } from "./redux/questions/questions.actions";
import NotFoundPage from "./pages/not-found/NotFoundPage";

function App({ authedUser, dispatch }) {
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div className="App">
      {authedUser ? <Header /> : null}
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            authedUser ? (
              <HomePage />
            ) : (
              <Redirect to={{ pathname: "/login", state: { from: "" } }} />
            )
          }
        />
        <Route
          exact
          path="/add"
          render={() =>
            authedUser ? (
              <AddQuestionPage />
            ) : (
              <Redirect to={{ pathname: "/login", state: { from: "/add" } }} />
            )
          }
        />
        <Route
          exact
          path="/questions/:id"
          render={(props) =>
            authedUser ? (
              <QuestionPage />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: `/questions/${props.match.params.id}` },
                }}
              />
            )
          }
        />
        <Route
          exact
          path="/leaderboard"
          render={() =>
            authedUser ? (
              <LeaderBoardPage />
            ) : (
              <Redirect
                to={{ pathname: "/login", state: { from: "/leaderboard" } }}
              />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={() => (authedUser ? <Redirect to="/" /> : <LoginPage />)}
        />

        <Route
          path="/not-found"
          render={() =>
            authedUser ? <NotFoundPage /> : <Redirect to="/login" />
          }
        />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  authedUser: selectAuthedUser,
});

export default connect(mapStateToProps)(App);
