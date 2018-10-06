import React, { Component } from "react";
import "../css/MailStyles.css";

class GameOver extends Component {
  render() {
    return (
      <div className="gameoverWrapper">
        <div className="mailRowWrapperGameover">
          <div className="mailRowGameover">
            <span className="title">The Hunt is over!</span>
            <br />
            <span className="title">
              <a href="http://excelmec.org/" target="_blank">
                Be there for Excel 2018!
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default GameOver;
