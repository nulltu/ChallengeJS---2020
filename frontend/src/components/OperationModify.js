import { useEffect, useState } from 'react'
import '../styles/operationModify.css'
import axios from 'axios'

function OperationModify(props) {

    const [updateOperation, setUpdateOperation] = useState({
        concept: '', amount: '', date_operation: ''
    })

    const idSearch = (props.match.params.id)

    const readInput = e => {
        const textBox = e.target.name
        const value = e.target.value
        setUpdateOperation({
            ...updateOperation,
            [textBox]: value
        })
    }

    console.log(updateOperation)

    const sendInfo = async (e) => {
        e.preventDefault()
        const response = await axios.put('http://localhost:4800/operations/' + idSearch, updateOperation)
        console.log(response)
    }

    return (
        <div>
            <div>
                <div className="container__modify">
                    <form>
                        <div>
                            <label htmlFor="" >Concept</label>
                            <input type="text" onChange={readInput} name="concept" />
                        </div>
                        <div>
                            <label htmlFor="">Amount</label>
                            <input type="number" onChange={readInput} name="amount" />
                        </div>
                        <div>
                            <label htmlFor="">Fecha</label>
                            <input type="date" onChange={readInput} name="date_operation" />
                        </div>
                        <button onClick={sendInfo}>Modify</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default OperationModify
