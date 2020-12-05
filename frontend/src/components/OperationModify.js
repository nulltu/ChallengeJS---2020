import { useState, useEffect } from 'react'
import '../styles/operationModify.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';

function OperationModify(props) {
    const [operation, setOperation] = useState([])

    const [updateOperation, setUpdateOperation] = useState({
        concept: '', amount: '', date_operation: ''
    })

    useEffect(() => {
        getOperation()
    }, [])

    const idSearch = (props.match.params.id)

    const readInput = e => {
        const textBox = e.target.name
        const value = e.target.value
        setUpdateOperation({
            ...updateOperation,
            [textBox]: value
        })
    }


    const getOperation = async () => {
        const response = await fetch(`http://localhost:4800/operations/ + ${idSearch}`)
        const operationData = await response.json()
        setOperation(operationData)
    }

    const sendInfo = async (e) => {
        e.preventDefault()
        const response = await axios.put('http://localhost:4800/operations/' + idSearch, updateOperation)
        console.log(response)
        if (!response.data.code) {
            props.history.push('/Operations')
        } else {
            swal({
                title: 'Complete all fields please'
            })
        }
    }

    console.log(operation)
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
                        value={updateOperation.date_operation} placeholder />
                </div>
                <div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadioInline1" name="type_operation" className="custom-control-input"
                            onChange={readInput} value="ingress" disabled />
                        <label className="custom-control-label" for="customRadioInline1">Ingress</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="customRadioInline2" name="type_operation" className="custom-control-input"
                            onChange={readInput} value="egress" disabled />
                        <label className="custom-control-label" for="customRadioInline2">Egress</label>
                    </div>
                </div>
                <div className = "modify__cancel">
                    <Link to=""><button type="button" className="btn btn-dark btn-sm" onClick={sendInfo}>Modify</button></Link>
                    <Link to="/operations"><button type="button" className="btn btn-danger btn-sm" >Cancel</button></Link>
                </div>

            </form>
        </div>
    )
}

// const mapStateToProps = state => {
//     return {
//         operations: state.operations.listOperations
//     }
// }



export default OperationModify
