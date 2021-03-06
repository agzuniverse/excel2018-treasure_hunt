import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/Main";
import Rules from "./components/Rules";
import "./App.css";
import GameOver from "./components/GameOver";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <Route exact path="/" component={Main} /> */}
          <Route exact path="/" component={GameOver} />
          <Route exact path="/rules" component={Rules} />
        </div>
      </Router>
    );
  }
}

export default App;
