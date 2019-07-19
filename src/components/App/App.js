import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import DisplayOwner from '../DisplayOwner/DisplayOwner';
import DisplayPet from '../DisplayPets/DisplayPets';

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'


class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Grid container justify="center">
          <Grid item xs={2}>
              <Link to="/">
                <Button variant="contained" color="primary">Home</Button>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link to="/owner">
                <Button variant="contained" color="primary">Owner</Button>
              </Link>
            </Grid>
            <Grid item xs={2}>
              <Link to="/pet">
                <Button variant="contained" color="primary">Pets</Button>
              </Link>
            </Grid>
          </Grid>



          {/* <Route path="/" exact component={}/> */}
          <Route path="/owner" exact component={DisplayOwner} />
          <Route path="/pet" exact component={DisplayPet} />
        </Router>
      </div>
    );
  }
}

export default App;

