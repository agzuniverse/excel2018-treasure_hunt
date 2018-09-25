import React, { Component } from "react";
import "../css/Rules.css";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <div className="rulesbackground">
        <div className="rules">
          <span id="ruletitle">
            &nbsp;
            <Link to="/">
              <Icon className="closeLeader">arrow_back</Icon>
            </Link>
            &nbsp;&nbsp;Rules
          </span>
          <hr />
          <ol>
            <li> Admins decisions are final and should not be questioned.</li>
            <li> Malpractices or any sort of practices which grant advantages over other players are strictly
              prohibited. This includes accessing restricted files/brute forcing/sharing answers etc.</li>
            <li> Any user found sharing answers or clues will be immediately banned from the hunt.</li>
            <li> Admins will provide timely hints for all levels as per schedule. Do not beg for hints or spam
              the page's Direct Messages.</li>
            <li> The leaderboard is based purely on time completed to maintain equality. First to solve the
              level will be on top.</li>
            <li> Answers are to be typed in lowercase and excluding spaces and special characters. If the
              answer is a name, it should be the full name including initials.
            For example, if your answer is "A. Xyz", it should be entered as "axyz"
            If your answer is a date, it should be entered in ddmmyyyy format.
            For example, if your answer is "14th April, 1998" you should enter "14041998"</li>
          <li> The rules may be modified or changed at any moment before or during the hunt.</li>
          <li> Failure to comply with any of the rules will result in immediate disqualification.</li>
          </ol>
        </div>
      </div>
    );
  }
}

export default Main;
