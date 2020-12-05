import axios from 'axios';
import { useState } from 'react'
import '../styles/form.css'
import { connect } from 'react-redux'
import operationsActions from '../redux/actions/operationsActions'

function Form(props) {

    const [newOperation, setNewOperation] = useState({
        concept: '', amount: '', date_operation: '', type_operation: ""
    })

    const readInput = e => {
        const textBox = e.target.name
        const value = e.target.value
        setNewOperation({
            ...newOperation,
            [textBox]: value
        })
    }

    const sendInfo = async e => {
        e.preventDefault()
        const response = await props.addOperation(newOperation)
        if (response.status === 200) {
            setNewOperation({
                concept: "",
                amount: "",
                date_operation: "",
                type_operation: "",
            })
        }
    }

    console.log(newOperation.date_operation)

    return (
        <form>

<div class="form-group">
    <label for="formGroupExampleInput">Concept</label>
    <input type="text" class="form-control" id="formGroupExampleInput"  onChange={readInput} name="concept"
                    value={newOperation.concept} placeholder="For example: Buy TV LG" />
  </div>
            {/* <div>
                <label  htmlFor="" >Concept:</label>
                <input className="form-control" type="text" onChange={readInput} name="concept"
                    value={newOperation.concept} placeholder="For example: Buy TV LG" />
            </div> */}
            <div>
                <label htmlFor="">Amount:</label>
                <input className="form-control" type="number" onChange={readInput} name="amount" value={newOperation.amount} placeholder="$" />
            </div>

            <div>
                <label htmlFor="">Date:</label>
                <input className="form-control" type="date" onChange={readInput} name="date_operation" value={newOperation.date_operation} />
            </div>

            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadioInline1" name="type_operation" class="custom-control-input" checked={newOperation.type_operation === "ingress"} onChange={readInput} value="ingress"/>
                <label className="custom-control-label" for="customRadioInline1">Ingress</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadioInline2" name="type_operation" class="custom-control-input" checked={newOperation.type_operation === "egress"} onChange={readInput} value="egress"/>
                <label className="custom-control-label" for="customRadioInline2">Egress</label>
            </div>
            {/* <div>
                <label htmlFor="ingress-form">Ingress:</label>
                <input className="" type="checkbox" id="ingress-form" name="type_operation" checked={newOperation.type_operation === "ingress"} onChange={readInput} value="ingress" />

                <label htmlFor="egress-form">Egress:</label>
                <input className="" type="radio" id="egress-form" name="type_operation" checked={newOperation.type_operation === "egress"} onChange={readInput} value="egress" />
            </div> */}
            <button onClick={sendInfo}>Sent</button>
        </form>
    )
}

const mapDispatchToProps = {
    addOperation: operationsActions.addOperation
}



export default connect(null, mapDispatchToProps)(Form)
