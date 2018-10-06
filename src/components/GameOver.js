import React, { Component } from "react";
import "../css/MailStyles.css";

class GameOver extends Component {
  render() {
    return (
      <div className="gameoverWrapper">
        <div className="mailRowWrapperGameover">
          <div className="mailRowGameover">
            <span className="title">The Hunt is over!</span>
          </div>
        </div>
      </div>
    );
  }
}

export default GameOver;
