import React, { Component } from 'react'

// import material-ui components
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'

class PetForm extends Component {

    state = {
        name: '',
        breed: '',
        color: '',
        age: '',
        owner: '',
    }

    handleChange = (event) => {
        this.setState({
            ...this.state, [event.target.id]: event.target.value
        })
    }

    handleSelect = (event) => {
        this.setState({
            ...this.state, owner: event.target.value
        })
    }

    handleSubmit = () => {
        console.log(this.state);
        fetch('/api/pets', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(() => {
            this.setState({
                name: '',
                breed: '',
                color: '',
                age: '',
                owner: '',
            })
            this.props.getOwnersAndPets();
        })
    }

    render() {
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={2}>
                        <TextField
                            autoComplete="off"
                            id="name"
                            label="Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            autoComplete="off"
                            id="breed"
                            label="Breed"
                            value={this.state.breed}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            autoComplete="off"
                            id="color"
                            label="Color"
                            value={this.state.color}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            autoComplete="off"
                            id="age"
                            type="number"
                            label="Age"
                            value={this.state.age}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl style={{ minWidth: '75%' }}>
                            <InputLabel htmlFor="owner">Owner</InputLabel>
                            <Select
                                value={this.state.owner}
                                onChange={this.handleSelect}
                                inputProps={{
                                    name: 'owner',
                                    id: 'owner',
                                }}
                            >
                                {this.props.owners.map(owner => <MenuItem key={owner.id} value={owner.id}>{owner.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={this.handleSubmit} variant="contained" color="primary">Add Pet</Button>
                    </Grid>
                </Grid>




            </>
        )
    }
}

export default PetForm