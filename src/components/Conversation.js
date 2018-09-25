import React, { Component } from "react";
import "../css/Main.css";

class Conversation extends Component {
  render() {
    return <div className="conversationText">{this.props.content}</div>;
  }
}
export default Conversation;
