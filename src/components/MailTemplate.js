import React, { Component } from "react";
import "../css/MailStyles.css";
import Button from "@material-ui/core/Button";

var base_url = "http://deduce.excelmec.org:8000";

class MailTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = () => {
	let ans = document.getElementById("ans");
      //Send the answer to backend
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let res = xhr.responseText;
          res = JSON.parse(res);
          if (res.answer == "Wrong") {
            document.getElementsByClassName(
              "incorrectAnswer"
            )[0].style.display = "block";
          } else if (res.answer == "Correct") {
            document.getElementsByClassName("correctAnswer")[0].style.display =
              "block";
            setInterval(() => {
              window.location.reload();
            }, 1000); //Display "Answer correct" for at least one second before reloading page to get new question
          }
        }
      };
      xhr.open("POST", base_url + "/api/answer/"); //CHANGE URL IF NEEDED
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.setRequestHeader("Authorization", `token ${this.props.authToken}`);
      xhr.send(JSON.stringify({ answer: ans}));
  };

  render() {
    const { title, timestamp, content, attachment, image } = this.props;

    return (
      <div className="mailDiv">
        <div>
          <span className="expandedtitle">{title}</span>
          <hr className="fullWidth" />
        </div>
        <div className="contentWrapper">
          <p className="content">{content}</p>
          {attachment ? (
            <span>
              <a href={attachment} target="_blank">
                Click here to download attachment
              </a>
            </span>
          ) : null}
          <img className="q_image" src={image} />
        </div>
        <div className="inputWrapper">
          <input type="text" id="ans" placeholder="Your answer" onChange={() => {
document.getElementById("ans").value = document.getElementById("ans").value.toLowerCase().replace(/^\s+|\s+$/g, '');
		}}/>
          <Button variant="oulined" color="inherit" onClick={this.handleSubmit}>
            Submit
          </Button>
          <span className="incorrectAnswer"> Answer is incorrect! </span>
          <span className="whitespaceAnswer">
            Answer should not contain whitespace!
          </span>
          <span className="correctAnswer"> Answer is correct! </span>
        </div>
      </div>
    );
  }
}

export default MailTemplate;
