import { useState, useEffect } from 'react'
import '../styles/operationModify.css'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import { connect } from 'react-redux'
import operationsActions from '../redux/actions/operationsActions'

function OperationModify(props) {
    //Status with current operation
    const [operation, setOperation] = useState([])

    //Status with the data to be modified.
    const [updateOperation, setUpdateOperation] = useState({
        concept: '', amount: '', date_operation: ''
    })

    useEffect(async () => {
        //The component is mount and we bring the operation by id
        const response = await props.getOperationById(idSearch)
        //save in the state
        setOperation(response)

    }, [])

    //I get the id of the operation
    const idSearch = (props.match.params.id)

    const readInput = e => {
        const textBox = e.target.name
        const value = e.target.value
        setUpdateOperation({
            ...updateOperation,
            [textBox]: value
        })
    }

    const sendInfo = async (e) => {
        e.preventDefault()
        //Send id and object for update
        const response = await props.updateOperation(idSearch, updateOperation)
        if (!response.code) {
            props.history.push('/Operations')
            swal({
                title: "The operation has been modified successfully" })
        } else {
            swal({ title: 'Complete all fields please' })
        }
    }

    return (

        <div className="container__modify">
            <form>
                <div className="form-group">
                    <label>Concept</label>
                    <input type="text" className="form-control" onChange={readInput} name="concept"
                        value={updateOperation.concept} placeholder={operation.concept} />
                </div>
                <div className="form-group">
                    <label>Amount:</label>
                    <input className="form-control" type="number" onChange={readInput} name="amount"
                        value={updateOperation.amount} placeholder={operation.amount} />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input className="form-control" type="date" onChange={readInput} name="date_operation"
                        value={updateOperation.date_operation} />
                </div>
                <div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadioInline1" name="type_operation"
                            className="custom-control-input" onChange={readInput} value="ingress" disabled />
                        <label className="custom-control-label" for="customRadioInline1">Ingress</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadioInline2" name="type_operation"
                            className="custom-control-input" onChange={readInput} value="egress" disabled />
                        <label className="custom-control-label" for="customRadioInline2">Egress</label>
                    </div>
                </div>
                <div className="modify__cancel">
                    <Link to="">
                        <button type="button" className="btn btn-dark btn-sm" onClick={sendInfo}>Modify</button>
                    </Link>
                    <Link to="/operations">
                        <button type="button" className="btn btn-danger btn-sm" >Cancel</button>
                    </Link>
                </div>

            </form>
        </div>
    )
}

//Acctions in the component
const mapDispatchToProps = {
    getOperationById: operationsActions.operationById,
    updateOperation: operationsActions.updateOperation
}

export default connect(null, mapDispatchToProps)(OperationModify)
