import React from 'react'
import { useEffect, useState } from 'react'
import Operation from '../components/Operation'

function ListOperations() {

    const [operations, setOperations] = useState([])

    useEffect(() => {
        getOperations()
    }, [])

    const getOperations = async () => {
        const data = await fetch('http://localhost:4800/operations')
        const operations = await data.json()
        setOperations(operations)
    }

    const ingressOperation = operations.filter(operation => operation.type_operation ==='ingress')
    const egressOperation = operations.filter(operation => operation.type_operation ==='egress')
    
    let contador = 1



    return (
        <div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Concept</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Type Operation</th>
                        <th scope="col">Remove/Modify</th>
                    </tr>
                </thead>
                <tbody>

                    {ingressOperation.map(operation => {
                        return (
                            <Operation operation={operation} contador={contador++}/>
                        )
                    })}
                </tbody>
            </table>

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Concept</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Type Operation</th>
                        <th scope="col">Remove/Modify</th>
                    </tr>
                </thead>
                <tbody>

                    {egressOperation.map(operation => {
                        return (
                            <Operation operation={operation} contador={contador++}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ListOperations
