import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { useState } from 'react'
import '../styles/form.css'
import { connect } from 'react-redux'
import operationsActions from '../redux/actions/operationsActions'
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';




function Form(props) {


    
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(date)
    };

    
    // SEGUIR AQUI!!!!
    

    const [value, setValue] = React.useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    //create object new operation
    const [newOperation, setNewOperation] = useState({
        concept: null, amount: '', date_operation: '', type_operation: null
    })

    //read inputs and saved in state
    const readInput = e => {
        const textBox = e.target.name
        const value = e.target.value
        setNewOperation({
            ...newOperation,
            [textBox]: value,
        })
    }

    //send opetation and validate simple form 
    const sendInfo = async e => {
        e.preventDefault()
        const response = await props.addOperation(newOperation)

        if (response.data.errno) {
            swal({ title: 'Complete all fields please' })
        }
        else if (response.status === 200) {
            setNewOperation({
                concept: "",
                amount: "",
                date_operation: "",
                type_operation: "",
            })
        }
    }

    console.log(setSelectedDate)

    return (
        <form>
            <div className="form-group">
                <TextField
                    id="standard-full-width"
                    label="Concept"
                    style={{ margin: 8 }}
                    placeholder="For example: Buy TV LG"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    type="text"
                    onChange={readInput}
                    name="concept"
                    value={newOperation.concept}
                />
            </div>
            <div className="form-group">
                <TextField
                    id="standard-full-width"
                    label="Amount"
                    style={{ margin: 8 }}
                    placeholder="$"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    type="number"
                    onChange={readInput}
                    name="amount"
                    value={newOperation.amount}
                />
            </div>

            <div className="form-group">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </div>
            <div>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel control={<Radio />} checked={newOperation.type_operation === "ingress"}
                     label="Ingress" name="type_operation" onChange={readInput} value="ingress" />
                    <FormControlLabel control={<Radio />} checked={newOperation.type_operation === "egress"}
                     label="Egress" name="type_operation" onChange={readInput} value="egress" />
                </RadioGroup>
            </div>
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={sendInfo}
                startIcon={<SaveIcon />}
            >
                Save
             </Button>

        </form>
    )
}

//send operation to the corresponding actions.
const mapDispatchToProps = {
    addOperation: operationsActions.addOperation
}

export default connect(null, mapDispatchToProps)(Form)
