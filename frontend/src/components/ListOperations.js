import React from 'react'
import { useEffect } from 'react'
import Operation from '../components/Operation'
import { connect } from 'react-redux'
import operationsActions from '../redux/actions/operationsActions'

function ListOperations(props) {

    useEffect(() => {
        //we bring the data from redux
        props.allOperations()
    }, [])

    //filter for type operation
    const ingressOperation = props.operations.filter(operation => operation.type_operation === 'ingress')
    const egressOperation = props.operations.filter(operation => operation.type_operation === 'egress')

    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Concept</th>
                        <th scope="col">$</th>
                        <th scope="col">Date</th>
                        <th scope="col">Type</th>
                        <th scope="col">Del/Mod</th>
                    </tr>
                </thead>
                <tbody>
                    {ingressOperation.map(operation => {
                        return (
                            <Operation operation={operation} />
                        )
                    })}
                </tbody>
            </table>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Concept</th>
                        <th scope="col">$</th>
                        <th scope="col">Date</th>
                        <th scope="col">Type</th>
                        <th scope="col">Del/Mod</th>
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

//access state to redux
const mapStateToProps = state => {
    return {
        operations: state.operations.listOperations
    }
}

const mapDispatchToProps = {
    allOperations: operationsActions.allOperations
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOperations)
