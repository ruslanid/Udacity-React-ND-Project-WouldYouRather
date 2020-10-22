import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./Header.scss";
import { signoutUser } from "../../redux/users/users.actions";
import { selectAuthedUser } from "../../redux/users/users.selectors";

const Header = ({ dispatch, authedUser, history }) => (
  <div className="Header">
    <div className="left">
      <Link to="/">HOME</Link>
      <Link to="/leaderboard">LEADER BOARD</Link>
      <Link to="/add">NEW QUESTION</Link>
    </div>
    <div className="right">
      <div className="authed-user-info">
        <p>Hello, {authedUser.name}</p>
        <img alt="avatar" src={`${authedUser.avatarURL}`} />
      </div>
      <div className="signOut" onClick={() => dispatch(signoutUser(history))}>
        Sign Out
      </div>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  authedUser: selectAuthedUser,
});

export default withRouter(connect(mapStateToProps)(Header));
