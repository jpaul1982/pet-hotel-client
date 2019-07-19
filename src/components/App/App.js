import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import DisplayOwner from '../DisplayOwner/DisplayOwner';
import DisplayPet from '../DisplayPets/DisplayPets';


class App extends Component {
    
  render() {
    return (
      <div className="App">
        <Router>
          {/* <Route path="/" exact component={}/> */}
          <Route path="/owner" exact component={DisplayOwner}/>
          <Route path="/pet" exact component={DisplayPet} />
        </Router>
      </div>
    );
  }
}

export default App;
