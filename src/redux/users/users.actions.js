import { _getUsers } from "../../database/_DATA";
import UsersActionTypes from "./users.types";

//
// FETCH USERS
//
const fetchUsersStart = () => ({
  type: UsersActionTypes.FETCH_USERS_START,
});

const fetchUsersSuccess = (users) => ({
  type: UsersActionTypes.FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchUsersFailure = (error) => ({
  type: UsersActionTypes.FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersStart());

    _getUsers()
      .then((res) => dispatch(fetchUsersSuccess(res)))
      .catch((error) => dispatch(fetchUsersFailure(error)));
  };
};

//
// SIGN IN
//
const setAuthedUser = (user) => ({
  type: UsersActionTypes.SET_AUTHED_USER,
  payload: user,
});

export const loginUser = (user, history, location) => {
  return (dispatch) => {
    dispatch(setAuthedUser(user));
    if (location.state) {
      history.push(location.state.from);
    }
  };
};

//
// SIGN USER OUT
//
const deleteAuthedUser = () => ({
  type: UsersActionTypes.DELETE_AUTHED_USER,
});

export const signoutUser = (history) => {
  return (dispatch) => {
    dispatch(deleteAuthedUser());
    history.push("/");
  }
}
