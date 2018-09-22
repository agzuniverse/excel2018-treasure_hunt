import React, { Component } from "react";
import "../css/Main.css";
import "../css/Leaderboard.css";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

class Leaderboard extends Component {
  render() {
    return (
      <div className="tableDiv">
        <Button onClick={this.props.closeLeaderboard}>
          <Icon className="closeLeader">close</Icon>
        </Button>
        <table className="table">
          <tr>
            <th>Rank</th>
            <th id="namehead">Name</th>
            <th>Level</th>
          </tr>
          {this.props.users.map((user, rank) => {
            return (
              <tr id="contenttr">
                <td>{rank+1}</td>
                <td id="imgcell">
                  <img src={user.pic} alt="" className="userPic" />
                </td>
                <td>
                  {user.name}
                </td>
                <td>{user.level}</td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
export default Leaderboard;
