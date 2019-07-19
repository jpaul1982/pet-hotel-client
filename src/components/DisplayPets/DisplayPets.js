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

    // getPets = () => {
    //     axios.get('/api/pets')
    //         .then(response => {
    //             console.log(response.data);
    //             this.setState({
    //                 petList: response.data,
    //             })
    //         })
    // }

    // getOwners = () => {
    //     axios.get('/api/owners')
    //         .then(
    //             response => {
    //                 console.log(response.data);
    //                 this.setState({
    //                     owners: response.data,
    //                 })
    //             }
    //         )
    // }

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
                                                <button>Check Out</button>
                                                :
                                                <button>Check In</button>
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