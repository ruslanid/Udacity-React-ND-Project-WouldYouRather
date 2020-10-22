import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { loginUser } from "../../redux/users/users.actions";
import { selectAllUsers } from "../../redux/users/users.selectors";
import "./LoginPage.scss";
import Logo from "../../assets/images/logo.png";

const LoginPage = ({ dispatch, users, location, history }) => {
  const [authedUserId, setAuthedUserId] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const authedUser = users.find((user) => user.id === authedUserId);
    dispatch(loginUser(authedUser, history, location));
  };

  const handleChange = (event) => {
    setAuthedUserId(event.target.value);
  };

  return (
    <div className="LoginPage">
      <h2>Would You Rather!</h2>
      <img alt="Logo" src={Logo} />
      <h4>Welcome! Please Log In.</h4>
      <form onSubmit={handleSubmit}>
        <select
          name="authedUser"
          value={authedUserId}
          defaultValue="default"
          onChange={handleChange}
        >
          <option value="default" disabled>
            Select user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <div>
          <button type="submit" disabled={!authedUserId}>
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  users: selectAllUsers,
});

export default withRouter(connect(mapStateToProps)(LoginPage));
