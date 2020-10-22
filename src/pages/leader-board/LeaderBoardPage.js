import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import LeaderboardUser from "../../components/leaderboard-user/LeaderboardUser";
import { selectAllUsersForLeaderboard } from "../../redux/users/users.selectors";
import "./LeaderBoardPage.scss";

const LeaderBoardPage = ({ users }) => {
  console.log(users);
  return (
    <div className="LeaderBoardPage">
      <h2>Leaderboard</h2>
      {users.map((user) => (
        <LeaderboardUser key={user.id} user={user} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  users: selectAllUsersForLeaderboard,
});

export default connect(mapStateToProps)(LeaderBoardPage);
