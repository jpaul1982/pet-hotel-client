import React, { Component } from 'react';
import axios from 'axios';
import { HashRouter as Router, Route } from 'react-router-dom';
import DisplayOwner from '../DisplayOwner/DisplayOwner';

class App extends Component {
    
  render() {
    return (
      <div className="App">
        <Router>
          {/* <Route path="/" exact component={}/> */}
          <Route path="/owner" exact component={DisplayOwner}/>
        </Router>
      </div>
    );
  }
}

export default App;
