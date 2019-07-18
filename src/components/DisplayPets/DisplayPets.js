import React, { Component } from 'react'
import axios from 'axios'

//material ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class PetTable extends Component {

    state = {}

    componentDidMount() {
        axios.get('/api/pets')
            .then(response => {
                console.log(response.data);
                this.setState({
                    petList: response.data,
                })
            })
    }

    render() {
        return (
            <>
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
        )
    }
}

export default PetTable