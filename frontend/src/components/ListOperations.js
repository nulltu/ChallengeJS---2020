import React from 'react'
import { useEffect } from 'react'
import Operation from '../components/Operation'
import { connect } from 'react-redux'
import operationsActions from '../redux/actions/operationsActions'

function ListOperations(props) {

    useEffect(() => {
        props.allOperations()
    }, [])

    const ingressOperation = props.operations.filter(operation => operation.type_operation === 'ingress')
    const egressOperation = props.operations.filter(operation => operation.type_operation === 'egress')

    let contador = 1

    console.log(props.operations)

    return (
        <div>
            <table class="table table-bordered">
                <thead>
                    <tr>
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
                            <Operation operation={operation} contador={contador++} />
                        )
                    })}
                </tbody>
            </table>

            <table class="table table-bordered">
                <thead>
                    <tr>
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
                            <Operation operation={operation}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        operations: state.operations.listOperations
    }
}

const mapDispatchToProps = {
    allOperations: operationsActions.allOperations
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOperations)
