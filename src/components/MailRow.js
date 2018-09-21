import React, { Component } from "react";
import "../css/MailStyles.css";

class MailRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, timestamp, index, onClick } = this.props;
    return (
      <div className="mailRowWrapper">
        <div className="mailRow" onClick={() => onClick(index)}>
          <span className="title">{title}</span>
        </div>
      </div>
    );
  }
}
export default MailRow;
