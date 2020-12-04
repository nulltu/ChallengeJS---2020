import React from 'react'
import Form from '../components/Form'
import ListOperations from '../components/ListOperations'
import '../styles/operation.css'

function Operations() {
    
    return (
        <div className="container__operations">
            <div>
                <Form />
            </div>
            <div>
                <ListOperations/>
            </div>
        </div>
    )
}

export default Operations
