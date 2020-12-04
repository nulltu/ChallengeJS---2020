import { useEffect, useState } from 'react'
import trash from '../assets/icons/delete.svg'
import '../styles/operationModify.css'
import axios from 'axios'

function OperationDelete(props) {

    const [operation, setOperation] = useState([])
    const idSearch = (props.match.params.id)

    useEffect(() => {
        getOperation()
    }, [])

    const getOperation = async () => {
        const response = await fetch(`http://localhost:4800/operations/ + ${idSearch}`)
        const operationData = await response.json()
        setOperation(operationData)
    }

    const goDelete = async () => {
        const response = await axios.delete(`http://localhost:4800/operations/ ${idSearch}`)
        console.log(response)
    }

    return (
        <div>
            <div>
                <div className="container__modify">
                    <div className="container__card">
                        <p>{operation.concept}</p>
                        <p>{operation.amount}</p>
                        <p>{operation.type_operation}</p>
                    </div>
                    <div>
                        <button className="" onClick={goDelete}>
                            <img src={trash} alt="" />
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default OperationDelete
