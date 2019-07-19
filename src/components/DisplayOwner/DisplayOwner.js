import React, { Component } from 'react';
import axios from 'axios';

//material ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class DisplayOwner extends Component {
//local state to store the list of existing owners and the new owner input
    state ={
        owners: '',
        newOwner: {
            name: '',
        },
    }
//function to get all owners from db
    getOwners = () => {
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
//run getOwners on page load
    componentDidMount() {
        this.getOwners();    
    }
//function to get the input
    handleChange = (event) => {
        this.setState({
            newOwner: {
                name: event.target.value,
            }
        })
    }
//function to make a post request to post new owner
    handleSubmit = () => {
        console.log('in submit');
        // axios.post('/api/owners', {
        //     data: JSON.stringify(this.state.newOwner),
        //     headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //         })
        fetch('/api/owners', {
            method: 'POST',
            body: JSON.stringify(this.state.newOwner),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            () => {
                this.getOwners();
                this.setState({
                    newOwner: {
                        name: '',
                    }
                })
            }
        )
    }

    //function to make a delete request to delete a owner
    handleDelete = (owner) => {
        if(owner.count) {
            alert('Cannot delete owner with pet');
            return;
        } else {
            console.log(owner);
            fetch(`/api/owners/${owner.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(
                () => {
                    this.getOwners();
                }
            )
        }
    }
    

  render() {
    return (
      <div className="App">
        {/* {JSON.stringify(this.state)} */}
        <h2>Add Owner</h2>
        <TextField
            id="standard-name"
            label="Name"
            value={this.state.newOwner.name}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
      />
      <br />
      <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
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
                        <TableCell><button onClick={() => this.handleDelete(owner)}>Delete</button></TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
      </div>
    );
  }
}

export default DisplayOwner;