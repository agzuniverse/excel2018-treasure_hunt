import React, { Component } from "react";
import Sidebar from "./Sidebar";
import "../css/Main.css";
import GoogleLogin from "react-google-login";
import MailRow from "./MailRow";
import excel from "../assets/logo3x2newest.png";
import MailTemplate from "./MailTemplate";
import Leaderboard from "./Leaderboard";
import Modal from "@material-ui/core/Modal";
import Icon from "@material-ui/core/Icon";
import Conversation from "./Conversation";
import ReactGA from "react-ga";

var base_url = "http://deduce.excelmec.org:8000";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isMobileSidebarOpen: false,
      isLoggedIn: false,
      showLeaderboard: false,
      showConversation: false,
      conversationType: "",
      conversationContent: "",
      gameOver: false,
      name: "",
      email: "",
      mailList: [],
      modalContent: "",
      modalTitle: "",
      modalTimestamp: "",
      modalAttachment: "",
      modalImage: "",
      users: [
        {
          name: "",
          pic: "",
          level: ""
        }
      ]
    };
    ReactGA.initialize("UA-126390835-1");
    ReactGA.pageview(window.location.pathname);
  }

  componentDidMount() {
    let authToken = localStorage.getItem("auth_token");
    if (authToken) {
      fetch(base_url + "/api/session_check/", {
        headers: {
          Authorization: `token ${authToken}`
        }
      })
        .then(res => {
          return res.text();
        })
        .then(data => {
          if (data == "true") {
            this.setState(
              {
                auth_token: authToken,
                isLoggedIn: true
              },
              () => {
                this.fetchInfo();
              }
            );
          }
        });
    }
    fetch(base_url + "/api/leaderboard/")
      .then(res => {
        return res.json();
      })
      .then(data => {
        let leaderboard = [],
          user = {};
        if (!data.detail) {
          data.leaderboard.forEach(e => {
            user = {
              name: e.name,
              pic: e.profile,
              level: e.level
            };
            leaderboard.push(user);
          });
        }
        this.setState({ users: leaderboard });
      });
  }

  fetchInfo = () => {
    fetch(base_url + "/api/ask/", {
      headers: {
        Authorization: `token ${this.state.auth_token}`
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.level == "1") {
          this.setState({
            showPrologue: true
          });
        }
        if (data.level == "finished") {
          this.setState({
            mailList: [
              {
                mailHeader: {
                  title: `You have completed all levels!`,
                  timestamp: data.timestamp
                },
                mailBody: {
                  content: data.source_hint,
                  image: data.image,
                  attachment: data.data_url
                }
              }
            ],
            gameOver: true
          });
        } else {
          this.setState({
            mailList: [
              {
                mailHeader: {
                  title: `Level ${data.level}`,
                  timestamp: data.timestamp
                },
                mailBody: {
                  content: data.source_hint,
                  image: data.image,
                  attachment: data.data_url
                }
              }
            ]
          });
        }
      });

    fetch(base_url + "/api/conversation/", {
      headers: {
        Authorization: `token ${this.state.auth_token}`
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.isAvailable == "true") {
          this.setState({
            conversationContent: data.content,
            conversationType: data.type,
            showConversation: true
          });
        }
      });

    fetch(base_url + "/api/leaderboard/")
      .then(res => {
        return res.json();
      })
      .then(data => {
        let leaderboard = [],
          user = {};
        if (!data.detail) {
          data.leaderboard.forEach(e => {
            user = {
              name: e.name,
              pic: e.profile,
              level: e.level
            };
            leaderboard.push(user);
          });
        }
        this.setState({ users: leaderboard });
      });
  };

  handlePopupOpen = () => {
    this.setState({ open: true });
  };

  handlePopupClose = () => {
    this.setState({ open: false });
  };

  closeLeaderbaord = () => {
    this.setState({
      showLeaderboard: false
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  challenges = () => {
    const mails = this.state.mailList.map(mail => {
      if (!this.state.gameOver) {
        return (
          <MailRow
            title={mail.mailHeader.title}
            timestamp={mail.mailHeader.timestamp}
            onClick={index => {
              this.setState({
                open: true,
                modalContent: mail.mailBody.content,
                modalTitle: mail.mailHeader.title,
                modalTimestamp: mail.mailHeader.timestamp,
                modalAttachment: mail.mailBody.attachment,
                modalImage: mail.mailBody.image
              });
            }}
            index={this.state.mailList.indexOf(mail)}
          />
        );
      } else {
        return (
          <MailRow
            title={mail.mailHeader.title}
            timestamp={mail.mailHeader.timestamp}
            index={this.state.mailList.indexOf(mail)}
          />
        );
      }
    });

    if (!this.state.showLeaderboard) {
      if (this.state.showConversation) {
        return (
          <div id="challengecard">
            <div class="inboxWrapper">
              <p id="inbox">{this.state.conversationType}</p>
              <a onClick={() => this.setState({ showConversation: false })}>
                <Icon className="close">close</Icon>
              </a>
            </div>
            <hr className="fullWidth" />
            <Conversation content={this.state.conversationContent} />
          </div>
        );
      } else {
        return (
          <div id="challengecard">
            <div class="inboxWrapper">
              <p id="inbox">INBOX</p>
            </div>
            <hr className="fullWidth" />
            {mails}
            <MailRow
              title="Stuck? Look for clues on facebook."
              onClick={() => {
                let win = window.open("https://www.facebook.com/deduceExcel2018", '_blank');
                win.focus();
              }}
            />
          </div>
        );
      }
    }
    return (
      <Leaderboard
        users={this.state.users}
        closeLeaderboard={this.closeLeaderbaord}
      />
    );
  };

  logout = () => {
    fetch(base_url + "/api/logout/").then(res => {
      this.setState(
        {
          isLoggedIn: false
        },
        () => {
          localStorage.clear();
          window.location.reload();
        }
      );
    });
  };

  showLeaderboard = () => {
    this.setState({
      showLeaderboard: true
    });
  };

  authenticate = () => {
    const auth = (
      <div id="logincard">
        <div className="design1 design" />
        <div className="design2 design" />
        <div id="logodiv">
          <img id="logo" src={excel} />
        </div>
        <div className="btn">
          <GoogleLogin
            clientId="515285485076-3dcier9qalkst9pc830p8kskj94k4qgh.apps.googleusercontent.com"
            buttonText="Login with google"
            className="loginBtn"
            onSuccess={this.responseGoogleSuccess}
            onFailure={this.responseGoogleFailure}
          />
        </div>
      </div>
    );
    if (!this.state.showLeaderboard) {
      return auth;
    }
    return (
      <Leaderboard
        users={this.state.users}
        closeLeaderboard={this.closeLeaderbaord}
      />
    );
  };

  responseGoogleSuccess = res => {
    let main = this;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      let res = xhr.responseText;
      if (res && JSON.parse(res).login) {
        main.setState(
          {
            isLoggedIn: true,
            auth_token: JSON.parse(res).token
          },
          () => {
            localStorage.setItem("auth_token", main.state.auth_token);
            main.fetchInfo();
          }
        );
      }
    };
    xhr.open("POST", base_url + "/api/social/google-oauth2/"); //CHANGE URL IF NEEDED
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ access_token: res.accessToken }));
  };

  responseGoogleFailure = res => {};

  toggleSidebar = () => {
    this.setState(
      {
        isMobileSidebarOpen: !this.state.isMobileSidebarOpen
      },
      () => {
        let sidebar_mobile = document.getElementsByClassName(
          "sidebar_mobile"
        )[0];
        let overlay = document.getElementsByClassName("overlay")[0];
        if (this.state.isMobileSidebarOpen) {
          sidebar_mobile.style.left = 0;
          overlay.style.zIndex = 9;
          overlay.style.opacity = 0.5;
        } else {
          sidebar_mobile.style.left = "-250px";
          overlay.style.zIndex = -1;
          overlay.style.opacity = 0.0;
        }
      }
    );
  };

  render() {
    return (
      <div className="Login">
        <div className="overlay" onClick={this.toggleSidebar} />
        <div className="sidebar" id="sidebar_wrapper">
          <Sidebar
            page={"main"}
            logout={this.logout}
            showLeaderboard={this.showLeaderboard}
            isLoggedIn={this.state.isLoggedIn}
            authToken={this.state.auth_token}
          />
        </div>
        <div className="sidebar_mobile">
          <Sidebar
            page={"main"}
            logout={this.logout}
            isLoggedIn={this.state.isLoggedIn}
            showLeaderboard={this.showLeaderboard}
            authToken={this.state.auth_token}
          />
        </div>
        <div className="mainbox">
          <Icon className="ham" onClick={this.toggleSidebar}>
            menu
          </Icon>
          <Modal open={this.state.open} onClose={this.handlePopupClose}>
            <MailTemplate
              title={this.state.modalTitle}
              timestamp={this.state.modalTimestamp}
              content={this.state.modalContent}
              attachment={this.state.modalAttachment}
              image={this.state.modalImage}
              authToken={this.state.auth_token}
            />
          </Modal>
          {this.state.isLoggedIn ? this.challenges() : this.authenticate()}
        </div>
      </div>
    );
  }
}

export default Main;
