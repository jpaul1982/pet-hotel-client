import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    componentDidMount() {
      axios.get('/api/owners')
      .then(
        response => {
          console.log(response.data)
        }
      )
    }

  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
