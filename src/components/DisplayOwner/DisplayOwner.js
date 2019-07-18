import React, { Component } from 'react';
import axios from 'axios';

//material ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class DisplayOwner extends Component {

    state ={
        owners: '',
    }

    componentDidMount() {
      axios.get('/api/owners')
      .then(
        response => {
          console.log(response.data);
          this.setState({
              owners: response.data,
          })
        }
      )
    }

  render() {
    return (
      <div className="App">
        {JSON.stringify(this.state.owners)}
        <h2>Owners</h2>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Number of Pets</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.state.owners && this.state.owners.map(owner => 
                    <TableRow key={owner.id}>
                        <TableCell>{owner.name}</TableCell>
                        <TableCell>{owner.count}</TableCell>
                        <TableCell><button>Delete</button></TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
      </div>
    );
  }
}

export default DisplayOwner;
