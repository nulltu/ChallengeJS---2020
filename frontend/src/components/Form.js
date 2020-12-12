import { useState } from 'react'
import '../styles/form.css'
import { connect } from 'react-redux'
import operationsActions from '../redux/actions/operationsActions'
import swal from 'sweetalert';


function Form(props) {

    //create object new operation
    const [newOperation, setNewOperation] = useState({
        concept:null , amount: '', date_operation: '', type_operation: null
    })

    //read inputs and saved in state
    const readInput = e => {
        const textBox = e.target.name
        const value = e.target.value
        setNewOperation({
            ...newOperation,
            [textBox]: value
        })
    }

    //send opetation and validate simple form 
    const sendInfo = async e => {
        e.preventDefault()
        const response = await props.addOperation(newOperation)
       
        if(response.data.errno) {
            swal({ title: 'Complete all fields please' })
        }
        else if(response.status === 200) {
            setNewOperation({
                concept: "",
                amount: "",
                date_operation: "",
                type_operation: "",
            })
        }
    }

    return (
        <form>
            <div className="form-group">
                <label>Concept</label>
                <input type="text" className="form-control" onChange={readInput} name="concept"
                    value={newOperation.concept} placeholder="For example: Buy TV LG" />
            </div>
            <div className="form-group">
                <label>Amount:</label>
                <input className="form-control" type="number" onChange={readInput} name="amount"
                    value={newOperation.amount} placeholder="$" />
            </div>

            <div className="form-group">
                <label>Date:</label>
                <input className="form-control" type="date" onChange={readInput} name="date_operation"
                    value={newOperation.date_operation} />
            </div>
            <div>
                <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="customRadioInline1" name="type_operation" className="custom-control-input"
                        checked={newOperation.type_operation === "ingress"} onChange={readInput} value="ingress" />
                    <label className="custom-control-label" htmlFor="customRadioInline1">Ingress</label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="customRadioInline2" name="type_operation" className="custom-control-input"
                        checked={newOperation.type_operation === "egress"} onChange={readInput} value="egress" />
                    <label className="custom-control-label" htmlFor="customRadioInline2">Egress</label>
                </div>
            </div>
            <button type="button" className="btn btn-dark" onClick={sendInfo}>Submit</button>
        </form>
    )
}

//send operation to the corresponding actions.
const mapDispatchToProps = {
    addOperation: operationsActions.addOperation
}

export default connect(null, mapDispatchToProps)(Form)
