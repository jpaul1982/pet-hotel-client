import React, { Component } from 'react'
import axios from 'axios'

import PetForm from './PetForm'
//material ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class PetTable extends Component {

    state = {
        petList: null,
        owners: null,
    }

    //function to toggle check in/check out status
    handleCheckout = (pet) => {
        console.log('in handle checkout')
        fetch('/api/checkout', {
            method: 'PUT',
            body: JSON.stringify({
                newStatus: !pet.check_in,
                petId: pet.id,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            () => {
                axios.get('/api/pets')
                .then(response => {
                    console.log(response.data);
                    this.setState({
                        petList: response.data,
                    })
                })
            }
        )
        
        if(!pet.check_in) {
            // create new entry in visit table
            console.log('this pet will be checked out');
            fetch(`/api/checkout/${pet.id}`, {
                method: 'POST',
                // body: JSON.stringify({
                //     newStatus: !pet.check_in,
                //     petId: pet.id,
                // }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(
                () => {
                    axios.get('/api/pets')
                    .then(response => {
                        console.log(response.data);
                        this.setState({
                            petList: response.data,
                        })
                    })
                })
        } else {
            //update existing visit with checkout date
            console.log('this pet will be checked in');
            fetch(`/api/checkout/${pet.id}`, {
                method: 'PUT',
                // body: JSON.stringify({
                //     newStatus: !pet.check_in,
                //     petId: pet.id,
                // }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(
                () => {
                    axios.get('/api/pets')
                    .then(response => {
                        console.log(response.data);
                        this.setState({
                            petList: response.data,
                        })
                    })
                })
        }
    }

    componentDidMount() {
        this.getOwnersAndPets();
    }

    getOwnersAndPets = () => {
        axios.get('/api/owners')
            .then(
                response => {
                    axios.get('/api/pets')
                        .then(response => {
                            console.log(response.data);
                            this.setState({
                                petList: response.data,
                            })
                        })
                    console.log(response.data);
                    this.setState({
                        owners: response.data,
                    })
                }
            )
    }

    render() {
        return (
            <>
                
                {this.state.petList && this.state.owners &&
                    <>
                        <PetForm owners={this.state.owners} getOwnersAndPets={this.getOwnersAndPets}/>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Owner Name</TableCell>
                                    <TableCell>Pet Name</TableCell>
                                    <TableCell>Breed</TableCell>
                                    <TableCell>Color</TableCell>
                                    <TableCell>Checked In</TableCell>
                                    <TableCell>Remove Pet Data</TableCell>
                                    <TableCell>Check In/Out</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.petList && this.state.petList.map(pet =>
                                    <TableRow key={pet.id}>
                                        <TableCell>{pet.owner_name}</TableCell>
                                        <TableCell>{pet.name}</TableCell>
                                        <TableCell>{pet.breed}</TableCell>
                                        <TableCell>{pet.color}</TableCell>
                                        <TableCell>{pet.check_in ? 'yes' : 'no'}</TableCell>
                                        <TableCell><button>Delete</button></TableCell>
                                        <TableCell>
                                            {pet.check_in ?
                                                <button onClick={() => {this.handleCheckout(pet)}}>Check Out</button>
                                                :
                                                <button onClick={() => {this.handleCheckout(pet)}}>Check In</button>
                                            }
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </>
                }
            </>
        )
    }
}

export default PetTable